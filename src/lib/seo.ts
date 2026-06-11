import type { Metadata } from "next";
import { SITE, CONTACT } from "./config";

type SEOInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

function absoluteImageUrl(image: string) {
  return image.startsWith("http") ? image : `${SITE.url}${image}`;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex,
}: SEOInput): Metadata {
  const url = `${SITE.url}${path}`;
  const ogImage = image
    ? absoluteImageUrl(image)
    : `${SITE.url}/images/hero_1600x900/maxphonesfarm.com-product-box-2025-10-25-11-27-img-0551-a9b35-hero_1600x900.webp`;
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
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/card_800x800/maxphonesfarm.com-product-box-2025-10-25-11-27-img-0551-a9b35-card_800x800.webp`,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guangzhou",
      addressRegion: "Guangdong",
      addressCountry: "CN",
    },
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteImageUrl(product.image),
    url: `${SITE.url}/products/${product.slug}`,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      ...(product.priceUsd > 0 ? { price: product.priceUsd } : {}),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: SITE.name },
    },
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
      item: `${SITE.url}${item.path}`,
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
        url: `${SITE.url}/images/card_800x800/maxphonesfarm.com-product-box-2025-10-25-11-27-img-0551-a9b35-card_800x800.webp`,
      },
    },
    mainEntityOfPage: `${SITE.url}/blog/${article.slug}`,
  };
}
