/** Canonical production URL — single source for sitemap, canonical, JSON-LD, robots. */
export const SITE_URL = "https://www.maxphonesfarm.com" as const;

export const SITE = {
  name: "Max Phones Farm",
  domain: "maxphonesfarm.com",
  canonicalHost: "www.maxphonesfarm.com",
  url: SITE_URL,
  tagline: "Guangzhou Rackmount Phone Farm Hardware — Factory Export",
  /** Shared top-bar copy — single source for Header on every route. */
  headerBar: "Factory-Direct Phone Farm Hardware",
  logoSubtitle: "Export-Ready Device Lab Hardware",
  intro:
    "Max Phones Farm is a Guangzhou assembly team (since 2017) building rackmount phone farm chassis, 20-slot phone farm boxes, and motherboard arrays for enterprise app testing, CI automation, and remote ADB labs — export worldwide with burn-in QC, remote setup, and quote-first B2B sales.",
  location: "Guangzhou, China",
  description:
    "Guangzhou factory-direct rackmount phone farm hardware — 2U chassis, phone farm boxes, motherboard arrays, and export logistics for enterprise device labs and QA automation teams.",
} as const;

/** Public sales channels — floating widget + contact page. */
export const CONTACT = {
  telegram: "@huicheng1998",
  telegramUrl: "https://t.me/huicheng1998",
  whatsapp: "+85262155642",
  whatsappUrl: "https://wa.me/85262155642",
  /** Update to sales@maxphonesfarm.com after domain mailbox is provisioned — one change updates the whole site. */
  email: "qiuxui646@gmail.com",
} as const;

export const PAYMENT = {
  network: "Tron TRC20",
  currency: "USDT",
  address: "TH42KshQyz15iWk5svAwS475RM8oYQjwjW",
  contract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  minAmount: 10,
  expiryMinutes: 30,
} as const;

export const NAV = [
  { href: "/products", label: "Products" },
  { href: "/packages", label: "Packages" },
  { href: "/pricing", label: "Pricing" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Guides" },
  { href: "/glossary", label: "Glossary" },
  { href: "/contact", label: "Contact" },
] as const;

export const HERO_PILLARS = [
  {
    label: "The Original Phone Farm Box",
    href: "/products/phone-farm-box",
    desc: "Factory-built 20-node real device chassis",
  },
  {
    label: "Rackmount Phone Farm",
    href: "/products/custom-cabinet",
    desc: "Server-style 2U rack integration",
  },
  {
    label: "Remote Control Setup",
    href: "/products/remote-control-setup",
    desc: "Unified device management from one workstation",
  },
] as const;
