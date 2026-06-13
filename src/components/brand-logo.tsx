import Link from "next/link";
import { SITE } from "@/lib/config";

import { BRAND_MARK } from "@/lib/brand-mark";

export function BrandLogo({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3 shrink-0">
      <span
        className={`flex h-10 w-10 items-center justify-center text-[11px] font-bold tracking-tight transition-colors ${
          dark
            ? "border border-neutral-600 bg-neutral-800 text-white group-hover:border-blue-400"
            : "border-2 text-white group-hover:opacity-90"
        }`}
        style={
          dark
            ? undefined
            : {
                backgroundColor: BRAND_MARK.background,
                borderColor: BRAND_MARK.background,
                color: BRAND_MARK.foreground,
              }
        }
      >
        {BRAND_MARK.label}
      </span>
      {!compact && (
        <span className="hidden sm:block">
          <span className={`block font-semibold tracking-tight leading-tight ${dark ? "text-white" : "text-neutral-900"}`}>
            {SITE.name}
          </span>
          <span className={`block text-[10px] uppercase tracking-[0.16em] ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
            {SITE.logoSubtitle}
          </span>
        </span>
      )}
    </Link>
  );
}
