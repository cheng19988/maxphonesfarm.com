import { prisma } from "./prisma";
import { PRODUCT_GROUPS, PRODUCT_SEEDS, type ProductGroupId, type ProductSeed } from "@/data/products";

export type ProductRecord = {
  id: string;
  slug: string;
  name: string;
  group: ProductGroupId;
  category: string;
  shortDesc: string;
  description: string;
  features: string;
  specs: string;
  scenarios: string;
  accessories: string;
  delivery: string;
  maintenance: string;
  faq: string;
  priceUsd: number;
  stock: number;
  imageCard: string;
  imageHero: string;
  imageDetail: string;
  published: boolean;
};

function seedToRecord(seed: ProductSeed): ProductRecord {
  return {
    id: seed.slug,
    slug: seed.slug,
    name: seed.name,
    group: seed.group,
    category: seed.category,
    shortDesc: seed.shortDesc,
    description: seed.description,
    features: JSON.stringify(seed.features),
    specs: JSON.stringify(seed.specs),
    scenarios: JSON.stringify(seed.scenarios),
    accessories: JSON.stringify(seed.accessories),
    delivery: JSON.stringify(seed.delivery),
    maintenance: JSON.stringify(seed.maintenance),
    faq: JSON.stringify(seed.faq),
    priceUsd: seed.priceUsd,
    stock: seed.stock,
    imageCard: seed.imageCard,
    imageHero: seed.imageHero,
    imageDetail: seed.imageDetail,
    published: true,
  };
}

export async function getPublishedProducts(): Promise<ProductRecord[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { published: true },
      orderBy: { priceUsd: "desc" },
    });
    if (rows.length > 0) {
      return rows.map((row) => {
        const seed = PRODUCT_SEEDS.find((s) => s.slug === row.slug);
        return {
          ...row,
          group: seed?.group ?? ("accessories" as ProductGroupId),
          imageCard: seed?.imageCard ?? row.imageCard,
          imageHero: seed?.imageHero ?? row.imageHero,
          imageDetail: seed?.imageDetail ?? row.imageDetail,
        };
      });
    }
  } catch (error) {
    console.error("[products] Database query failed, using static catalog:", error);
  }
  return PRODUCT_SEEDS.map(seedToRecord).sort((a, b) => b.priceUsd - a.priceUsd);
}

export async function getProductBySlug(slug: string): Promise<ProductRecord | null> {
  try {
    const row = await prisma.product.findUnique({ where: { slug } });
    if (row) {
      const seed = PRODUCT_SEEDS.find((s) => s.slug === row.slug);
      return {
        ...row,
        group: seed?.group ?? ("accessories" as ProductGroupId),
        imageCard: seed?.imageCard ?? row.imageCard,
        imageHero: seed?.imageHero ?? row.imageHero,
        imageDetail: seed?.imageDetail ?? row.imageDetail,
      };
    }
  } catch (error) {
    console.error(`[products] Database lookup failed for ${slug}:`, error);
  }
  const seed = PRODUCT_SEEDS.find((p) => p.slug === slug);
  return seed ? seedToRecord(seed) : null;
}

export async function listProducts(options?: {
  category?: string;
  orderBy?: "price-desc" | "price-asc" | "name";
}): Promise<ProductRecord[]> {
  let products = await getPublishedProducts();

  if (options?.category) {
    products = products.filter((p) => p.category === options.category);
  }

  if (options?.orderBy === "price-asc") {
    products.sort((a, b) => a.priceUsd - b.priceUsd);
  } else if (options?.orderBy === "name") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }

  return products;
}

export async function getProductsGrouped() {
  const products = await getPublishedProducts();
  return PRODUCT_GROUPS.map((g) => ({
    ...g,
    products: products.filter((p) => p.group === g.id),
  })).filter((g) => g.products.length > 0);
}
