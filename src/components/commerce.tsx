"use client";

import Image from "next/image";
import Link from "next/link";
import { whatsappQuoteUrl } from "@/lib/whatsapp";
import { StockBadge } from "./shared";

type ProductCardProps = {
  slug: string;
  name: string;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  imageCard: string;
  category: string;
  compact?: boolean;
  featured?: boolean;
};

export function ProductCard({
  slug,
  name,
  shortDesc,
  priceUsd,
  stock,
  imageCard,
  category,
  compact = false,
  featured = false,
}: ProductCardProps) {
  const priceLabel = priceUsd >= 1000 ? `$${priceUsd.toLocaleString()}` : `From $${priceUsd.toLocaleString()}`;

  return (
    <article className={`group card card-hover flex flex-col h-full ${featured ? "lg:col-span-2 lg:row-span-1" : ""}`}>
      <Link
        href={`/products/${slug}`}
        className={`block relative overflow-hidden bg-neutral-900 ${compact ? "aspect-[4/3]" : featured ? "aspect-[16/10]" : "aspect-square"}`}
      >
        <Image
          src={imageCard}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes={featured ? "50vw" : "(max-width:768px) 100vw, 25vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
      <div className={`flex flex-col flex-1 ${compact ? "p-5" : "p-6 md:p-7"}`}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600">{category}</p>
          {!compact && <StockBadge stock={stock} />}
        </div>
        <Link href={`/products/${slug}`}>
          <h3 className={`font-medium text-white mb-2 group-hover:text-neutral-200 transition-colors ${compact ? "text-base" : "text-lg md:text-xl"}`}>
            {name}
          </h3>
        </Link>
        <p className={`text-neutral-500 mb-5 line-clamp-2 flex-1 ${compact ? "text-xs" : "text-sm leading-relaxed"}`}>
          {shortDesc}
        </p>
        <div className="flex items-center justify-between gap-4 pt-5 border-t border-neutral-800">
          <span className={`font-medium text-white ${compact ? "text-sm" : "text-lg"}`}>{priceLabel}</span>
          <div className="flex items-center gap-2">
            <Link href={`/contact?product=${slug}`} className="btn-primary text-xs py-2.5 px-4">
              Quote
            </Link>
            <Link href={`/products/${slug}`} className="btn-ghost text-xs hidden sm:inline-flex">
              Details →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProductCardMinimal({
  slug,
  name,
  priceUsd,
  imageCard,
}: {
  slug: string;
  name: string;
  priceUsd: number;
  imageCard: string;
}) {
  const priceLabel = priceUsd >= 1000 ? `$${priceUsd.toLocaleString()}` : `From $${priceUsd.toLocaleString()}`;

  return (
    <article className="group card card-hover">
      <Link href={`/products/${slug}`} className="block relative aspect-square overflow-hidden bg-neutral-900">
        <Image
          src={imageCard}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="25vw"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent">
          <h3 className="text-sm font-medium text-white mb-1">{name}</h3>
          <p className="text-xs text-neutral-400">{priceLabel}</p>
        </div>
      </Link>
      <div className="p-4 flex items-center justify-between gap-3 border-t border-neutral-800">
        <Link href={`/contact?product=${slug}`} className="btn-primary text-xs py-2 px-4 flex-1 text-center">
          Request Quote
        </Link>
        <a
          href={whatsappQuoteUrl(name)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-xs py-2 px-3"
          aria-label={`WhatsApp quote for ${name}`}
        >
          WA
        </a>
      </div>
    </article>
  );
}

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-neutral-800 border border-neutral-800 bg-neutral-950">
      {items.map((item, i) => (
        <details key={i} className="group px-6 md:px-8 py-5 md:py-6">
          <summary className="font-medium text-white cursor-pointer list-none flex justify-between items-center gap-6 text-base md:text-lg">
            {item.question}
            <span className="text-neutral-500 group-open:rotate-45 transition-transform text-2xl shrink-0 leading-none">+</span>
          </summary>
          <p className="mt-5 text-neutral-500 text-sm md:text-base leading-relaxed pb-2 max-w-3xl">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function BuyButtons({ slug, name }: { slug: string; name: string; stock?: number }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href={`/contact?product=${slug}`} className="btn-primary">
        Request a Quote
      </Link>
      <a href={whatsappQuoteUrl(name)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
        WhatsApp Quote
      </a>
    </div>
  );
}
