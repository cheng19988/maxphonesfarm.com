/**
 * Build homepage banner from native high-resolution source (not the 1024px chat upload).
 * Chat uploads are heavily compressed; this exports the matched 4032px original crop.
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const P = "maxphonesfarm.com";
const slug = "home-hero-showroom-lab";
const base = `${P}-${slug}`;
const outDir = path.resolve("public/images/banner_wide");

/** Best match to user banner (1024×438 chat upload) via crop search on E: drive assets */
const HI_RES_SOURCE = "E:/宣传资料主板机照片/aae2bdf797cbf140e26380431bc7bb9.jpg";
const BANNER_ASPECT = 1024 / 438;
const CROP_TOP = 512;

const FALLBACK_SOURCE = path.resolve("scripts/_home-banner-source.png");

function extractBannerCrop(src) {
  return sharp(src).metadata().then((meta) => {
    const cropW = meta.width;
    const cropH = Math.round(cropW / BANNER_ASPECT);
    const top = Math.min(CROP_TOP, Math.max(0, meta.height - cropH));
    const height = Math.min(cropH, meta.height - top);
    return { extract: { left: 0, top, width: cropW, height }, width: cropW, height };
  });
}

async function exportBanner(src, label) {
  const { extract, width, height } = await extractBannerCrop(src);
  console.log(`Source (${label}):`, src);
  console.log("Crop:", extract, "→", width, "x", height);

  fs.mkdirSync(outDir, { recursive: true });

  const cropped = sharp(src).extract(extract);

  await cropped
    .clone()
    .webp({ quality: 98, effort: 6, smartSubsample: false })
    .toFile(path.join(outDir, `${base}-banner_wide.webp`));

  await cropped
    .clone()
    .resize(2560, Math.round(2560 / BANNER_ASPECT), { kernel: sharp.kernel.lanczos3 })
    .webp({ quality: 98, effort: 6, smartSubsample: false })
    .toFile(path.join(outDir, `${base}-banner_wide-2560.webp`));

  console.log("Exported native banner at", width, "px wide.");
}

const src = fs.existsSync(HI_RES_SOURCE) ? HI_RES_SOURCE : FALLBACK_SOURCE;
if (!fs.existsSync(src)) {
  console.error("No banner source found.");
  process.exit(1);
}

if (src === FALLBACK_SOURCE) {
  console.warn("WARNING: Using compressed chat upload fallback. Banner will look soft on large screens.");
}

await exportBanner(src, fs.existsSync(HI_RES_SOURCE) ? "4032px original" : "1024px fallback");
