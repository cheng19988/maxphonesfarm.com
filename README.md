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
ADMIN_EMAIL=admin@maxphonesfarm.com      # optional
ADMIN_PASSWORD=change-me-immediately     # optional — CHANGE after first deploy
TRON_API_KEY=                            # optional — USDT auto-verify inactive without this
TELEGRAM_BOT_TOKEN=                      # optional — bot token for inquiry notifications
TELEGRAM_NOTIFY_CHAT_ID=                 # optional — chat/group ID to receive inquiry alerts
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
- Default seed credentials: `admin@maxphonesfarm.com` / `admin123456`
- **Change the admin password immediately after first deploy**

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
