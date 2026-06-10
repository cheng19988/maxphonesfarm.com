/**
 * Homepage banner — user's exact photo only.
 * Hi-res source: scripts/_home-banner-hires.png (1916×821 native)
 * Fallback: scripts/_home-banner-source.png (1024px chat upload)
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const P = "maxphonesfarm.com";
const slug = "home-hero-showroom-lab";
const base = `${P}-${slug}`;
const outDir = path.resolve("public/images/banner_wide");

const HIRES = path.resolve("scripts/_home-banner-hires.png");
const FALLBACK = path.resolve("scripts/_home-banner-source.png");

function resolveSource() {
  if (fs.existsSync(HIRES)) return { path: HIRES, hires: true };
  if (fs.existsSync(FALLBACK)) return { path: FALLBACK, hires: false };
  throw new Error("Missing scripts/_home-banner-hires.png");
}

const { path: src, hires } = resolveSource();
const meta = await sharp(src).metadata();
console.log("Source:", src, `${meta.width}x${meta.height}`, hires ? "(native hi-res)" : "(compressed fallback)");

fs.mkdirSync(outDir, { recursive: true });

// Export at native resolution — no upscaling from hi-res source
await sharp(src)
  .webp({ quality: 98, effort: 6, smartSubsample: false })
  .toFile(path.join(outDir, `${base}-banner_wide.webp`));

// Retina variant: gentle 2560px wide upscale only when source is smaller than 2560
if (meta.width < 2560 && hires) {
  const scale = 2560 / meta.width;
  await sharp(src)
    .resize(2560, Math.round(meta.height * scale), { kernel: sharp.kernel.lanczos3 })
    .webp({ quality: 98, effort: 6, smartSubsample: false })
    .toFile(path.join(outDir, `${base}-banner_wide-2560.webp`));
  console.log("Retina variant: 2560px wide");
}

console.log("Exported native banner:", meta.width, "x", meta.height);
