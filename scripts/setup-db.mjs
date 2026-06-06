import { execSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  console.log("[setup-db] DATABASE_URL not set — skipping db push and seed");
  process.exit(0);
}

function run(command) {
  console.log(`[setup-db] Running: ${command}`);
  execSync(command, { stdio: "inherit" });
}

const adminEmail = process.env.ADMIN_EMAIL?.trim();
const adminPassword = process.env.ADMIN_PASSWORD?.trim();
const isProduction = process.env.VERCEL_ENV === "production";

// prisma generate already runs before this script in the build pipeline
run("npx prisma db push");

console.log("[setup-db] Seeding database...");
run("npx tsx prisma/seed.ts");

if (adminEmail && adminPassword) {
  console.log("[setup-db] Rotating admin password from ADMIN_EMAIL / ADMIN_PASSWORD...");
  run("npx tsx scripts/reset-admin.ts");
} else if (isProduction) {
  console.warn(
    "[setup-db] ADMIN_EMAIL or ADMIN_PASSWORD not set — admin password was not rotated on this deploy"
  );
} else {
  console.log("[setup-db] ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping admin reset");
}

console.log("[setup-db] Done");
