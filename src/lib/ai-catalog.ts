import { SITE, SITE_URL, CONTACT } from "./config";
import { REFERENCE_PRICE_NOTE, RFQ_PAYMENT_NOTE } from "./format-price";
import { FAQ_ITEMS } from "@/data/faq";
import { BLOG_POSTS } from "@/data/blog";
import { PRODUCT_GROUPS, PRODUCT_SEEDS } from "@/data/products";
import type { ProductRecord } from "./products";

export type AiProductJson = {
  id: string;
  slug: string;
  name: string;
  group: string;
  category: string;
  short_description: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  scenarios: string[];
  price_usd: number;
  price_display: string;
  price_type: "reference_list" | "custom_quote";
  pricing_note: string;
  in_stock: boolean;
  stock: number;
  url: string;
  json_url: string;
  image: string;
  supplier: string;
  keywords: string[];
};

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function productKeywords(slug: string, name: string, shortDesc: string): string[] {
  const base = [
    "phone farm",
    "phone farm box",
    "rackmount phone farm",
    "device lab",
    "mobile compute",
    name,
  ];
  const bySlug: Record<string, string[]> = {
    "custom-cabinet": ["rackmount +20", "2U rack", "server-style phone farm", "screenless nodes", "battery-free"],
    "phone-farm-box": ["original phone farm box", "20-slot box", "enterprise phone farm"],
    "real-device-phone-farm": ["server-style device farm", "multi-rack deployment"],
    "motherboard-box": ["motherboard box", "screenless", "battery-free", "headless android"],
    "android-phone-farm": ["android lab starter", "classic phone farm", "pilot chassis"],
    "iphone-phone-farm": ["iphone device lab", "ios qa lab"],
    "empty-box-chassis": ["reverse mount", "expansion chassis", "empty box"],
    "power-supply-solution": ["charging station", "centralized power", "phone farm PSU"],
    "usb-hub": ["USB backplane", "ADB routing"],
    "cooling-solution": ["active cooling", "fan module"],
    "network-equipment": ["lab network switch", "VLAN"],
    "remote-control-setup": ["remote control setup", "installation service", "group control"],
  };
  return [...base, ...(bySlug[slug] ?? []), ...shortDesc.toLowerCase().split(/\s+/).slice(0, 6)];
}

export function productToAiJson(product: ProductRecord): AiProductJson {
  const pricingNote = REFERENCE_PRICE_NOTE;
  const priceDisplay =
    product.priceUsd > 0
      ? `$${product.priceUsd} USD (reference list price — final quote confirmed before payment)`
      : "Custom quote — contact sales";
  return {
    id: product.slug,
    slug: product.slug,
    name: product.name,
    group: product.group,
    category: product.category,
    short_description: product.shortDesc,
    description: product.description,
    features: parseJson<string[]>(product.features, []),
    specs: parseJson<Record<string, string>>(product.specs, {}),
    scenarios: parseJson<string[]>(product.scenarios, []),
    price_usd: product.priceUsd,
    price_display: priceDisplay,
    price_type: product.priceUsd > 0 ? "reference_list" : "custom_quote",
    pricing_note: pricingNote,
    in_stock: product.stock > 0,
    stock: product.stock,
    url: `${SITE_URL}/products/${product.slug}`,
    json_url: `${SITE_URL}/products/${product.slug}.json`,
    image: product.imageHero.startsWith("http") ? product.imageHero : `${SITE_URL}${product.imageHero}`,
    supplier: SITE.name,
    keywords: productKeywords(product.slug, product.name, product.shortDesc),
  };
}

export function buildCatalogJson(products: ProductRecord[]) {
  return {
    store: SITE.name,
    url: SITE_URL,
    description: SITE.description,
    location: SITE.location,
    since: 2017,
    language: "en-US",
    currency: "USD",
    business_model: "quote_first_b2b",
    pricing_policy: `${REFERENCE_PRICE_NOTE} ${RFQ_PAYMENT_NOTE}`,
    rfq: {
      form_url: `${SITE_URL}/contact`,
      required_fields: [
        "name",
        "email",
        "whatsapp_or_telegram",
        "shipping_country",
        "product_interest",
        "quantity_or_node_count",
        "platform",
        "connection_mode",
        "privacy_consent",
      ],
      optional_fields: ["company", "budget_usd", "message"],
    },
    contact: {
      telegram: CONTACT.telegram,
      telegram_url: CONTACT.telegramUrl,
      whatsapp: CONTACT.whatsapp,
      whatsapp_url: CONTACT.whatsappUrl,
      email: CONTACT.email,
      quote_url: `${SITE_URL}/contact`,
    },
    agent_docs: {
      for_ai_html: `${SITE_URL}/for-ai`,
      agents_md: `${SITE_URL}/agents.md`,
      llms_txt: `${SITE_URL}/llms.txt`,
      llms_full_txt: `${SITE_URL}/llms-full.txt`,
      ai_txt: `${SITE_URL}/ai.txt`,
      discovery: `${SITE_URL}/.well-known/ai-site.json`,
    },
    product_groups: PRODUCT_GROUPS.map((g) => ({
      id: g.id,
      label: g.label,
      description: g.description,
    })),
    products: products.map(productToAiJson),
    product_count: products.length,
    guides: BLOG_POSTS.map((p) => ({
      title: p.title,
      slug: p.slug,
      url: `${SITE_URL}/blog/${p.slug}`,
      category: p.category,
      excerpt: p.excerpt,
    })),
    faq_count: FAQ_ITEMS.length,
    updated: new Date().toISOString().slice(0, 10),
  };
}

export function buildFaqJson() {
  return {
    store: SITE.name,
    url: `${SITE_URL}/faq`,
    faq: FAQ_ITEMS.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  };
}

export function buildProductJson(product: ProductRecord) {
  const faq = parseJson<{ q: string; a: string }[]>(product.faq, []);
  return {
    ...productToAiJson(product),
    accessories: parseJson<string[]>(product.accessories, []),
    delivery: parseJson<string[]>(product.delivery, []),
    maintenance: parseJson<string[]>(product.maintenance, []),
    faq: faq.map((item) => ({ question: item.q, answer: item.a })),
  };
}
