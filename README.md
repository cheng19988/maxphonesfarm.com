# Max Phones Farm — maxphonesfarm.com

English **quote-first B2B** website for Guangzhou factory-direct rackmount phone farm hardware. Reference rhythm: [cellhasher.com](https://cellhasher.com/) (structure only — independent brand and content).

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS 4**
- **PostgreSQL** via Prisma 7 + `@prisma/adapter-pg` (Neon in production)
- **Vercel** deployment

Public conversion path: **Contact form + WhatsApp Quote** — not a Shopify-style checkout.

Legacy `/api/orders`, USDT payment stubs, Login/Register, and `/admin` remain in code for internal or future use but are **not linked** from the public storefront. `robots.txt` disallows admin, login, register, orders, and account routes.

## Required environment variables

```env
DATABASE_URL=postgresql://...@...neon.tech/...?sslmode=require
JWT_SECRET=your-random-secret
ADMIN_EMAIL=admin@maxphonesfarm.com      # required for npm run admin:reset
ADMIN_PASSWORD=change-me-immediately     # min 12 chars — set before production use
TELEGRAM_BOT_TOKEN=                       # optional — inquiry notifications
TELEGRAM_NOTIFY_CHAT_ID=                # optional — sales group chat ID (alias: TELEGRAM_NOTIFY_CHAT)
TRON_API_KEY=                            # optional — USDT auto-verify inactive without this
```

### Telegram inquiry notifications

When a visitor submits the `/contact` form, the inquiry is saved to the database and a Telegram message is sent if both variables are set:

1. Create a bot via [@BotFather](https://t.me/BotFather) → copy `TELEGRAM_BOT_TOKEN`
2. Add the bot to your sales group or start a chat → get `TELEGRAM_NOTIFY_CHAT_ID` (use [@userinfobot](https://t.me/userinfobot) or Telegram API `getUpdates`)
3. Add both to Vercel environment variables and redeploy

If either variable is missing, the form still saves successfully — a log line `[telegram] Inquiry notification skipped` appears in server logs.

After schema changes (inquiry `status`, `company`, `sourcePage`), run:

```bash
npm run db:setup
```

Or let Vercel build run `scripts/setup-db.mjs` against Neon.

## Email configuration

Public contact email is read from `src/lib/config.ts` → `CONTACT.email`.

- **Current value:** `qiuxui646@gmail.com` (real, working inbox)
- **Do not** display unprovisioned addresses such as `sales@maxphonesfarm.com` on the public site
- When a domain mailbox is set up, update `CONTACT.email` in config only — all Header, Footer, Contact, FAQ, and Schema will follow automatically
- Recommended after launch: configure a domain email for stronger B2B trust

## Copy policy

- Do **not** add unverified founding years (e.g. “Since 2017”) to public pages, metadata, or JSON-LD.
- Use factual positioning instead: Guangzhou factory-direct supplier, export-ready device lab hardware.

## Setup

```bash
npm install
npm run assets:sync   # copy images from D:\网站搭建素材库
npm run dev
```

## Database

```bash
npm run db:setup      # prisma db push + seed (local or against Neon)
```

Build on Vercel runs `scripts/setup-db.mjs` when `DATABASE_URL` is set.

## Admin

- URL: `/admin` (not linked from public header/footer)
- First deploy only: seed may create `admin@maxphonesfarm.com` with default password if no admin exists
- **Rotate password before production use** — see below

### Production admin password rotation

1. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` (minimum 12 characters) in **Vercel → Production**.
2. Ensure `DATABASE_URL` points at production Neon.
3. Run:

```bash
npm run admin:reset
```

4. Log in at `/login` with the new credentials; open `/admin`.
5. Confirm legacy password `admin123456` **no longer works**.

Re-deploying or `npm run db:setup` will **not** overwrite an existing admin password (`prisma/seed.ts` skips admin when user already exists).

### Test inquiry cleanup

```bash
npm run admin:cleanup-test-inquiries
```

Deletes only rows where `email = test@example.com` and `name` contains `Test`.

## Assets

Material library: `D:\网站搭建素材库`  
See [ASSETS.md](./ASSETS.md).

## Payment note

USDT TRC20 payment verification is a **stub** unless `TRON_API_KEY` is configured and TronGrid integration is completed. This is **not** the current public conversion path.

## Build

```bash
npm run build
npm start
```
