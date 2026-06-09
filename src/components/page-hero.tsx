import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type PageHeroProps = {
  label?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  fullBleed?: boolean;
};

export function PageHero({
  label,
  title,
  subtitle,
  image,
  imageAlt = "",
  children,
  fullBleed = false,
}: PageHeroProps) {
  if (fullBleed && image) {
    return (
      <section className="relative border-b border-neutral-800 overflow-hidden min-h-[72vh] md:min-h-[80vh] flex items-end">
        <Image src={image} alt={imageAlt} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/20" />
        <div className="relative container-wide w-full py-16 md:py-24">
          {label && <p className="section-label">{label}</p>}
          <h1 className="text-display max-w-4xl mb-6">{title}</h1>
          {subtitle && <p className="text-lead max-w-2xl mb-8">{subtitle}</p>}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-neutral-800 bg-neutral-950">
      <div className="container-wide section-tight">
        <div className={`grid gap-12 items-center ${image ? "lg:grid-cols-2 lg:gap-16" : ""}`}>
          <div>
            {label && <p className="section-label">{label}</p>}
            <h1 className="section-title">{title}</h1>
            {subtitle && <p className="section-subtitle mb-0">{subtitle}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {image && (
            <div className="relative aspect-[16/10] border border-neutral-800 bg-neutral-900 overflow-hidden">
              <Image src={image} alt={imageAlt} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function StatStrip({ items }: { items: { value: string; label: string; detail?: string }[] }) {
  return (
    <section className="border-b border-neutral-800 bg-neutral-900/40">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {items.map((item) => (
            <div key={item.label}>
              <p className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-2">{item.value}</p>
              <p className="text-sm font-medium text-white mb-1">{item.label}</p>
              {item.detail && <p className="text-xs text-neutral-500 leading-relaxed">{item.detail}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  subtitle,
  action,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  action?: { href: string; text: string };
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
      <div className="max-w-3xl">
        {label && <p className="section-label">{label}</p>}
        <h2 className="section-title mb-0">{title}</h2>
        {subtitle && <p className="section-subtitle mb-0 mt-4">{subtitle}</p>}
      </div>
      {action && (
        <Link href={action.href} className="btn-outline shrink-0">
          {action.text}
        </Link>
      )}
    </div>
  );
}
