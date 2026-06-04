# Max Phones Farm — maxphonesfarm.com

Enterprise-grade real-device phone farm hardware website. Reference design: [cellhasher.com](https://cellhasher.com/).

## Stack

- Next.js 16 (App Router)
- Prisma + SQLite
- USDT TRC20 order payment (verification API stub)

## Setup

```bash
npm install
npm run assets:sync   # copy images from D:\网站搭建素材库
npm run dev
```

## Assets

Material library: `D:\网站搭建素材库`  
Site pack: `02_six_website_ready\maxphonesfarm.com_premium_english_site` (or FINAL package path when available)

See [ASSETS.md](./ASSETS.md).

## Admin

- URL: `/admin`
- Email: `admin@maxphonesfarm.com`
- Password: `admin123456`

## Build

```bash
npm run build
npm start
```

## Vercel deployment

1. Create a **PostgreSQL** database ([Neon](https://neon.tech), Vercel Postgres, or Supabase).
2. In Vercel → Project → Settings → Environment Variables, add:
   - `DATABASE_URL` — PostgreSQL connection string (`?sslmode=require` for Neon)
   - `JWT_SECRET` — random secret string
3. Deploy. Build runs `prisma generate && next build` (no SQLite; compatible with Vercel serverless).
4. After first deploy, seed the database once from your machine:

```bash
DATABASE_URL="your-production-url" npm run db:setup
```

Admin login: `admin@maxphonesfarm.com` / `admin123456`
