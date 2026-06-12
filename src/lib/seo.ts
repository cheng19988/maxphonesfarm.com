import type { Metadata } from "next";
import { SITE, SITE_URL, CONTACT } from "./config";

type SEOInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

function absoluteImageUrl(image: string) {
  return image.startsWith("http") ? image : `${SITE_URL}${image}`;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex,
}: SEOInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image
    ? absoluteImageUrl(image)
    : `${SITE_URL}/images/hero_1600x900/maxphonesfarm.com-product-box-2025-10-25-11-27-img-0551-a9b35-hero_1600x900.webp`;
  const fullTitle = `${title} | ${SITE.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1600, height: 900, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE_URL,
    description: SITE.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE_URL,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Manufacturer"],
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/card_800x800/maxphonesfarm.com-product-box-2025-10-25-11-27-img-0551-a9b35-card_800x800.webp`,
    description: SITE.description,
    foundingDate: "2017",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guangzhou",
      addressRegion: "Guangdong",
      addressCountry: "CN",
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "phone farm hardware",
      "rackmount phone farm",
      "phone farm box",
      "mobile compute",
      "screenless battery-free nodes",
      "device lab infrastructure",
      "remote device control",
      "Android device farms",
      "sustained mobile compute workloads",
      "app testing hardware",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT.email,
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Chinese"],
    },
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  slug: string;
  priceUsd: number;
  stock: number;
  image: string;
  sku?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteImageUrl(product.image),
    url: `${SITE_URL}/products/${product.slug}`,
    sku: product.sku ?? product.slug,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@type": "Organization", name: SITE.name, url: SITE_URL },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      ...(product.priceUsd > 0 ? { price: product.priceUsd } : {}),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: SITE.name },
      url: `${SITE_URL}/products/${product.slug}`,
    },
  };
}

export function itemListJsonLd(items: { name: string; url: string; image?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Phone Farm Hardware Catalog",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.image ? { image: absoluteImageUrl(item.image) } : {}),
    })),
  };
}

export function definedTermSetJsonLd(terms: readonly { term: string; definition: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Phone Farm Hardware Glossary",
    description: "Industry definitions for phone farm box, rackmount phone farm, and device lab terminology.",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      inDefinedTermSet: `${SITE_URL}/glossary`,
    })),
  };
}

export function howToJsonLd(guide: {
  name: string;
  description: string;
  slug: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.name,
    description: guide.description,
    url: `${SITE_URL}/blog/${guide.slug}`,
    step: guide.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/card_800x800/maxphonesfarm.com-product-box-2025-10-25-11-27-img-0551-a9b35-card_800x800.webp`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
  };
}
