# Max Phones Farm — maxphonesfarm.com

English B2B website for Guangzhou factory-direct rackmount phone farm hardware. Reference rhythm: [cellhasher.com](https://cellhasher.com/) (structure only — independent brand and content).

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS 4**
- **PostgreSQL** via Prisma 7 + `@prisma/adapter-pg` (Neon in production)
- **Vercel** deployment

Public site is **quote-first** (Contact form + WhatsApp). Order/USDT API routes exist for internal use but are not linked from the public storefront.

## Required environment variables

```env
DATABASE_URL=postgresql://...@...neon.tech/...?sslmode=require
JWT_SECRET=your-random-secret
ADMIN_EMAIL=admin@maxphonesfarm.com      # optional
ADMIN_PASSWORD=change-me-immediately     # optional — CHANGE after first deploy
TRON_API_KEY=                            # optional — USDT auto-verify inactive without this
```

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

- URL: `/admin` (not linked from public header)
- Default seed credentials: `admin@maxphonesfarm.com` / `admin123456`
- **Change the admin password immediately after first deploy**

## Assets

Material library: `D:\网站搭建素材库`  
See [ASSETS.md](./ASSETS.md).

## Payment note

USDT TRC20 payment verification is a **stub** unless `TRON_API_KEY` is configured and TronGrid integration is completed. Do not advertise online USDT checkout on the public site.

## Build

```bash
npm run build
npm start
```
