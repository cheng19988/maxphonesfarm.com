import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { createPgPool } from "../src/lib/pg-pool.js";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();
  const connectionString = process.env.DATABASE_URL?.trim();

  if (!email || !password) {
    console.error("[admin:reset] ADMIN_EMAIL and ADMIN_PASSWORD must both be set.");
    process.exit(1);
  }

  if (!connectionString) {
    console.error("[admin:reset] DATABASE_URL must be set.");
    process.exit(1);
  }

  if (password.length < 12) {
    console.error("[admin:reset] ADMIN_PASSWORD must be at least 12 characters.");
    process.exit(1);
  }

  const pool = createPgPool(connectionString);
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.upsert({
      where: { email },
      update: { passwordHash, role: "admin", name: "Admin" },
      create: { email, passwordHash, role: "admin", name: "Admin" },
    });
    console.log(`[admin:reset] Admin password updated for ${user.email}`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("[admin:reset] Failed:", error instanceof Error ? error.message : "unknown error");
  process.exit(1);
});
