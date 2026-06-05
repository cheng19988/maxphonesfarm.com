import { Pool, type PoolConfig } from "pg";

function shouldUseSsl(connectionString: string): boolean {
  const isLocal =
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1");

  if (isLocal) return false;

  if (/neon\.tech|supabase\.co|vercel-storage\.com|rds\.amazonaws\.com/i.test(connectionString)) {
    return true;
  }

  return /sslmode=(require|verify-full|verify-ca|prefer)/i.test(connectionString);
}

/** Neon / Vercel Postgres connection settings for serverless. */
export function getPgPoolConfig(connectionString: string): PoolConfig {
  return {
    connectionString,
    ssl: shouldUseSsl(connectionString) ? { rejectUnauthorized: false } : undefined,
    max: process.env.VERCEL ? 1 : 10,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 10_000,
  };
}

export function createPgPool(connectionString: string) {
  return new Pool(getPgPoolConfig(connectionString));
}
