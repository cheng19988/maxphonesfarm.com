/**
 * Rebuild 800×800 product cards from white-background PNGs.
 * Uses contain + white canvas so cards match the site (no black letterboxing).
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT = path.resolve("public/images/card_800x800");
const P = "maxphonesfarm.com";
const WHITE_BG = "E:/主板机照片素材/主板机白底";

/** @type {{ file: string; slug: string }[]} */
const PRODUCTS = [
  { file: "2025_10_25_11_27_IMG_0551.png", slug: "product-box-2025-10-25-11-27-img-0551-a9b35" },
  { file: "2025_10_25_11_21_IMG_0547.png", slug: "product-box-2025-10-25-11-21-img-0547-4b35a" },
  { file: "2025_10_25_11_28_IMG_0553.png", slug: "product-box-2025-10-25-11-28-img-0553-47327" },
  { file: "2025_10_25_11_37_IMG_0566.png", slug: "product-box-2025-10-25-11-37-img-0566-ee21b" },
  { file: "2025_10_25_11_40_IMG_0571.png", slug: "product-box-2025-10-25-11-40-img-0571" },
  { file: "2025_10_25_11_24_IMG_0549.png", slug: "product-box-2025-10-25-11-24-img-0549-f696b" },
  { file: "2025_10_25_12_01_IMG_0579.png", slug: "product-box-2025-10-25-12-01-img-0579" },
  { file: "2025_10_25_11_45_IMG_0575.png", slug: "product-box-2025-10-25-11-45-img-0575" },
  { file: "2025_10_25_11_33_IMG_0561.png", slug: "product-box-2025-10-25-11-33-img-0561-db197" },
  { file: "2025_10_25_11_29_IMG_0556 - 25-10-2025 22-02-38.png", slug: "product-box-2025-10-25-11-29-img-0556-25-10-2025-22-02-38-73237" },
  { file: "Untitled image (1).png", slug: "product-box-untitled-1-setup" },
  { file: "Untitled image.png", slug: "product-box-0f5501e1584de9a625d220f62951bc6d-d04df" },
];

fs.mkdirSync(OUT, { recursive: true });

for (const { file, slug } of PRODUCTS) {
  const src = path.join(WHITE_BG, file);
  if (!fs.existsSync(src)) {
    console.warn("skip missing:", src);
    continue;
  }
  const out = path.join(OUT, `${P}-${slug}-card_800x800.webp`);
  await sharp(src)
    .resize(800, 800, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255 },
    })
    .webp({ quality: 90 })
    .toFile(out);
  console.log("card:", slug);
}

console.log("Product cards reprocessed with white contain fit.");
