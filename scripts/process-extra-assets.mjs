/**
 * Process source photos from user asset libraries into webp tiers.
 * Includes white-background product shots, watermarked slides, and promo photos.
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT = path.resolve("public/images");
const P = "maxphonesfarm.com";

/** @type {{ src: string; file: string; slug: string }[]} */
const ASSETS = [
  // White-background product shots
  { src: "E:/主板机照片素材/主板机白底", file: "2025_10_25_12_01_IMG_0579.png", slug: "product-box-2025-10-25-12-01-img-0579" },
  { src: "E:/主板机照片素材/主板机白底", file: "2025_10_25_11_45_IMG_0575.png", slug: "product-box-2025-10-25-11-45-img-0575" },
  { src: "E:/主板机照片素材/主板机白底", file: "Untitled image (1).png", slug: "product-box-untitled-1-setup" },
  { src: "E:/主板机照片素材/主板机白底", file: "2025_10_25_11_40_IMG_0571.png", slug: "product-box-2025-10-25-11-40-img-0571" },
  // Watermarked presentation slides (16:9 — rack, deployment, comparison)
  { src: "E:/主板机照片素材/水印/演示文稿", file: "幻灯片18.png", slug: "promo-slide-18-rackmount" },
  { src: "E:/主板机照片素材/水印/演示文稿", file: "幻灯片8.png", slug: "promo-slide-08-rack-lab" },
  { src: "E:/主板机照片素材/水印/演示文稿", file: "幻灯片2.png", slug: "promo-slide-02-overview" },
  { src: "E:/主板机照片素材/水印/演示文稿", file: "幻灯片4.png", slug: "promo-slide-04-before" },
  { src: "E:/主板机照片素材/水印/演示文稿", file: "幻灯片10.png", slug: "promo-slide-10-after" },
  { src: "E:/主板机照片素材/水印/演示文稿", file: "幻灯片15.png", slug: "promo-slide-15-deployment" },
  // Promo / factory photos
  { src: "E:/宣传资料主板机照片", file: "721a7543fafddff991b722774b74425.jpg", slug: "promo-factory-721a7543" },
  { src: "E:/宣传资料主板机照片", file: "f2747fe7f0e47f38e836abf0a430643f.jpg", slug: "promo-factory-f2747fe7" },
  { src: "E:/宣传资料主板机照片", file: "93bb1ee473c940c61f0ef2dd029c861.jpg", slug: "promo-factory-93bb1ee4" },
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

for (const sub of ["card_800x800", "hero_1600x900", "detail_1200x900"]) {
  fs.mkdirSync(path.join(OUT, sub), { recursive: true });
}

for (const { src, file, slug } of ASSETS) {
  const full = path.join(src, file);
  if (!fs.existsSync(full)) {
    console.warn("skip missing:", full);
    continue;
  }
  await processOne(full, slug);
}

console.log("Source asset processing complete.");
