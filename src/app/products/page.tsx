import Link from "next/link";
import { getProductsGrouped } from "@/lib/products";
import { ProductCard } from "@/components/commerce";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Real-Device Lab Hardware Catalog",
  description:
    "Complete rackmount systems, core hardware, and lab accessories for phone farm deployments. Factory-direct from Guangzhou with USD list pricing.",
  path: "/products",
});

export default async function ProductsPage() {
  const grouped = await getProductsGrouped();

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Hardware Catalog</h1>
        <p className="section-subtitle">
          Complete systems, core hardware, and accessories for device labs. USD list prices — bulk and custom projects quoted separately.
        </p>

        {grouped.map((group) => (
          <section key={group.id} className="mb-20 last:mb-0">
            <h2 className="text-2xl font-semibold text-white mb-2">{group.label}</h2>
            <p className="text-neutral-500 text-sm mb-8 max-w-2xl">{group.description}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                />
              ))}
            </div>
          </section>
        ))}

        <div className="mt-16 pt-12 border-t border-neutral-800 text-center">
          <p className="text-neutral-500 text-sm mb-4">Need a custom rack layout or multi-lab deployment plan?</p>
          <Link href="/contact" className="btn-primary">Request Custom Quote</Link>
        </div>
      </div>
    </div>
  );
}
