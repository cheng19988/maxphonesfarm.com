import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type PageHeroProps = {
  label?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageRetina?: string;
  imageAlt?: string;
  children?: ReactNode;
  /** product = split layout; product-banner = text on top + wide banner below; banner = catalog split */
  variant?: "product" | "product-banner" | "banner" | "simple";
  /** cover = fill frame (homepage hero); contain = show full image */
  imageFit?: "contain" | "cover";
  /** Wider image column + taller frame for homepage */
  imageLarge?: boolean;
};

export function PageHero({
  label,
  title,
  subtitle,
  image,
  imageRetina,
  imageAlt = "",
  children,
  variant = "product",
  imageFit = "contain",
  imageLarge = false,
}: PageHeroProps) {
  if (variant === "product-banner" && image) {
    return (
      <section className="border-b border-neutral-200">
        <div className="hero-banner hero-banner-overlay">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            priority
            quality={100}
            unoptimized
            sizes="100vw"
            {...(imageRetina ? { srcSet: `${imageRetina} 2560w, ${image} 1916w` } : {})}
          />
          <div className="hero-banner-scrim" aria-hidden />
          <div className="hero-banner-content container-wide">
            {label && <p className="section-label">{label}</p>}
            <h1 className="text-display mb-5 md:mb-6 max-w-3xl">{title}</h1>
            {subtitle && <p className="text-lead mb-6 md:mb-8 max-w-2xl">{subtitle}</p>}
            {children}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "product" && image) {
    const isProductPhoto = imageLarge && imageFit === "contain";
    const frameClass = isProductPhoto
      ? "product-shot-hero-product"
      : imageLarge
        ? "product-shot-hero-large"
        : "product-shot-hero";
    const imgClass = imageFit === "cover" ? "product-shot-hero-img-cover" : isProductPhoto ? "product-shot-hero-img-zoom" : "product-shot-hero-img";

    return (
      <section className="border-b border-neutral-200 bg-gradient-to-b from-white via-blue-50/40 to-[var(--background)]">
        <div className="container-wide section-tight">
          <div
            className={
              imageLarge
                ? "grid lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] gap-8 lg:gap-10 xl:gap-12 items-center"
                : "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            }
          >
            <div>
              {label && <p className="section-label">{label}</p>}
              <h1 className="text-display mb-6">{title}</h1>
              {subtitle && <p className="text-lead mb-8">{subtitle}</p>}
              {children}
            </div>
            <div className={frameClass}>
              <Image
                src={image}
                alt={imageAlt}
                fill
                className={imgClass}
                priority
                sizes={imageLarge ? "(max-width:1024px) 100vw, 58vw" : "(max-width:1024px) 100vw, 55vw"}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "banner" && image) {
    return (
      <section className="border-b border-neutral-200 bg-white">
        <div className="container-wide section-tight">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {label && <p className="section-label">{label}</p>}
              <h1 className="section-title">{title}</h1>
              {subtitle && <p className="section-subtitle mb-0">{subtitle}</p>}
              {children && <div className="mt-8">{children}</div>}
            </div>
            <div className="product-shot-hero min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="product-shot-hero-img-cover"
                priority
                unoptimized
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="container-wide section-tight">
        {label && <p className="section-label">{label}</p>}
        <h1 className="section-title">{title}</h1>
        {subtitle && <p className="section-subtitle mb-0">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function StatStrip({ items }: { items: { value: string; label: string; detail?: string }[] }) {
  return (
    <section className="border-b border-neutral-200 bg-blue-50">
      <div className="container-wide py-12 md:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {items.map((item) => (
            <div key={item.label} className="text-center lg:text-left">
              <p className="text-4xl md:text-5xl font-semibold text-blue-700 tracking-tight mb-2">{item.value}</p>
              <p className="text-sm font-semibold text-neutral-900 mb-1">{item.label}</p>
              {item.detail && <p className="text-xs text-neutral-600 leading-relaxed">{item.detail}</p>}
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
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
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

export function BeforeAfter({
  title,
  subtitle,
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  stat,
}: {
  title: string;
  subtitle?: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  beforeLabel?: string;
  afterLabel?: string;
  stat?: { value: string; label: string; detail: string };
}) {
  return (
    <section className="section section-white border-b border-neutral-200">
      <div className="container-wide">
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-10">
          <div>
            <p className="section-label mb-3">{beforeLabel}</p>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
              <Image src={before.src} alt={before.alt} fill className="object-cover" sizes="50vw" />
            </div>
          </div>
          <div>
            <p className="section-label mb-3">{afterLabel}</p>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
              <Image src={after.src} alt={after.alt} fill className="object-cover" sizes="50vw" />
            </div>
          </div>
        </div>
        {stat && (
          <div className="surface-elevated p-8 md:p-10 text-center max-w-2xl mx-auto rounded-2xl">
            <p className="text-5xl font-semibold text-blue-700 tracking-tight mb-2">{stat.value}</p>
            <p className="text-lg font-semibold text-neutral-900 mb-2">{stat.label}</p>
            <p className="text-sm text-neutral-600 leading-relaxed">{stat.detail}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function ApplicationGrid({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <section className="section section-muted border-b border-neutral-200">
      <div className="container-wide">
        <SectionHeader
          label="Applications"
          title="Built for Enterprise Device Lab Workloads"
          subtitle="Hardware for legitimate QA, automation, and remote device management at scale."
        />
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item) => (
            <div key={item.title} className="card card-hover p-8 rounded-xl">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">{item.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
