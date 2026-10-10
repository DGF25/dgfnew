/**
 * /founders — área restrita de benefícios para as investidas.
 *
 * COMO FUNCIONA
 * 1. Cloudflare Access fica na frente de dgf.com.br/founders e só deixa passar
 *    e-mails dos domínios liberados (configurado no painel Zero Trust, não aqui).
 * 2. Este módulo confere de novo, no Worker, o JWT que o Access assina
 *    (header Cf-Access-Jwt-Assertion). Sem isso, a mesma rota ficaria aberta
 *    pelo endereço *.workers.dev, que não passa pelo Access. Sem JWT válido,
 *    nenhum conteúdo é buscado nem enviado.
 * 3. O conteúdo vem da base "🎁 Benefícios Portfólio" no Notion (só itens com
 *    "Publicado" marcado), lido com o token NOTION_TOKEN e guardado em memória
 *    por 10 min. Nada disso fica no repositório, que é público.
 *
 * VARIÁVEIS (Cloudflare → Workers → dgfnew → Settings → Variables and Secrets)
 *   NOTION_TOKEN        (secret)  token da integração interna do Notion
 *   ACCESS_TEAM_DOMAIN  (texto)   ex.: dgf.cloudflareaccess.com
 *   ACCESS_AUD          (texto)   "Application Audience (AUD) Tag" do app no Access
 *   NOTION_DATABASE_ID  (opcional) por padrão, a base abaixo
 *
 * Falta alguma variável → a página responde "não configurada" (fail closed).
 */
import { dgfStyles } from "../components/dgf/dgf-styles";
import { LOGO_WHITE } from "../components/dgf/logo-assets";

export const FOUNDERS_PATH = "/founders";

const DEFAULT_DATABASE_ID = "b03a24a0dce44f8fb25a96b78281999b";
const CACHE_TTL_MS = 10 * 60 * 1000;
const CONTACT_EMAIL = "investors@dgf.com.br";

type Env = {
  NOTION_TOKEN?: string;
  NOTION_DATABASE_ID?: string;
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;
};

type Benefit = {
  partner: string;
  category: string;
  highlight: string;
  description: string;
  eligibility: string;
  howTo: string;
  link: string;
  site: string;
  contact: string;
  validUntil: string;
};

/* ───────────────────────── Access JWT ───────────────────────── */

function b64urlToBytes(s: string): Uint8Array {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function b64urlToJson(s: string): Record<string, unknown> {
  return JSON.parse(new TextDecoder().decode(b64urlToBytes(s)));
}

let certsCache: { at: number; keys: JsonWebKey[] } | null = null;

async function getAccessKeys(teamDomain: string): Promise<JsonWebKey[]> {
  if (certsCache && Date.now() - certsCache.at < 60 * 60 * 1000) return certsCache.keys;
  const res = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error(`Access certs: HTTP ${res.status}`);
  const data = (await res.json()) as { keys: JsonWebKey[] };
  certsCache = { at: Date.now(), keys: data.keys };
  return data.keys;
}

function readCookie(request: Request, name: string): string | null {
  const raw = request.headers.get("cookie") ?? "";
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}

/** Returns the verified e-mail, or null if the request is not authenticated. */
async function verifyAccess(request: Request, env: Env): Promise<string | null> {
  const token =
    request.headers.get("cf-access-jwt-assertion") ?? readCookie(request, "CF_Authorization");
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [h, p, s] = parts;

  try {
    const header = b64urlToJson(h) as { alg?: string; kid?: string };
    const payload = b64urlToJson(p) as { aud?: string | string[]; iss?: string; exp?: number; email?: string };
    if (header.alg !== "RS256") return null;

    const keys = await getAccessKeys(env.ACCESS_TEAM_DOMAIN!);
    const jwk = keys.find((k) => (k as { kid?: string }).kid === header.kid);
    if (!jwk) return null;

    const key = await crypto.subtle.importKey(
      "jwk",
      jwk,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const valid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      b64urlToBytes(s),
      new TextEncoder().encode(`${h}.${p}`),
    );
    if (!valid) return null;

    const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!aud.includes(env.ACCESS_AUD)) return null;
    if (payload.iss !== `https://${env.ACCESS_TEAM_DOMAIN}`) return null;
    if (!payload.exp || payload.exp * 1000 < Date.now()) return null;
    return payload.email ?? "";
  } catch (err) {
    console.error("Access JWT verification failed", err);
    return null;
  }
}

/* ───────────────────────── Notion ───────────────────────── */

type NotionProp = {
  type: string;
  title?: { plain_text: string }[];
  rich_text?: { plain_text: string }[];
  select?: { name: string } | null;
  url?: string | null;
  date?: { start: string } | null;
};

function text(prop?: NotionProp): string {
  if (!prop) return "";
  if (prop.type === "title") return (prop.title ?? []).map((t) => t.plain_text).join("");
  if (prop.type === "rich_text") return (prop.rich_text ?? []).map((t) => t.plain_text).join("");
  if (prop.type === "select") return prop.select?.name ?? "";
  if (prop.type === "url") return prop.url ?? "";
  if (prop.type === "date") return prop.date?.start ?? "";
  return "";
}

let benefitsCache: { at: number; items: Benefit[] } | null = null;

async function getBenefits(env: Env): Promise<Benefit[]> {
  if (benefitsCache && Date.now() - benefitsCache.at < CACHE_TTL_MS) return benefitsCache.items;

  const dbId = env.NOTION_DATABASE_ID || DEFAULT_DATABASE_ID;
  const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: { property: "Publicado", checkbox: { equals: true } },
      sorts: [{ property: "Ordem", direction: "ascending" }],
      page_size: 100,
    }),
  });
  if (!res.ok) throw new Error(`Notion: HTTP ${res.status} ${await res.text()}`);

  const data = (await res.json()) as { results: { properties: Record<string, NotionProp> }[] };
  const items = data.results.map(({ properties: p }) => ({
    partner: text(p["Parceiro"]),
    category: text(p["Categoria"]),
    highlight: text(p["Destaque"]),
    description: text(p["Descrição"]),
    eligibility: text(p["Elegibilidade"]),
    howTo: text(p["Como ativar"]),
    link: text(p["Link"]),
    site: text(p["Site do parceiro"]),
    contact: text(p["Contato DGF"]),
    validUntil: text(p["Validade"]),
  }));

  benefitsCache = { at: Date.now(), items };
  return items;
}

/* ───────────────────────── HTML ───────────────────────── */

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Only http(s) links are rendered; anything else becomes inert. */
function safeUrl(u: string): string {
  return /^https?:\/\//i.test(u) ? esc(u) : "#";
}

function domainOf(u: string): string {
  return u.replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return d && m && y ? `${d}/${m}/${y}` : iso;
}

const PAGE_CSS = `
.fb-wrap { padding: calc(var(--header-h) + 56px) var(--gutter) 96px; min-height: 100vh; }
.fb-head { max-width: 760px; margin-bottom: 40px; }
.fb-user { font-size: 13px; color: var(--on-dark-3); margin-top: 18px; }
.fb-user a { color: var(--green-accent); }
.fb-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.fb-filter[aria-pressed="true"] { background: var(--green-bright); border-color: var(--green-bright); color: #fff; }
.fb-grid { display: grid; grid-template-columns: 1fr; gap: 14px; align-items: start; }
@media (min-width: 768px) { .fb-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1100px) { .fb-grid { grid-template-columns: repeat(3, 1fr); } }
.fb-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--r-lg); padding: 22px; display: flex; flex-direction: column; gap: 14px; }
.fb-card__top { display: flex; align-items: center; gap: 14px; }
.fb-logo { width: 46px; height: 46px; border-radius: var(--r-md); background: #fff; padding: 7px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-weight: 600; color: var(--green); }
.fb-logo img { width: 100%; height: 100%; object-fit: contain; }
.fb-name { font-size: 16px; font-weight: 500; color: #fff; letter-spacing: -0.01em; }
.fb-cat { font-size: 11px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: var(--green-accent); margin-top: 2px; }
.fb-highlight { font-size: 15px; font-weight: 600; color: var(--mint); line-height: 1.4; }
.fb-desc { font-size: 13.5px; color: var(--on-dark-2); line-height: 1.6; }
.fb-card details { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px; }
.fb-card summary { cursor: pointer; font-size: 13px; font-weight: 500; color: var(--on-dark); list-style: none; }
.fb-card summary::-webkit-details-marker { display: none; }
.fb-card summary::after { content: " +"; color: var(--green-accent); }
.fb-card details[open] summary::after { content: " –"; }
.fb-dl { margin: 12px 0 0; display: grid; gap: 10px; }
.fb-dl dt { font-size: 11px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: var(--on-dark-3); }
.fb-dl dd { margin: 2px 0 0; font-size: 13.5px; color: var(--on-dark-2); line-height: 1.6; white-space: pre-line; }
.fb-actions { margin-top: auto; display: flex; gap: 10px; flex-wrap: wrap; }
.fb-actions .dgf-btn { padding: 11px 20px; font-size: 13.5px; }
.fb-empty { padding: 48px 20px; text-align: center; color: var(--on-dark-3); border: 1px dashed rgba(255,255,255,0.12); border-radius: var(--r-lg); }
.fb-foot { margin-top: 48px; font-size: 13.5px; color: var(--on-dark-3); }
.fb-foot a { color: var(--green-accent); }
`;

function card(b: Benefit): string {
  const domain = b.site ? domainOf(b.site) : "";
  const initials = esc(b.partner.slice(0, 2).toUpperCase());
  const logo = domain
    ? `<img src="https://www.google.com/s2/favicons?domain=${esc(domain)}&amp;sz=128" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.textContent=this.parentNode.getAttribute('data-ini')">`
    : initials;

  const rows = [
    ["Elegibilidade", b.eligibility],
    ["Como ativar", b.howTo],
    ["Contato no DGF", b.contact],
    ["Válido até", b.validUntil ? formatDate(b.validUntil) : ""],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
    .join("");

  return `
  <article class="fb-card" data-cat="${esc(b.category)}">
    <div class="fb-card__top">
      <div class="fb-logo" aria-hidden="true" data-ini="${initials}">${logo}</div>
      <div>
        <div class="fb-name">${esc(b.partner)}</div>
        ${b.category ? `<div class="fb-cat">${esc(b.category)}</div>` : ""}
      </div>
    </div>
    ${b.highlight ? `<div class="fb-highlight">${esc(b.highlight)}</div>` : ""}
    ${b.description ? `<p class="fb-desc">${esc(b.description)}</p>` : ""}
    ${rows ? `<details><summary>Elegibilidade e como ativar</summary><dl class="fb-dl">${rows}</dl></details>` : ""}
    ${b.link ? `<div class="fb-actions"><a class="dgf-btn dgf-btn--primary" href="${safeUrl(b.link)}" target="_blank" rel="noopener noreferrer">Ativar benefício ↗</a></div>` : ""}
  </article>`;
}

function shell(title: string, body: string): string {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)} · DGF Investimentos</title>
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">
<style>${dgfStyles}${PAGE_CSS}</style>
</head>
<body style="margin:0">
<div class="dgf-root dgf-section--dark" style="min-height:100vh">
  <nav class="dgf-nav dgf-nav--scrolled" aria-label="Main">
    <a href="/" class="dgf-brand" aria-label="DGF Investimentos — home">
      <img src="${LOGO_WHITE}" alt="" height="28" style="height:28px;width:auto;display:block">
    </a>
    <div class="dgf-nav__links"></div>
    <a href="/cdn-cgi/access/logout" class="dgf-cta dgf-nav__cta">Sair</a>
  </nav>
  <main class="fb-wrap"><div class="dgf-container">${body}</div></main>
</div>
</body>
</html>`;
}

function page(email: string, items: Benefit[]): string {
  const cats = [...new Set(items.map((b) => b.category).filter(Boolean))];
  const filters = cats.length > 1
    ? `<div class="fb-filters" role="group" aria-label="Filtrar por categoria">
        <button class="dgf-filter fb-filter" aria-pressed="true" data-f="">Todos</button>
        ${cats.map((c) => `<button class="dgf-filter fb-filter" aria-pressed="false" data-f="${esc(c)}">${esc(c)}</button>`).join("")}
      </div>`
    : "";

  const grid = items.length
    ? `<div class="fb-grid">${items.map(card).join("")}</div>`
    : `<p class="fb-empty">Nenhum benefício publicado no momento.</p>`;

  /* Category filter. Plain JS, no template placeholders inside. */
  const script = `<script>
document.querySelectorAll('.fb-filter').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var f = btn.getAttribute('data-f');
    document.querySelectorAll('.fb-filter').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
    document.querySelectorAll('.fb-card').forEach(function (c) {
      c.style.display = !f || c.getAttribute('data-cat') === f ? '' : 'none';
    });
  });
});
</script>`;

  return shell(
    "Portfolio Benefits",
    `<header class="fb-head">
      <p class="dgf-eyebrow dgf-eyebrow--light">Portfolio Benefits</p>
      <h1 class="dgf-h2">Benefícios para as <span style="color:var(--green-accent)">investidas DGF</span></h1>
      <p class="dgf-lead">Condições negociadas com parceiros para as empresas do portfólio. Conteúdo exclusivo: por favor, não compartilhe os links e códigos fora da sua empresa.</p>
      ${email ? `<p class="fb-user">Conectado como ${esc(email)} · <a href="/cdn-cgi/access/logout">sair</a></p>` : ""}
    </header>
    ${filters}
    ${grid}
    <p class="fb-foot">Dúvidas sobre algum benefício ou sugestão de parceria? Fale com a gente em <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
    ${script}`,
  );
}

function respond(html: string, status = 200): Response {
  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      /* Never let a shared cache keep a copy of the restricted page. */
      "cache-control": "private, no-store",
      "x-robots-tag": "noindex, nofollow",
      "referrer-policy": "no-referrer",
    },
  });
}

function message(title: string, text: string, status: number): Response {
  return respond(
    shell(
      title,
      `<header class="fb-head"><p class="dgf-eyebrow dgf-eyebrow--light">Portfolio Benefits</p>
       <h1 class="dgf-h2">${esc(title)}</h1><p class="dgf-lead">${text}</p></header>`,
    ),
    status,
  );
}

export function isFoundersPath(pathname: string): boolean {
  return pathname === FOUNDERS_PATH || pathname.startsWith(`${FOUNDERS_PATH}/`);
}

export async function handleFounders(request: Request, rawEnv: unknown): Promise<Response> {
  const env = (rawEnv ?? {}) as Env;

  if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD || !env.NOTION_TOKEN) {
    return message("Área em configuração", "Esta área ainda não foi ativada.", 503);
  }

  const email = await verifyAccess(request, env);
  if (email === null) {
    return message(
      "Acesso restrito",
      `Esta área é exclusiva das empresas do portfólio DGF. Se você faz parte de uma investida e não consegue entrar, escreva para <a href="mailto:${CONTACT_EMAIL}" style="color:var(--green-accent)">${CONTACT_EMAIL}</a>.`,
      403,
    );
  }

  try {
    const items = await getBenefits(env);
    return respond(page(email, items));
  } catch (err) {
    console.error(err);
    return message("Indisponível no momento", "Não conseguimos carregar os benefícios agora. Tente novamente em alguns minutos.", 502);
  }
}
