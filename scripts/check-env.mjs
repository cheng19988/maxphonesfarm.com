import { config } from "dotenv";

config({ path: ".env.production.local" });
config();

const KEYS = [
  "DATABASE_URL",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_NOTIFY_CHAT_ID",
  "TELEGRAM_NOTIFY_CHAT",
  "TRON_API_KEY",
];

console.log("=== Env presence (values not shown) ===");
for (const key of KEYS) {
  const v = process.env[key]?.trim() ?? "";
  console.log(`${key}: ${v.length > 0 ? `set (len=${v.length})` : "NOT SET"}`);
}
