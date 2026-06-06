import "dotenv/config";
import pg from "pg";

const connectionString = process.env.DATABASE_URL?.trim();
if (!connectionString) {
  console.error("[cleanup-test-inquiries] DATABASE_URL must be set.");
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: connectionString.includes("neon.tech") ? { rejectUnauthorized: false } : undefined,
});

await client.connect();

const preview = await client.query(
  `SELECT id, name, email, status FROM "ContactSubmission"
   WHERE email = $1 AND name ILIKE $2`,
  ["test@example.com", "%Test%"]
);

if (preview.rows.length === 0) {
  console.log("[cleanup-test-inquiries] No matching test inquiries found.");
  await client.end();
  process.exit(0);
}

console.log(`[cleanup-test-inquiries] Will delete ${preview.rows.length} row(s):`);
for (const row of preview.rows) {
  console.log(`  - ${row.id} | ${row.name} | ${row.status}`);
}

const result = await client.query(
  `DELETE FROM "ContactSubmission"
   WHERE email = $1 AND name ILIKE $2
   RETURNING id`,
  ["test@example.com", "%Test%"]
);

console.log(`[cleanup-test-inquiries] Deleted ${result.rowCount} test inquiry row(s).`);
await client.end();
