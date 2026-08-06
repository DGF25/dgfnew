import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/dgf/Logo";
import { dgfStyles } from "@/components/dgf/dgf-styles";

/**
 * Documentos regulatórios (RCVM 21/21).
 *
 * Os PDFs são servidos por este próprio site, de `public/cvm/`. Antes ficavam
 * hospedados no Wix (`dgf.com.br/_files/ugd/…`); foram migrados para cá em
 * ago/2026 porque aqueles links morreriam no instante em que o DNS de
 * dgf.com.br deixasse de apontar para o Wix.
 *
 * Para trocar um documento: substitua o arquivo em `public/cvm/` mantendo o
 * mesmo nome. Nenhuma alteração de código é necessária.
 */
const DOCS: { label: string; url: string }[] = [
  { label: "Formulário de Referência", url: "/cvm/formulario-de-referencia.pdf" },
  { label: "Código de Conduta e Ética", url: "/cvm/codigo-de-conduta-e-etica.pdf" },
  { label: "Política de Gestão de Riscos", url: "/cvm/politica-de-gestao-de-riscos.pdf" },
  { label: "Manual de Controles Internos e Compliance", url: "/cvm/manual-de-controles-internos-e-compliance.pdf" },
  { label: "Política de Rateio", url: "/cvm/politica-de-rateio.pdf" },
  { label: "Manual de Precificação", url: "/cvm/manual-de-precificacao.pdf" },
  { label: "Política de Prevenção a Lavagem de Dinheiro", url: "/cvm/politica-de-prevencao-a-lavagem-de-dinheiro.pdf" },
  { label: "Política de Compra e Venda de Valores Mobiliários", url: "/cvm/politica-de-compra-e-venda-de-valores-mobiliarios.pdf" },
  { label: "Política de Segurança e Sigilo de Informação, Privacidade de Dados e Segurança Cibernética", url: "/cvm/politica-de-seguranca-e-sigilo-de-informacao.pdf" },
  { label: "Política de Emissões de Carbono e ESG", url: "/cvm/politica-de-emissoes-de-carbono-e-esg.pdf" },
  { label: "Política de KYC e Suitability", url: "/cvm/politica-de-kyc-e-suitability.pdf" },
  { label: "Política de Certificação", url: "/cvm/politica-de-certificacao.pdf" },
  { label: "Política de Contratação de Terceiro", url: "/cvm/politica-de-contratacao-de-terceiro.pdf" },
];

export const Route = createFileRoute("/cvm-disclosures")({
  head: () => ({
    meta: [
      { title: "Informações CVM · DGF Investimentos" },
      { name: "description", content: "Documentos regulatórios obrigatórios do DGF Investimentos conforme RCVM 21/21." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CvmDisclosures,
});

function CvmDisclosures() {
  return (
    <div className="dgf-root">
      <style dangerouslySetInnerHTML={{ __html: dgfStyles }} />

      <nav className="dgf-nav dgf-nav--scrolled" aria-label="Main">
        <Link to="/" className="dgf-brand" aria-label="DGF Investimentos — home">
          <Logo variant="white" height={28} decorative />
        </Link>
        <div className="dgf-nav__links">
          <Link to="/" className="dgf-navlink">Home</Link>
        </div>
        <Link to="/" className="dgf-cta dgf-nav__cta">← Back to site</Link>
      </nav>

      <main>
        <div className="dgf-cvm" lang="pt-BR">
          <Link to="/" className="dgf-cvm__back">← Voltar ao site</Link>
          <span className="dgf-cvm__lang">PT · Página regulatória</span>
          <h1>Informações CVM</h1>

          <h2>Sobre o DGF</h2>
          <p>
            Fundado em 2001 por Sidney Chameh, o DGF constituiu, em 2002, seu primeiro fundo para investimento em companhias em estágio inicial e de crescimento acelerado. Em 2003, Frederico Greve, que atuava na indústria de Private Equity desde 1998, juntou-se ao gestor como sócio. Juntos, concluíram os investimentos dos Fundos DGF 1 e DGF 2.
          </p>
          <p>
            Em 2010, com o amadurecimento do mercado brasileiro de Venture Capital e Private Equity, o DGF decidiu ter fundos especializados em um tema — software B2B. O início dessa nova era foi marcado pela captação do Fundo DGF 3 em 2012.
          </p>
          <p>
            Ao longo de mais de 25 anos, o DGF apoiou dezenas de companhias nos mais diversos ciclos econômicos. Atualmente, o DGF está com o seu oitavo fundo, o DGF 8, para continuar apoiando líderes de empresas de software em estágio inicial.
          </p>

          <h2>Time</h2>
          <p>
            O DGF conta com os sócios Sidney Chameh, Frederico Greve, Daniel Heise, Henrique Uehara, Henrique Ferreira, Daniel Menache e João Orem, além de um time de associados e analistas, todos profissionais com grande experiência em investimentos em empresas de tecnologia.
          </p>

          <h2>Documentos Obrigatórios</h2>
          <p>
            Os documentos obrigatórios estão disponibilizados abaixo, conforme RCVM 21/21. Os Fundos do DGF são destinados exclusivamente a investidores profissionais. Mais informações sobre os Fundos do DGF podem ser encontradas no site da CVM. Além disso, os Fundos do DGF são aderentes ao código de autorregulação ABVCAP / ANBIMA.
          </p>

          <div className="dgf-cvm__docs">
            {DOCS.map((d) => (
              <a key={d.url} className="dgf-cvm__doc" href={d.url} target="_blank" rel="noreferrer">
                <span>{d.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 3h7v7" />
                  <path d="M10 14L21 3" />
                  <path d="M21 14v7H3V3h7" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="dgf-footer">
        <div style={{ opacity: 0.7 }}><Logo variant="white" height={22} decorative /></div>
        <nav className="dgf-footer__links" aria-label="Footer">
          <Link className="dgf-footer__link" to="/">Home</Link>
          <a className="dgf-footer__link" href="https://www.linkedin.com/company/dgf-investimentos" target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
        <div className="dgf-footer__rule" aria-hidden="true" />
        <div className="dgf-footer__copy">© {new Date().getFullYear()} DGF Investimentos · São Paulo</div>
      </footer>
    </div>
  );
}
