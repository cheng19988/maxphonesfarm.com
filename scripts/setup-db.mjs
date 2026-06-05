import { execSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  console.log("[setup-db] DATABASE_URL not set — skipping db push and seed");
  process.exit(0);
}

console.log("[setup-db] Running prisma db push...");
execSync("npx prisma db push --skip-generate", { stdio: "inherit" });

console.log("[setup-db] Seeding database...");
execSync("npx tsx prisma/seed.ts", { stdio: "inherit" });

console.log("[setup-db] Done");
