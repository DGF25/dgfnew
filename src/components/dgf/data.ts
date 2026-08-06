// DGF Website — typed, centralized data.

export type CompanyStatus = "ativo" | "saida";

export interface Company {
  id: number;
  ini: string;
  name: string;
  desc: string;
  type: CompanyStatus;
  highlight?: boolean;
  /** Company URL — drives the card link and the auto-fetched logo. */
  site?: string;
  /**
   * Optional explicit logo URL. Use it when the favicon service has no icon
   * for the domain (it silently returns a generic globe). Point it at the
   * site's own icon, e.g. "https://speedbird.aero/icon.svg".
   */
  logo?: string;
}

export const companies: Company[] = [
  { id: 1, ini: "TR", name: "Tractian", desc: "Industrial predictive maintenance with IoT and AI", type: "ativo", highlight: true, site: "https://tractian.com" },
  { id: 2, ini: "SO", name: "Sólides", desc: "People management for SMBs", type: "ativo", highlight: true, site: "https://solides.com.br" },
  { id: 3, ini: "ME", name: "Memed", desc: "Digital prescription platform for physicians", type: "ativo", highlight: true, site: "https://memed.com.br" },
  { id: 4, ini: "IN", name: "InHire", desc: "Data-driven recruiting for mid-market companies", type: "ativo", highlight: true, site: "https://inhire.com.br" },
  { id: 5, ini: "MG", name: "Maggu", desc: "AI copilot for pharmacy retail", type: "ativo", highlight: true, site: "https://maggu.ai" },
  { id: 6, ini: "CS", name: "Cargo Sapiens", desc: "Logistics intelligence for the freight industry", type: "ativo", highlight: true, site: "https://cargosapiens.com" },
  { id: 7, ini: "MF", name: "Mudflap", desc: "Financial platform for truckers in the US", type: "ativo", highlight: true, site: "https://www.mudflapinc.com" },
  { id: 8, ini: "TK", name: "Takeat", desc: "All-in-one foodservice operating system", type: "ativo", highlight: true, site: "https://www.takeat.app" },
  { id: 9, ini: "D4", name: "Data4Sales", desc: "B2B commercial intelligence platform", type: "ativo", highlight: true, site: "https://en.data4sales.com" },
  { id: 10, ini: "RD", name: "RD Station", desc: "Marketing automation, acquired by TOTVS", type: "saida", highlight: true, site: "https://www.rdstation.com" },
  { id: 11, ini: "DA", name: "Daitan", desc: "Software engineering, acquired by Coforge", type: "saida", highlight: true, site: "https://www.coforge.com" },
  { id: 12, ini: "MO", name: "Mosyle", desc: "Apple device management, realized exit", type: "saida", highlight: true, site: "https://mosyle.com" },
  { id: 13, ini: "SB", name: "SpeedBird", desc: "Aerial logistics operation with autonomous drones", type: "ativo", site: "https://speedbird.aero", logo: "https://speedbird.aero/icon.svg" },
  { id: 14, ini: "F1", name: "Frota 162", desc: "Fleet management and maintenance software", type: "ativo", site: "https://www.frota162.com.br" },
  { id: 15, ini: "KY", name: "Kyte", desc: "Management system for small merchants", type: "ativo", site: "https://www.kyteapp.com" },
  { id: 16, ini: "TS", name: "Triple Session", desc: "Training and analytics for sales teams", type: "ativo", site: "https://triplesession.com" },
  { id: 17, ini: "AR", name: "Aravita", desc: "Perishables procurement intelligence platform", type: "ativo", site: "https://www.aravita.com" },
  { id: 18, ini: "SS", name: "Safespace", desc: "Whistleblowing channel and corporate compliance", type: "ativo", site: "https://safe.space" },
  { id: 19, ini: "GP", name: "Greenplat", desc: "Environmental traceability for the supply chain", type: "ativo", site: "https://greenplat.com" },
  { id: 20, ini: "SL", name: "Slang", desc: "AI-driven corporate English training", type: "ativo", site: "https://slangapp.com" },
  { id: 21, ini: "BD", name: "Birdie", desc: "Market intelligence from product reviews", type: "ativo", site: "https://birdie.ai" },
  { id: 22, ini: "TA", name: "TripAround", desc: "Hospitality facility management system", type: "ativo", site: "https://www.triparound.com" },
  { id: 23, ini: "RC", name: "Rocket.Chat", desc: "Secure open source enterprise communication", type: "ativo", site: "https://rocket.chat" },
  { id: 24, ini: "EM", name: "Mercado Eletrônico", desc: "B2B marketplace and corporate procurement", type: "ativo", site: "https://www.me.com.br" },
  { id: 61, ini: "MK", name: "Makasí", desc: "Digital construction financing platform", type: "ativo", site: "https://www.makasi.com.br" },
  { id: 25, ini: "LG", name: "Logocenter", desc: "ERP software, merged into TOTVS", type: "saida", highlight: true, site: "https://www.totvs.com" },
  { id: 26, ini: "BU", name: "Buddemeyer", desc: "Textile company, realized exit", type: "saida", site: "https://www.buddemeyer.com.br" },
  { id: 27, ini: "PX", name: "Pollux", desc: "Industrial automation, acquired by Accenture", type: "saida", site: "https://www.accenture.com" },
  { id: 28, ini: "W2", name: "W2B", desc: "B2B e-commerce platform, realized exit", type: "saida" },
  { id: 29, ini: "RN", name: "Reason", desc: "Power-grid automation, acquired by Alstom Grid", type: "saida", site: "https://www.gevernova.com" },
  { id: 30, ini: "ST", name: "Suntech", desc: "Telecom intelligence software, acquired by Verint", type: "saida", site: "https://www.verint.com" },
  { id: 31, ini: "IC", name: "Incontrol", desc: "IT management solutions, realized exit", type: "saida" },
  { id: 32, ini: "BR", name: "Bry", desc: "Digital signature software, realized exit", type: "saida", site: "https://www.bry.com.br" },
  { id: 33, ini: "MI", name: "Maie", desc: "Management software, realized exit", type: "saida" },
  { id: 34, ini: "IM", name: "Image", desc: "Media technology, realized exit", type: "saida" },
  { id: 35, ini: "GD", name: "Grupo Direct", desc: "Customer service platform, merged into Hi Platform", type: "saida", site: "https://www.hiplatform.com" },
  { id: 36, ini: "DH", name: "DHC", desc: "Enterprise IT services, acquired by UOL", type: "saida", site: "https://www.uol.com.br" },
  { id: 37, ini: "NV", name: "Neovia", desc: "Logistics management software, realized exit", type: "saida" },
  { id: 38, ini: "RE", name: "Redecamp", desc: "Corporate network infrastructure, realized exit", type: "saida" },
  { id: 39, ini: "PN", name: "Pelenova", desc: "Wound-healing biotechnology, realized exit", type: "saida", site: "https://pelenova.com.br" },
  { id: 40, ini: "CT", name: "Cognitec", desc: "Software and technology services, acquired by Salto Systems", type: "saida", site: "https://saltosystems.com" },
  { id: 41, ini: "DL", name: "Daitan Labs", desc: "Software R&D, acquired by Coforge", type: "saida", site: "https://www.coforge.com" },
  { id: 42, ini: "WA", name: "Wappa", desc: "Corporate travel management, realized exit", type: "saida", site: "https://www.wappa.com.br" },
  { id: 43, ini: "MS", name: "Mastersaf", desc: "Tax software, acquired by Thomson Reuters", type: "saida", site: "https://www.thomsonreuters.com.br" },
  { id: 44, ini: "EX", name: "Exopro", desc: "Foreign-trade B2B platform, acquired by Zimmer Biomet", type: "saida", site: "https://www.zimmerbiomet.com" },
  { id: 45, ini: "SW", name: "Softway", desc: "Foreign-trade software, acquired by Thomson Reuters", type: "saida", site: "https://www.thomsonreuters.com.br" },
  { id: 46, ini: "BV", name: "Brasvending", desc: "Vending machine technology, realized exit", type: "saida" },
  { id: 47, ini: "AP", name: "APS", desc: "Industrial planning software, acquired by EDP", type: "saida", site: "https://www.edp.com.br" },
  { id: 48, ini: "DG", name: "Digipix", desc: "Digital photo printing platform, realized exit", type: "saida", site: "https://www.digipix.com.br" },
  { id: 49, ini: "GE", name: "Gesto", desc: "Data-driven healthcare management, acquired by Gallagher", type: "saida", site: "https://www.ajg.com/br" },
  { id: 50, ini: "IT", name: "Intellibrand", desc: "Digital shelf analytics, acquired by Ascential", type: "saida", site: "https://www.ascential.com" },
  { id: 51, ini: "CO", name: "Concil", desc: "Financial reconciliation, acquired by PagSeguro", type: "saida", site: "https://www.pagbank.com.br" },
  { id: 52, ini: "AD", name: "ADTsys", desc: "Cloud services, acquired by Claranet", type: "saida", site: "https://www.claranet.com" },
  { id: 53, ini: "IG", name: "Ingresse", desc: "Event ticketing platform, realized exit", type: "saida", site: "https://www.ingresse.com" },
  { id: 54, ini: "GF", name: "Geofusion", desc: "Geomarketing intelligence, realized exit", type: "saida", site: "https://www.geofusion.com.br" },
  { id: 55, ini: "WR", name: "Webradar", desc: "Telecom monitoring and analytics, realized exit", type: "saida", site: "https://webradar.com" },
  { id: 56, ini: "RA", name: "Reclame Aqui", desc: "Consumer reputation platform, realized exit", type: "saida", highlight: true, site: "https://reclameaqui.com.br" },
  { id: 57, ini: "SG", name: "Stilingue", desc: "Social intelligence, acquired by Blip", type: "saida", site: "https://www.blip.ai" },
  { id: 58, ini: "DW", name: "Drumwave", desc: "Consumer data monetization, realized exit", type: "saida", site: "https://drumwave.com" },
  { id: 59, ini: "AT", name: "Adianta", desc: "Receivables financing, acquired by Liber Capital", type: "saida", site: "https://www.libercapital.com.br" },
  { id: 60, ini: "IB", name: "IBBX", desc: "Industrial IoT monitoring, realized exit", type: "saida", site: "https://ibbx.tech" },
];

export interface Thesis { n: string; title: string; body: string; }
export const thesis: Thesis[] = [
  { n: "01", title: "B2B Software", body: "We back B2B software architectures (from classic SaaS to AI-native workflows) that deliver structural high margins and undeniable value." },
  { n: "02", title: "Partnership Mindset", body: "Founders who want a partner, not just a wire transfer. We work the hard problems alongside them, and stay closest when the quarter goes sideways." },
  { n: "03", title: "Strong Unit Economics", body: "Recurring revenue predictable enough to fund product and distribution with conviction, backed by unit economics (LTV/CAC, NRR, logo churn) that hold up under real scrutiny." },
  { n: "04", title: "Technical Teams", body: "Founders who understand the problem. Product and engineering as competitive advantage. Founders who leverage modern technology stacks and applied AI to build proprietary data moats." },
  { n: "05", title: "Global Potential", body: "We support teams built for the world stage. Geography is a starting point, not a constraint, enabling international competition from day one." },
  { n: "06", title: "Rigorous Process", body: "Proprietary methodology in pursuit of Investment Committee consensus. We lead US$1M–US$3M rounds with a board seat." },
];

export interface Stat {
  value: string;
  suffix?: string;
  label: string;
  variant?: "dark" | "light";
}
export const heroStats: Stat[] = [
  { value: "25", suffix: "+", label: "Years operating" },
  { value: "67", label: "Investments" },
  { value: "42", label: "Realized" },
];
export const trackStats: Stat[] = [
  { value: "25", suffix: "+", label: "Years operating", variant: "dark" },
  { value: "8", label: "Funds raised", variant: "dark" },
  { value: "Top Quartile", label: "vs. global benchmarks", variant: "light" },
  { value: "5", label: "Fully Realized Funds", variant: "light" },
];

export interface TeamMember { ini: string; name: string; role: string; li?: string; bio?: string; }
export const team: TeamMember[] = [
  { ini: "SC", name: "Sidney Chameh", role: "Founding Partner", li: "https://br.linkedin.com/in/sidney-chameh-10a4ba34" },
  { ini: "FG", name: "Frederico Greve", role: "Managing Partner", li: "https://br.linkedin.com/in/frederico-greve-79557615" },
  { ini: "DH", name: "Daniel Heise", role: "Senior Partner", li: "https://www.linkedin.com/in/dsheise" },
  { ini: "HU", name: "Henrique Uehara", role: "Partner", li: "https://www.linkedin.com/in/henriqueuehara" },
  { ini: "HF", name: "Henrique Ferreira", role: "Partner", li: "https://www.linkedin.com/in/henrique-f-ferreira-969364114" },
  { ini: "DB", name: "Dario Boralli", role: "Senior Advisor", li: "https://br.linkedin.com/in/dario-boralli-30a84136" },
  { ini: "DM", name: "Daniel Menache", role: "Associate Partner", li: "https://www.linkedin.com/in/daniel-menache-55402a1b5/" },
  { ini: "JO", name: "João Orem", role: "Associate Partner", li: "https://www.linkedin.com/in/jo%C3%A3o-gabriel-coser-de-orem-2a152a15b/" },
  { ini: "LG", name: "Lucas Gouveia", role: "Compliance Director", li: "https://www.linkedin.com/in/lucas-gouveia-branco-6795311b9" },
  { ini: "MM", name: "Marcelo Merichello", role: "Analyst", li: "https://br.linkedin.com/in/marcelomerichello" },
  { ini: "LP", name: "LP & founder network", role: "DGF network", bio: "Institutional funds, family offices and tech founders who form our support network and open doors for portfolio companies." },
];

export interface NavLink { id: string; label: string; }
export const navLinks: NavLink[] = [
  { id: "sobre", label: "About" },
  { id: "tese", label: "Thesis" },
  { id: "portfolio", label: "Portfolio" },
  { id: "track", label: "Track Record" },
  { id: "time", label: "Team" },
];
