/**
 * Generates static brand icons in public/ — browsers request /favicon.ico first.
 * Run: npx tsx scripts/generate-brand-icons.tsx
 */
import { writeFileSync } from "node:fs";
import { ImageResponse } from "next/og";

const BRAND = {
  label: "MPF",
  background: "#1d4ed8",
  foreground: "#ffffff",
  borderRadius: 4,
};

function mark(size: number, fontSize: number, radius: number) {
  return (
    <div
      style={{
        fontSize,
        fontWeight: 700,
        background: BRAND.background,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: BRAND.foreground,
        borderRadius: radius,
        letterSpacing: "-0.02em",
      }}
    >
      {BRAND.label}
    </div>
  );
}

async function png(size: number, fontSize: number, radius: number) {
  const res = await new ImageResponse(mark(size, fontSize, radius), {
    width: size,
    height: size,
  });
  return Buffer.from(await res.arrayBuffer());
}

/** Minimal ICO container for a single 32×32 PNG payload. */
function pngToIco(pngBuffer: Buffer) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = 32;
  entry[1] = 32;
  entry[2] = 0;
  entry[3] = 0;
  entry[4] = 1;
  entry[5] = 0;
  entry[6] = 32;
  entry[7] = 0;
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

async function main() {
  const favicon32 = await png(32, 11, 4);
  const apple180 = await png(180, 56, 24);

  writeFileSync("public/favicon.ico", pngToIco(favicon32));
  writeFileSync("public/favicon-32.png", favicon32);
  writeFileSync("public/apple-touch-icon.png", apple180);

  console.log("[generate-brand-icons] wrote public/favicon.ico, favicon-32.png, apple-touch-icon.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
