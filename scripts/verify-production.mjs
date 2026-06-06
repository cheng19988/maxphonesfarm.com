import { config } from "dotenv";
import pg from "pg";

config({ path: ".env.production.local" });

const KEYS = [
  "DATABASE_URL",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_NOTIFY_CHAT_ID",
  "TRON_API_KEY",
];

console.log("=== Production env (presence only) ===");
for (const key of KEYS) {
  const v = process.env[key]?.trim() ?? "";
  console.log(`${key}: ${v.length > 0 ? `set (len=${v.length})` : "NOT SET"}`);
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL missing — cannot check schema");
  process.exit(1);
}

const client = new pg.Client({
  connectionString: url,
  ssl: url.includes("neon.tech") ? { rejectUnauthorized: false } : undefined,
});

await client.connect();

const cols = await client.query(`
  SELECT column_name FROM information_schema.columns
  WHERE table_name = 'ContactSubmission'
  ORDER BY column_name
`);

const names = cols.rows.map((r) => r.column_name);
console.log("\n=== ContactSubmission columns ===");
console.log(names.join(", "));

for (const col of ["company", "sourcePage", "status"]) {
  console.log(`${col}: ${names.includes(col) ? "OK" : "MISSING"}`);
}

const test = await client.query(
  `SELECT id, status, "sourcePage", company, "productInterest", "createdAt"
   FROM "ContactSubmission"
   WHERE name = $1 AND company = $2
   ORDER BY "createdAt" DESC LIMIT 1`,
  ["Test Inquiry", "Max Phones Farm Test"]
);

console.log("\n=== Latest test inquiry ===");
if (test.rows.length === 0) {
  console.log("NOT FOUND");
} else {
  const row = test.rows[0];
  console.log("id:", row.id);
  console.log("status:", row.status);
  console.log("sourcePage:", row.sourcePage);
  console.log("company:", row.company);
  console.log("productInterest:", row.productInterest);
  console.log("createdAt:", row.createdAt);
}

await client.end();
