import { execSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  console.log("[setup-db] DATABASE_URL not set — skipping db push and seed");
  process.exit(0);
}

function run(command) {
  console.log(`[setup-db] Running: ${command}`);
  execSync(command, { stdio: "inherit" });
}

// prisma generate already runs before this script in the build pipeline
run("npx prisma db push");

console.log("[setup-db] Seeding database...");
run("npx tsx prisma/seed.ts");

console.log("[setup-db] Done");
