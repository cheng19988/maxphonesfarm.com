import Link from "next/link";
import { getProductsGrouped } from "@/lib/products";
import { ProductCard } from "@/components/commerce";
import { buildMetadata } from "@/lib/seo";
import { whatsappQuoteUrl } from "@/lib/whatsapp";
import type { ProductGroupId } from "@/data/products";

export const metadata = buildMetadata({
  title: "Real-Device Lab Hardware Catalog",
  description:
    "Complete rackmount systems, core hardware, and lab accessories for phone farm deployments. Factory-direct from Guangzhou — request a quote.",
  path: "/products",
});

const GROUP_LAYOUT: Record<ProductGroupId, { grid: string; compact: boolean }> = {
  "complete-systems": { grid: "grid sm:grid-cols-2 gap-8", compact: false },
  "core-hardware": { grid: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", compact: false },
  accessories: { grid: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", compact: true },
};

export default async function ProductsPage() {
  const grouped = await getProductsGrouped();

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Hardware Catalog</h1>
        <p className="section-subtitle max-w-3xl">
          Factory-direct phone farm hardware for enterprise device labs — complete systems, core infrastructure, and deployment accessories. USD list prices shown; bulk and custom configurations quoted separately.
        </p>

        {grouped.map((group, index) => {
          const layout = GROUP_LAYOUT[group.id];
          return (
            <section
              key={group.id}
              className={`mb-20 last:mb-0 ${index === 0 ? "" : "pt-12 border-t border-neutral-800"}`}
            >
              <h2 className={`font-semibold text-white mb-2 ${index === 0 ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                {group.label}
              </h2>
              <p className="text-neutral-500 text-sm mb-8 max-w-3xl leading-relaxed">{group.description}</p>
              <div className={layout.grid}>
                {group.products.map((p) => (
                  <ProductCard
                    key={p.id}
                    slug={p.slug}
                    name={p.name}
                    shortDesc={p.shortDesc}
                    priceUsd={p.priceUsd}
                    stock={p.stock}
                    imageCard={p.imageCard}
                    category={p.category}
                    compact={layout.compact}
                  />
                ))}
              </div>
            </section>
          );
        })}

        <div className="mt-16 pt-12 border-t border-neutral-800">
          <div className="border border-neutral-800 p-8 md:p-10 text-center bg-neutral-950">
            <h2 className="text-xl font-semibold text-white mb-3">Custom Rack or Multi-Lab Deployment?</h2>
            <p className="text-neutral-500 text-sm mb-6 max-w-xl mx-auto">
              Share your device count, target models, and destination country. We reply with specifications, lead time, and USD pricing.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">Request Custom Quote</Link>
              <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                WhatsApp Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
