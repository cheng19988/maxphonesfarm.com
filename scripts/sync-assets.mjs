/**
 * Sync images from D:\网站搭建素材库
 * Preferred: FINAL_phonefarm_6sites_package_CN/02_六个网站分类素材/05_maxphonesfarm.com_premium_english_site
 * Fallback:  02_six_website_ready/maxphonesfarm.com_premium_english_site
 */
import fs from "fs";
import path from "path";

const LIB = "D:/网站搭建素材库";
const SITE_CANDIDATES = [
  "FINAL_phonefarm_6sites_package_CN/02_六个网站分类素材/05_maxphonesfarm.com_premium_english_site",
  "02_six_website_ready/maxphonesfarm.com_premium_english_site",
];
const DEST = path.resolve("public/images");

const FACILITY = [
  ["公司照片1/办公区.png", "facility/office.png"],
  ["公司照片1/前台.png", "facility/front-desk.png"],
  ["公司照片1/会议室开会.png", "facility/meeting-room.png"],
  ["公司照片1/生产车间.png", "facility/workshop.png"],
  ["公司照片1/仓库.png", "facility/warehouse.png"],
];

function resolveSitePack() {
  for (const rel of SITE_CANDIDATES) {
    const p = path.join(LIB, rel);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function copyDirWebp(fromDir, toDir) {
  fs.mkdirSync(toDir, { recursive: true });
  let n = 0;
  for (const f of fs.readdirSync(fromDir)) {
    if (!f.endsWith(".webp") || !f.startsWith("maxphonesfarm.com")) continue;
    fs.copyFileSync(path.join(fromDir, f), path.join(toDir, f));
    n++;
  }
  return n;
}

if (!fs.existsSync(LIB)) {
  console.error("Material library not found:", LIB);
  process.exit(1);
}

const sitePack = resolveSitePack();
if (!sitePack) {
  console.error("Site pack not found. Tried:", SITE_CANDIDATES.map((c) => path.join(LIB, c)));
  process.exit(1);
}

console.log("Using site pack:", sitePack);

for (const sub of ["card_800x800", "detail_1200x900", "hero_1600x900"]) {
  const count = copyDirWebp(path.join(sitePack, sub), path.join(DEST, sub));
  console.log(`${sub}: ${count} files`);
}

for (const [rel, destRel] of FACILITY) {
  const from = path.join(LIB, rel);
  if (!fs.existsSync(from)) {
    console.warn("Skip missing:", rel);
    continue;
  }
  const to = path.join(DEST, destRel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  console.log("facility:", destRel);
}

console.log("Asset sync complete.");
