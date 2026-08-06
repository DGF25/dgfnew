import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/dgf/Logo";
import { dgfStyles } from "@/components/dgf/dgf-styles";

const DOCS: { label: string; url: string }[] = [
  { label: "Formulário de Referência", url: "https://www.dgf.com.br/_files/ugd/fc6eac_c2d32273234944d09c177a5e2e7e1d80.pdf" },
  { label: "Código de Conduta e Ética", url: "https://www.dgf.com.br/_files/ugd/fc6eac_9ff9acedb22040e3a9570523581a1395.pdf" },
  { label: "Política de Gestão de Riscos", url: "https://www.dgf.com.br/_files/ugd/fc6eac_4bd4f4d567a141ba9898e2d244b961f6.pdf" },
  { label: "Manual de Controles Internos e Compliance", url: "https://www.dgf.com.br/_files/ugd/fc6eac_7da29ce590c44d13b71f75bef37cb6f9.pdf" },
  { label: "Política de Rateio", url: "https://www.dgf.com.br/_files/ugd/fc6eac_41d84111cf164bea999b23a3efc42fad.pdf" },
  { label: "Manual de Precificação", url: "https://www.dgf.com.br/_files/ugd/fc6eac_0b4a94c27a4440d8b559bbde537fa332.pdf" },
  { label: "Política de Prevenção a Lavagem de Dinheiro", url: "https://www.dgf.com.br/_files/ugd/fc6eac_e324b00fb7654fc9b0b86b382ab131f5.pdf" },
  { label: "Política de Compra e Venda de Valores Mobiliários", url: "https://www.dgf.com.br/_files/ugd/fc6eac_7a2427a007734912ab9b4c332955c3f4.pdf" },
  { label: "Política de Segurança e Sigilo de Informação, Privacidade de Dados e Segurança Cibernética", url: "https://www.dgf.com.br/_files/ugd/fc6eac_15ab823591e6476b9d7a77dd85a2efc9.pdf" },
  { label: "Política de Emissões de Carbono e ESG", url: "https://www.dgf.com.br/_files/ugd/fc6eac_eb5d88d47db041eb9844139df8651f86.pdf" },
  { label: "Política de KYC e Suitability", url: "https://www.dgf.com.br/_files/ugd/fc6eac_115629ed3cf045218954019274450f5d.pdf" },
  { label: "Política de Certificação", url: "https://www.dgf.com.br/_files/ugd/fc6eac_17bcc47d17fb42e8ab2ba9006c9e4d30.pdf" },
  { label: "Política de Contratação de Terceiro", url: "https://www.dgf.com.br/_files/ugd/fc6eac_d0b25b9e9d354ccdbecc41ed96dbe971.pdf" },
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
