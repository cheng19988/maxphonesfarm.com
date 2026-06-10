/**
 * Homepage banner export — ALWAYS from the user's exact image file.
 * Never substitute a different photo from the asset library.
 *
 * For a sharp banner, add the original camera file (same photo) as:
 *   scripts/_home-banner-hires.jpg
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const P = "maxphonesfarm.com";
const slug = "home-hero-showroom-lab";
const base = `${P}-${slug}`;
const outDir = path.resolve("public/images/banner_wide");
const BANNER_ASPECT = 1024 / 438;
const TARGET_WIDTH = 3840;

const USER_EXACT = path.resolve("scripts/_home-banner-source.png");
const USER_HIRES_CANDIDATES = [
  path.resolve("scripts/_home-banner-hires.jpg"),
  path.resolve("scripts/_home-banner-hires.png"),
  path.resolve("scripts/_home-banner-hires.jpeg"),
];

function resolveSource() {
  for (const p of USER_HIRES_CANDIDATES) {
    if (fs.existsSync(p)) return { path: p, hires: true };
  }
  if (fs.existsSync(USER_EXACT)) return { path: USER_EXACT, hires: false };
  throw new Error("User banner not found at scripts/_home-banner-source.png");
}

async function progressiveUpscale(src, targetWidth) {
  const meta = await sharp(src).metadata();
  const aspect = meta.width / meta.height;

  if (meta.width >= targetWidth) {
    return sharp(src)
      .resize(targetWidth, Math.round(targetWidth / aspect), { kernel: sharp.kernel.lanczos3, fit: "fill" })
      .png()
      .toBuffer();
  }

  const steps = [];
  let w = meta.width;
  while (w * 2 < targetWidth) {
    w *= 2;
    steps.push(w);
  }
  steps.push(targetWidth);

  let buf = await sharp(src).png().toBuffer();
  for (const stepW of steps) {
    const stepH = Math.round(stepW / aspect);
    buf = await sharp(buf)
      .resize(stepW, stepH, { kernel: sharp.kernel.lanczos3, fit: "fill" })
      .sharpen({ sigma: 0.8, m1: 0.8, m2: 0.3, x1: 2, y2: 8, y3: 16 })
      .png()
      .toBuffer();
    console.log("  upscale step:", stepW, "x", stepH);
  }
  return buf;
}

const { path: src, hires } = resolveSource();
console.log("Using user's exact image:", src, hires ? "(hi-res original)" : "(1024px chat upload)");

fs.mkdirSync(outDir, { recursive: true });

const meta = await sharp(src).metadata();
let buf;

if (hires) {
  const cropH = Math.round(meta.width / BANNER_ASPECT);
  const top = Math.max(0, Math.round((meta.height - cropH) / 2));
  const height = Math.min(cropH, meta.height - top);
  console.log("Hi-res crop:", { left: 0, top, width: meta.width, height });
  buf = await sharp(src).extract({ left: 0, top, width: meta.width, height }).png().toBuffer();
  const cropped = await sharp(buf).metadata();
  if (cropped.width > TARGET_WIDTH) {
    buf = await sharp(buf)
      .resize(TARGET_WIDTH, Math.round(TARGET_WIDTH / BANNER_ASPECT), { kernel: sharp.kernel.lanczos3 })
      .png()
      .toBuffer();
  }
} else {
  buf = await progressiveUpscale(src, TARGET_WIDTH);
}

const outMeta = await sharp(buf).metadata();
await sharp(buf)
  .webp({ quality: 100, effort: 6, smartSubsample: false })
  .toFile(path.join(outDir, `${base}-banner_wide.webp`));

console.log("Exported banner:", outMeta.width, "x", outMeta.height);

if (!hires) {
  console.warn("Chat upload is ~1024px — limited sharpness on large screens.");
  console.warn("Add scripts/_home-banner-hires.jpg (same photo, camera original) for full quality.");
}
