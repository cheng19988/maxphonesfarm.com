"use client";

import Image from "next/image";
import Link from "next/link";
import { whatsappQuoteUrl } from "@/lib/whatsapp";
import { formatProductPrice } from "@/lib/format-price";
import { StockBadge } from "./shared";

type ProductCardProps = {
  slug: string;
  name: string;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  imageCard: string;
  imageHero?: string;
  category: string;
  compact?: boolean;
  featured?: boolean;
};

function imageFrameClass(compact: boolean, featured: boolean) {
  if (featured) return "aspect-[16/9] min-h-[260px] md:min-h-[300px]";
  if (compact) return "aspect-square min-h-[200px]";
  return "aspect-square min-h-[240px]";
}

export function ProductCard({
  slug,
  name,
  shortDesc,
  priceUsd,
  stock,
  imageCard,
  imageHero,
  category,
  compact = false,
  featured = false,
}: ProductCardProps) {
  const priceLabel = formatProductPrice(priceUsd);

  return (
    <article className={`group card card-hover flex flex-col h-full rounded-xl ${featured ? "lg:col-span-2" : ""}`}>
      <Link
        href={`/products/${slug}`}
        className={`block product-img-frame ${imageFrameClass(compact, featured)}`}
      >
        <Image
          src={featured && imageHero ? imageHero : imageCard}
          alt={name}
          fill
          className={`${featured ? "product-img-cover" : "product-img"} transition-transform duration-500 group-hover:scale-[1.02]`}
          sizes={featured ? "50vw" : "(max-width:768px) 100vw, 25vw"}
        />
      </Link>
      <div className={`flex flex-col flex-1 ${compact ? "p-5" : "p-6"}`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <p className="text-[10px] uppercase tracking-[0.16em] text-blue-700 font-medium">{category}</p>
          {!compact && <StockBadge stock={stock} />}
        </div>
        <Link href={`/products/${slug}`}>
          <h3 className={`font-semibold text-neutral-900 mb-2 group-hover:text-blue-700 transition-colors ${compact ? "text-base" : "text-lg"}`}>
            {name}
          </h3>
        </Link>
        <p className={`text-neutral-600 mb-4 line-clamp-2 flex-1 ${compact ? "text-xs" : "text-sm leading-relaxed"}`}>
          {shortDesc}
        </p>
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-100">
          <span className={`font-semibold text-neutral-900 ${compact ? "text-sm" : "text-lg"}`}>{priceLabel}</span>
          <div className="flex items-center gap-2">
            <Link href={`/contact?product=${slug}`} className="btn-primary text-xs py-2 px-4">
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
  const priceLabel = formatProductPrice(priceUsd);

  return (
    <article className="group card card-hover rounded-xl overflow-hidden">
      <Link href={`/products/${slug}`} className="block product-img-frame aspect-square min-h-[220px]">
        <Image
          src={imageCard}
          alt={name}
          fill
          className="product-img transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="25vw"
        />
      </Link>
      <div className="p-5 border-t border-neutral-100">
        <h3 className="text-sm font-semibold text-neutral-900 mb-1 group-hover:text-blue-700 transition-colors">{name}</h3>
        <p className="text-sm font-medium text-blue-700 mb-4">{priceLabel}</p>
        <Link href={`/contact?product=${slug}`} className="btn-primary text-xs py-2.5 px-4 w-full text-center block">
          Request Quote
        </Link>
      </div>
    </article>
  );
}

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-neutral-200 border border-neutral-200 bg-white rounded-xl shadow-sm overflow-hidden">
      {items.map((item, i) => (
        <details key={i} className="group px-6 md:px-8 py-5">
          <summary className="font-medium text-neutral-900 cursor-pointer list-none flex justify-between items-center gap-6 text-base md:text-lg">
            {item.question}
            <span className="text-blue-600 group-open:rotate-45 transition-transform text-2xl shrink-0 leading-none">+</span>
          </summary>
          <p className="mt-4 text-neutral-600 text-sm md:text-base leading-relaxed pb-2 max-w-3xl">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function BuyButtons({ slug, name }: { slug: string; name: string; stock?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Link href={`/contact?product=${slug}`} className="btn-primary">
          Request a Quote
        </Link>
        <a href={whatsappQuoteUrl(name)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          WhatsApp Quote
        </a>
      </div>
      <p className="text-xs text-neutral-500 leading-relaxed max-w-md">
        Quote-first B2B — list price shown for reference. We confirm freight, payment terms, and lead time on your written quote before you pay.
      </p>
    </div>
  );
}
