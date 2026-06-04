import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/commerce";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Enterprise Phone Farm Hardware Shop",
  description:
    "Rackmount phone farm boxes, enterprise phone farm hardware, motherboard boxes, power, cooling, and custom cabinets. Factory-direct from Guangzhou.",
  path: "/products",
});

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; category?: string }>;
}) {
  const params = await searchParams;
  const orderBy =
    params.sort === "price-desc"
      ? { priceUsd: "desc" as const }
      : params.sort === "price-asc"
        ? { priceUsd: "asc" as const }
        : { priceUsd: "desc" as const };

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(params.category ? { category: params.category } : {}),
    },
    orderBy,
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Max Phones Farm Models</h1>
        <p className="section-subtitle">
          Enterprise rackmount and server-style phone farm hardware — USD pricing. In-stock units ship within 3–5 business days from Guangzhou.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/products"
            className={`px-4 py-2 text-sm border ${!params.category ? "border-white text-white" : "border-neutral-700 text-neutral-500 hover:border-neutral-500"}`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className={`px-4 py-2 text-sm border ${params.category === cat ? "border-white text-white" : "border-neutral-700 text-neutral-500 hover:border-neutral-500"}`}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="flex gap-4 mb-10 text-sm text-neutral-500">
          <span>Sort:</span>
          <Link href="/products?sort=price-desc" className="hover:text-white">Price High</Link>
          <Link href="/products?sort=price-asc" className="hover:text-white">Price Low</Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} slug={p.slug} name={p.name} shortDesc={p.shortDesc} priceUsd={p.priceUsd} stock={p.stock} imageCard={p.imageCard} category={p.category} />
          ))}
        </div>
      </div>
    </div>
  );
}
