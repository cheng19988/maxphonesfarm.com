/**
 * Process additional product photos from E:\主板机照片素材\主板机白底
 * into card / hero / detail webp tiers for public/images.
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const SRC = "E:/主板机照片素材/主板机白底";
const OUT = path.resolve("public/images");
const P = "maxphonesfarm.com";

const ASSETS = [
  { file: "2025_10_25_12_01_IMG_0579.png", slug: "product-box-2025-10-25-12-01-img-0579" },
  { file: "2025_10_25_11_45_IMG_0575.png", slug: "product-box-2025-10-25-11-45-img-0575" },
  { file: "Untitled image (1).png", slug: "product-box-untitled-1-setup" },
  { file: "2025_10_25_11_40_IMG_0571.png", slug: "product-box-2025-10-25-11-40-img-0571" },
];

async function processOne(srcPath, slug) {
  const base = `${P}-${slug}`;
  const card = path.join(OUT, "card_800x800", `${base}-card_800x800.webp`);
  const hero = path.join(OUT, "hero_1600x900", `${base}-hero_1600x900.webp`);
  const detail = path.join(OUT, "detail_1200x900", `${base}-detail_1200x900.webp`);

  await sharp(srcPath).resize(800, 800, { fit: "cover", position: "centre" }).webp({ quality: 86 }).toFile(card);
  await sharp(srcPath).resize(1600, 900, { fit: "cover", position: "centre" }).webp({ quality: 86 }).toFile(hero);
  await sharp(srcPath).resize(1200, 900, { fit: "cover", position: "centre" }).webp({ quality: 86 }).toFile(detail);
  console.log("processed:", slug);
}

if (!fs.existsSync(SRC)) {
  console.warn("[process-extra-assets] Source folder not found:", SRC);
  process.exit(0);
}

for (const sub of ["card_800x800", "hero_1600x900", "detail_1200x900"]) {
  fs.mkdirSync(path.join(OUT, sub), { recursive: true });
}

for (const { file, slug } of ASSETS) {
  const src = path.join(SRC, file);
  if (!fs.existsSync(src)) {
    console.warn("skip missing:", file);
    continue;
  }
  await processOne(src, slug);
}

console.log("Extra asset processing complete.");
