import Link from "next/link";
import { SITE } from "@/lib/config";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3 shrink-0">
      <span className="flex h-10 w-10 items-center justify-center border border-neutral-700 bg-neutral-900 text-sm font-semibold tracking-tight text-white transition-colors group-hover:border-neutral-500">
        MPF
      </span>
      {!compact && (
        <span className="hidden sm:block">
          <span className="block font-semibold text-white tracking-tight leading-tight">{SITE.name}</span>
          <span className="block text-[10px] uppercase tracking-[0.18em] text-neutral-500">{SITE.logoSubtitle}</span>
        </span>
      )}
    </Link>
  );
}
