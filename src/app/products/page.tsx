import Link from "next/link";
import { getProductsGrouped } from "@/lib/products";
import { ProductCard } from "@/components/commerce";
import { PageHero } from "@/components/page-hero";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import type { ProductGroupId } from "@/data/products";

export const metadata = buildMetadata({
  title: "Real-Device Lab Hardware Catalog",
  description:
    "Complete rackmount systems, core hardware, and lab accessories for phone farm deployments. Factory-direct from Guangzhou — request a quote.",
  path: "/products",
});

const GROUP_LAYOUT: Record<ProductGroupId, { grid: string; compact: boolean }> = {
  "complete-systems": { grid: "grid sm:grid-cols-2 gap-8", compact: false },
  "core-hardware": { grid: "product-grid", compact: false },
  accessories: { grid: "product-grid", compact: true },
};

export default async function ProductsPage() {
  const grouped = await getProductsGrouped();

  return (
    <>
      <PageHero
        variant="banner"
        label="Hardware Catalog"
        title="Real-Device Lab Hardware"
        subtitle="Factory-direct phone farm hardware for enterprise device labs — complete systems, core infrastructure, and deployment accessories."
        image={IMAGES.motherboardBox.hero}
        imageAlt="Phone farm hardware catalog"
      >
        <Link href="/contact" className="btn-primary">Request Custom Quote</Link>
      </PageHero>

      <div className="section">
        <div className="container-wide">
          {grouped.map((group, index) => {
            const layout = GROUP_LAYOUT[group.id];
            return (
              <section
                key={group.id}
                className={`${index === 0 ? "" : "pt-20 mt-20 border-t border-neutral-200"}`}
              >
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">{group.label}</h2>
                <p className="text-neutral-500 mb-10 max-w-3xl leading-relaxed">{group.description}</p>
                <div className={layout.grid}>
                  {group.products.map((p, i) => (
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
                      featured={index === 0 && i === 0}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <section className="section-tight border-t border-neutral-200 section-muted">
        <div className="container-wide">
          <ContactCTA
            title="Custom Rack or Multi-Lab Deployment?"
            subtitle="Share your device count, target models, and destination country. We reply with specifications, lead time, and USD pricing."
          />
        </div>
      </section>
    </>
  );
}
