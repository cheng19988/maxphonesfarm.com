import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PRODUCT_SEEDS } from "../src/data/products.js";
import bcrypt from "bcryptjs";
import { createPgPool } from "../src/lib/pg-pool.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database");
}

const pool = createPgPool(connectionString);
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const seed of PRODUCT_SEEDS) {
    await prisma.product.upsert({
      where: { slug: seed.slug },
      update: {
        name: seed.name,
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
      },
      create: {
        slug: seed.slug,
        name: seed.name,
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
      },
    });
  }

  await prisma.user.upsert({
    where: { email: "admin@maxphonesfarm.com" },
    update: {},
    create: {
      email: "admin@maxphonesfarm.com",
      name: "Admin",
      role: "admin",
      passwordHash: await bcrypt.hash("admin123456", 12),
    },
  });

  console.log("Seeded products and admin user");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
