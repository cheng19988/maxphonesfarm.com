import { ImageResponse } from "next/og";
import { BRAND_MARK } from "@/lib/brand-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          background: BRAND_MARK.background,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: BRAND_MARK.foreground,
          borderRadius: BRAND_MARK.borderRadius,
          letterSpacing: "-0.02em",
        }}
      >
        {BRAND_MARK.label}
      </div>
    ),
    { ...size }
  );
}
