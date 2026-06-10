/**
 * Upscale the user-provided homepage banner with progressive Lanczos + sharpen.
 * Source: Cursor asset upload (1024×438). Output: 3840px wide WebP for full-bleed hero.
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const P = "maxphonesfarm.com";
const slug = "home-hero-showroom-lab";
const base = `${P}-${slug}`;
const outDir = path.resolve("public/images/banner_wide");

const SOURCE_CANDIDATES = [
  path.resolve(
    "assets/c__Users_cdl30_AppData_Roaming_Cursor_User_workspaceStorage_8267e8a7a450a84a06d2034ed4579444_images_546b692f-eb6f-4fc4-9f98-b26c37d7ddb6-6007a06b-f2f7-4a72-add0-0b5fc383e723.png",
  ),
  path.resolve("scripts/_home-banner-source.png"),
];

function resolveSource() {
  for (const p of SOURCE_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error("Home banner source not found. Place the original PNG at scripts/_home-banner-source.png");
}

async function progressiveUpscale(src, targetWidth) {
  const meta = await sharp(src).metadata();
  const aspect = meta.width / meta.height;
  const steps = [];
  let w = meta.width;
  while (w * 2 <= targetWidth) {
    w *= 2;
    steps.push(w);
  }
  if (steps[steps.length - 1] !== targetWidth) steps.push(targetWidth);

  let buf = await sharp(src).png().toBuffer();
  for (const stepW of steps) {
    const stepH = Math.round(stepW / aspect);
    buf = await sharp(buf)
      .resize(stepW, stepH, { kernel: sharp.kernel.lanczos3, fit: "fill" })
      .sharpen({ sigma: 1.15, m1: 1.0, m2: 0.45, x1: 2, y2: 10, y3: 20 })
      .toBuffer();
    console.log("  step:", stepW, "x", stepH);
  }
  return buf;
}

const src = resolveSource();
console.log("Source:", src);
fs.mkdirSync(outDir, { recursive: true });

const upscaled = await progressiveUpscale(src, 3840);
const meta = await sharp(upscaled).metadata();

await sharp(upscaled)
  .webp({ quality: 96, effort: 6, smartSubsample: false })
  .toFile(path.join(outDir, `${base}-banner_wide.webp`));

await sharp(upscaled)
  .resize(2560, Math.round(2560 / (meta.width / meta.height)), { kernel: sharp.kernel.lanczos3 })
  .webp({ quality: 96, effort: 6, smartSubsample: false })
  .toFile(path.join(outDir, `${base}-banner_wide-2560.webp`));

console.log("Banner restored:", meta.width, "x", meta.height);
