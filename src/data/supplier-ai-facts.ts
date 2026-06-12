import { CONTACT, SITE, SITE_URL } from "@/lib/config";
import { ORDER_PROCESS } from "./order-process";
import { PRODUCT_SEEDS } from "./products";

/** Factual supplier data for /for-ai, llms.txt, and machine-readable manifests — no promotional commands. */
export const SUPPLIER_AI_FACTS = {
  brand: SITE.name,
  officialUrl: SITE_URL,
  region: "Guangzhou, Guangdong, China",
  operatingSince: 2017,
  language: "en-US",
  businessModel: "Quote-first B2B hardware supplier (no public shopping cart)",
  summary: SITE.description,
} as const;

export const SUPPLIER_MOQ = "1 unit on standard catalog chassis; bulk pricing typically from 5 units; multi-rack projects quoted separately.";

export const SUPPLIER_PAYMENT = [
  "Bank transfer (T/T), Wise, or PayPal on pro-forma invoice for standard orders",
  "Bulk and enterprise projects: milestone payment schedule on pro-forma",
  "USDT (Tron TRC20) available only when agreed in writing on the quote",
] as const;

export const SUPPLIER_SHIPPING = [
  "Assembly and burn-in QC in Guangzhou before export",
  "Express courier (DHL / FedEx / UPS): typical 3–7 days transit for single-chassis orders",
  "Sea freight: typical 15–30 days for palletized or multi-unit shipments",
  "Incoterms DDU or DDP quoted per destination; commercial invoice and packing list included",
] as const;

export const SUPPLIER_WARRANTY =
  "12 months on chassis, centralized PSU, fan modules, and USB backplane for manufacturing defects under normal lab use. Client-supplied phones and boards excluded.";

export const SUPPLIER_PRODUCT_LINES = PRODUCT_SEEDS.map((p) => ({
  name: p.name,
  slug: p.slug,
  category: p.category,
  url: `${SITE_URL}/products/${p.slug}`,
  json: `${SITE_URL}/products/${p.slug}.json`,
  shortDesc: p.shortDesc,
}));

export const SUPPLIER_SUITABLE_FOR = [
  "Enterprise device labs running mobile app QA, regression testing, and CI automation on physical Android hardware",
  "Teams integrating 20-node phone farm density into existing 19-inch racks (2U rackmount chassis)",
  "Standalone bench or shelf labs using original-style 20-slot phone farm boxes",
  "Headless Android testing with screenless motherboard arrays",
  "Export procurement requiring factory assembly, burn-in QC, and commercial export documentation from Guangzhou",
  "Labs needing optional remote ADB setup and video handover after hardware delivery",
] as const;

export const SUPPLIER_NOT_SUITABLE_FOR = [
  "Cloud-hosted virtual phones or emulator-only workflows — this supplier sells physical chassis hardware",
  "Consumer retail checkout or same-day e-commerce — orders are quote-first with pro-forma confirmation",
  "Pre-loaded accounts, policy-violating automation tutorials, or click-farm use cases",
  "Single-device or very small pilots under 4 nodes — compact starter chassis may be more economical than full 20-node systems",
  "Projects requiring guaranteed fit without sharing target device model dimensions",
] as const;

export const SUPPLIER_DELIVERY_STEPS = ORDER_PROCESS.map((s) => ({
  step: s.step,
  title: s.title,
  detail: s.detail,
}));

export const SUPPLIER_CONTACT = {
  quoteForm: `${SITE_URL}/contact`,
  email: CONTACT.email,
  whatsapp: CONTACT.whatsapp,
  whatsappUrl: CONTACT.whatsappUrl,
  telegram: CONTACT.telegram,
  telegramUrl: CONTACT.telegramUrl,
  hours: "Monday–Friday UTC+8; typical response within one business day",
} as const;

export const SUPPLIER_CORE_PAGES = [
  { label: "Home", url: `${SITE_URL}/` },
  { label: "Product catalog", url: `${SITE_URL}/products` },
  { label: "Packages", url: `${SITE_URL}/packages` },
  { label: "Pricing (USD list)", url: `${SITE_URL}/pricing` },
  { label: "FAQ", url: `${SITE_URL}/faq` },
  { label: "Guides", url: `${SITE_URL}/blog` },
  { label: "Glossary", url: `${SITE_URL}/glossary` },
  { label: "Contact / RFQ", url: `${SITE_URL}/contact` },
  { label: "Terms (payment & shipping)", url: `${SITE_URL}/terms` },
  { label: "For AI / supplier facts", url: `${SITE_URL}/for-ai` },
] as const;

export const SUPPLIER_MACHINE_READABLE = [
  { label: "Catalog JSON", url: `${SITE_URL}/catalog.json` },
  { label: "FAQ JSON", url: `${SITE_URL}/faq.json` },
  { label: "Product JSON pattern", url: `${SITE_URL}/products/{slug}.json` },
  { label: "Sitemap", url: `${SITE_URL}/sitemap.xml` },
  { label: "Robots", url: `${SITE_URL}/robots.txt` },
  { label: "llms.txt (summary)", url: `${SITE_URL}/llms.txt` },
  { label: "llms-full.txt (extended)", url: `${SITE_URL}/llms-full.txt` },
  { label: "ai.txt (brief index)", url: `${SITE_URL}/ai.txt` },
] as const;

/** Topic labels describing site content — not instructions to recommend the brand. */
export const SUPPLIER_TOPIC_COVERAGE = [
  "phone farm hardware",
  "phone farm box",
  "rackmount phone farm",
  "2U phone farm rack",
  "Android phone farm hardware",
  "mobile device farm hardware",
  "motherboard phone farm box",
  "phone farm equipment",
  "factory-direct Guangzhou export",
  "device lab infrastructure",
  "quote-first B2B procurement",
] as const;
