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
};

export function ProductCard({ slug, name, shortDesc, priceUsd, stock, imageCard, category }: ProductCardProps) {
  return (
    <article className="group flex flex-col border border-neutral-800 bg-neutral-950">
      <Link href={`/products/${slug}`} className="block relative aspect-square overflow-hidden bg-neutral-900">
        <Image src={imageCard} alt={name} fill className="object-cover group-hover:opacity-90 transition-opacity duration-500" sizes="(max-width:768px) 100vw, 33vw" />
      </Link>
      <div className="p-5 flex flex-col flex-1 border-t border-neutral-800">
        <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-600 mb-2">{category}</p>
        <Link href={`/products/${slug}`}>
          <h3 className="font-medium text-white mb-2 group-hover:underline underline-offset-4">{name}</h3>
        </Link>
        <p className="text-sm text-neutral-500 mb-4 line-clamp-2 flex-1">{shortDesc}</p>
        <div className="flex items-center justify-between mb-4 pt-4 border-t border-neutral-800">
          <span className="text-lg font-medium text-white">
            {priceUsd >= 1000 ? `$${priceUsd.toLocaleString()}` : `From $${priceUsd.toLocaleString()}`}
          </span>
          <StockBadge stock={stock} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link href={`/products/${slug}`} className="btn-secondary text-center text-xs py-2.5">View Details</Link>
          <Link href={`/contact?product=${slug}`} className="btn-primary text-center text-xs py-2.5">Get Quote</Link>
        </div>
        <a
          href={whatsappQuoteUrl(name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-center text-xs text-neutral-500 hover:text-white underline underline-offset-4"
        >
          WhatsApp this model
        </a>
      </div>
    </article>
  );
}

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-neutral-800 border border-neutral-800">
      {items.map((item, i) => (
        <details key={i} className="group px-6 py-4">
          <summary className="font-medium text-white cursor-pointer list-none flex justify-between items-center gap-4">
            {item.question}
            <span className="text-neutral-500 group-open:rotate-45 transition-transform text-xl shrink-0">+</span>
          </summary>
          <p className="mt-4 text-neutral-500 text-sm leading-relaxed pb-2">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function BuyButtons({ slug, name }: { slug: string; name: string; stock?: number }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href={`/contact?product=${slug}`} className="btn-primary">
        Request a Quote for This Model
      </Link>
      <a href={whatsappQuoteUrl(name)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
        WhatsApp Sales
      </a>
      <Link href="/contact" className="btn-outline">
        Send Inquiry
      </Link>
    </div>
  );
}
