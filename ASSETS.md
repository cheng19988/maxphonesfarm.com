# Asset Library — maxphonesfarm.com

## Canonical root

```
D:\网站搭建素材库
```

## Preferred site pack (Max Phones Farm)

```
D:\网站搭建素材库\FINAL_phonefarm_6sites_package_CN\02_六个网站分类素材\05_maxphonesfarm.com_premium_english_site\
├── card_800x800\
├── detail_1200x900\
└── hero_1600x900\
```

If the FINAL package folder is not present, sync falls back to:

```
D:\网站搭建素材库\02_six_website_ready\maxphonesfarm.com_premium_english_site\
```

## Facility photos (real company)

From `D:\网站搭建素材库\公司照片1\` → `public/images/facility/`

## Sync command

```bash
npm run assets:sync
```

## Usage

| Asset type | Use |
|------------|-----|
| `maxphonesfarm.com-product-box-*` | Phone farm box, rackmount placeholder, product cards |
| `facility/*.png` | About, homepage, services — real office/workshop/warehouse |
| `maxphonesfarm.com-service-scenes-*` | **Avoid for hero/flagship** — AI-style scenes; use facility photos instead |

## Photos still needed (real shoot)

Priority product photography to replace placeholders and improve B2B credibility:

1. **Rackmount Phone Farm +20** — 2U chassis in a real 19" rack (front + side)
2. **Motherboard Box** — screenless node array with internal wiring visible
3. **Internal wiring / USB backplane** — close-up for product detail pages
4. **Export packing** — foam-lined carton, label, and unit before shipment
5. **Enterprise Phone Farm Box** — dedicated angle distinct from rackmount if possible

Current mapping note: `custom-cabinet` (Rackmount +20) temporarily shares phone farm box product photos until rackmount rack photos are available.
