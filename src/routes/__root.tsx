import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { dgfStyles } from "../components/dgf/dgf-styles";
import { Logo } from "../components/dgf/Logo";

/** Canonical origin of the site. Drives <link rel="canonical">, og:url and the
 *  absolute URL of the social share image. Must match the domain users actually
 *  reach — a stale value here silently breaks link previews and SEO. */
const SITE_URL = "https://dgf.com.br";
const OG_IMAGE = `${SITE_URL}/dgf-og-image.png`;

/** Google Analytics 4 measurement ID. Empty string disables tracking entirely. */
const GA_ID = "G-PV4KPCQY3C";

/** Structured data: lets search engines show the firm's name, logo and
 *  profile links correctly. Keep in sync with the footer and contact data. */
const ORG_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DGF Investimentos",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-512.png`,
  foundingDate: "2001",
  description: "Venture capital firm focused on B2B software, based in São Paulo.",
  address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressCountry: "BR" },
  sameAs: ["https://br.linkedin.com/company/dgf-investimentos"],
});

function NotFoundComponent() {
  return (
    <div className="dgf-root">
      <style dangerouslySetInnerHTML={{ __html: dgfStyles }} />
      <main className="dgf-notfound">
        <div className="dgf-notfound__logo"><Logo variant="white" height={30} /></div>
        <div className="dgf-notfound__code" aria-hidden="true">404</div>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="dgf-btn dgf-btn--primary">Back to home</Link>
      </main>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="dgf-root">
      <style dangerouslySetInnerHTML={{ __html: dgfStyles }} />
      <main className="dgf-notfound">
        <div className="dgf-notfound__logo"><Logo variant="white" height={30} /></div>
        <h1>This page didn't load</h1>
        <p>Something went wrong on our end. You can try again or go back home.</p>
        <div className="dgf-actions" style={{ justifyContent: "center" }}>
          <button onClick={() => { router.invalidate(); reset(); }} className="dgf-btn dgf-btn--primary">Try again</button>
          <a href="/" className="dgf-btn dgf-btn--ghost">Back to home</a>
        </div>
      </main>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DGF - Three Decades of Venture Capital" },
      { name: "description", content: "DGF Investimentos: three decades investing in B2B software. Thesis, portfolio and track record with discipline and capital efficiency." },
      { name: "author", content: "DGF Investimentos" },
      { name: "theme-color", content: "#0a1f15" },
      { property: "og:site_name", content: "DGF Investimentos" },
      { property: "og:title", content: "DGF - Three Decades of Venture Capital" },
      { property: "og:description", content: "Funds come and go. Firms endure. Venture Capital focused on B2B software since 2001." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DGF - Three Decades of Venture Capital" },
      { name: "twitter:description", content: "Venture Capital focused on B2B software since 2001." },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon-512.png" },
      { rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon-64.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon-180.png" },
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" },
      // Warm up the GA connection so the tag never blocks first paint.
      ...(GA_ID ? [{ rel: "preconnect", href: "https://www.googletagmanager.com" }] : []),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/**
 * Google Analytics 4 (gtag.js).
 * Rendered server-side into <head> so it is present on every route (home and
 * /cvm-disclosures). `async` keeps it off the critical rendering path.
 * GA4's enhanced measurement tracks history-based navigation, so client-side
 * route changes are counted without extra wiring.
 */
function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`,
        }}
      />
    </>
  );
}

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ORG_JSON_LD }} /><Analytics /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>
  );
}
