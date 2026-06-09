import Image from "next/image";
import Link from "next/link";
import { ProductCardMinimal, FAQAccordion } from "@/components/commerce";
import { PageHero, SectionHeader, StatStrip } from "@/components/page-hero";
import { ContactCTA } from "@/components/shared";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { HOME_FAQ } from "@/data/faq";
import { getFlagshipProduct } from "@/data/products";
import { getProductsGrouped } from "@/lib/products";
import { IMAGES } from "@/lib/images";
import { HERO_PILLARS, SITE } from "@/lib/config";
import { whatsappQuoteUrl } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Rackmount Phone Farm Hardware Supplier",
  description:
    "Guangzhou factory-direct rackmount phone farm hardware, 20-device lab systems, motherboard boxes, and deployment support for app testing and remote device management.",
  path: "/",
});

function parseSpecs(specsJson: string): Record<string, string> {
  try {
    return JSON.parse(specsJson);
  } catch {
    return {};
  }
}

export default async function HomePage() {
  const flagship = getFlagshipProduct();
  const grouped = await getProductsGrouped();
  const flagshipLive = grouped.flatMap((g) => g.products).find((p) => p.slug === flagship.slug) ?? null;
  const specs = flagshipLive ? parseSpecs(flagshipLive.specs) : flagship.specs;
  const catalogProducts = grouped
    .filter((g) => g.id !== "accessories")
    .flatMap((g) => g.products)
    .slice(0, 8);

  return (
    <>
      <JsonLd data={faqJsonLd(HOME_FAQ)} />

      <PageHero
        fullBleed
        label={`${SITE.location} · ${SITE.headerBar}`}
        title="Rackmount Phone Farm Hardware for Real-Device Labs"
        subtitle="Factory-direct 20-node chassis, phone farm boxes, and motherboard arrays — built for app testing, ad verification, multi-account environment management, and QA automation at scale."
        image={IMAGES.homeHero}
        imageAlt="Max Phones Farm rackmount phone farm hardware"
      >
        <div className="flex flex-wrap gap-3 mb-10">
          <Link href="/contact" className="btn-primary">Request Quote</Link>
          <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            WhatsApp Quote
          </a>
          <Link href="/products" className="btn-outline">View Catalog</Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {HERO_PILLARS.map((pillar) => (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="surface-elevated px-4 py-3 text-sm hover:border-neutral-600 transition-colors max-w-xs"
            >
              <span className="block text-white font-medium mb-1">{pillar.label}</span>
              <span className="block text-xs text-neutral-500">{pillar.desc}</span>
            </Link>
          ))}
        </div>
      </PageHero>

      <StatStrip
        items={[
          { value: "20", label: "Devices per chassis", detail: "Rack-scale real Android & iOS device slots in a single 2U unit." },
          { value: "2U", label: "Rack integration", detail: "Server-style mounting for enterprise labs and automation infrastructure." },
          { value: "24h", label: "Sales response", detail: "WhatsApp, Telegram, and email — typically within one business day." },
          { value: "GZ", label: "Factory-direct", detail: "Assembly, QC, and export packing from our Guangzhou workshop." },
        ]}
      />

      {/* Flagship */}
      <section className="section border-b border-neutral-800">
        <div className="container-wide">
          <SectionHeader
            label="Flagship System"
            title={flagship.name}
            subtitle="Server-style smartphone chassis for teams that need serious mobile compute density without desk clutter."
          />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] border border-neutral-800 overflow-hidden bg-neutral-900">
              <Image
                src={flagship.imageDetail}
                alt={flagship.name}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-lead mb-8">{flagship.description}</p>
              <table className="w-full text-sm border border-neutral-800 mb-8">
                <tbody>
                  {Object.entries(specs)
                    .slice(0, 5)
                    .map(([k, v]) => (
                      <tr key={k} className="border-b border-neutral-800 last:border-0">
                        <td className="py-3 px-4 text-neutral-500 w-2/5">{k}</td>
                        <td className="py-3 px-4 text-white">{v}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <span className="text-4xl font-semibold text-white">${flagship.priceUsd.toLocaleString()}</span>
                <span className="text-sm text-neutral-500">USD list · bulk &amp; custom quoted separately</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/products/${flagship.slug}`} className="btn-secondary">Full Specifications</Link>
                <Link href={`/contact?product=${flagship.slug}`} className="btn-primary">Request Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product models */}
      <section className="section border-b border-neutral-800 bg-neutral-950">
        <div className="container-wide">
          <SectionHeader
            label="Hardware Catalog"
            title="Phone Farm Models"
            subtitle="Complete rackmount systems and core lab hardware — factory-direct from Guangzhou."
            action={{ href: "/products", text: "View All Products" }}
          />
          <div className="product-grid">
            {catalogProducts.map((p) => (
              <ProductCardMinimal
                key={p.id}
                slug={p.slug}
                name={p.name}
                priceUsd={p.priceUsd}
                imageCard={p.imageCard}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Value proposition */}
      <section className="section border-b border-neutral-800">
        <div className="container-wide grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label">Rack Integration</p>
            <h2 className="section-title">Why Rackmount Instead of Desk Clutter</h2>
            <p className="text-lead mb-6">
              A 20-node rackmount chassis consolidates power, cooling, and USB routing into one 2U unit. Labs gain cleaner cable management, predictable thermals, and easier scaling compared to phones on individual chargers.
            </p>
            <ul className="space-y-4 text-neutral-400">
              {[
                "Centralized PSU replaces multiple chargers",
                "Active cooling for continuous test workloads",
                "Per-slot USB paths for ADB and device provisioning",
                "19\" rack integration for existing lab space",
                "Export-ready packing from Guangzhou",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-white shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] border border-neutral-800 overflow-hidden">
            <Image src={IMAGES.customCabinet.hero} alt="Rackmount phone farm chassis" fill className="object-cover" sizes="50vw" />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section border-b border-neutral-800 bg-neutral-950">
        <div className="container-wide">
          <SectionHeader
            label="Factory Trust"
            title="Guangzhou Assembly & Export"
            subtitle="Real photos from our office, workshop, and warehouse — not stock imagery."
          />
          <div className="gallery-grid">
            {[
              { src: IMAGES.workshop, label: "Assembly Workshop", desc: "Chassis build, wiring, and burn-in testing" },
              { src: IMAGES.warehouse, label: "Warehouse & Export", desc: "Export packing and international shipment prep" },
              { src: IMAGES.office, label: "Sales & Engineering", desc: "Quote support and deployment planning" },
            ].map((img) => (
              <div key={img.label} className="gallery-item">
                <Image src={img.src} alt={img.label} fill className="object-cover" sizes="33vw" />
                <div className="gallery-item-label">
                  <p className="text-white font-medium">{img.label}</p>
                  <p className="text-xs text-neutral-400 mt-1">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/about" className="btn-outline">About Our Facility</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-b border-neutral-800">
        <div className="container-wide max-w-4xl">
          <SectionHeader
            label="Support"
            title="Common Questions"
            subtitle="Monday–Friday (UTC+8) · Typical response within one business day"
          />
          <FAQAccordion items={HOME_FAQ} />
          <div className="mt-8 text-center">
            <Link href="/faq" className="btn-outline">View All FAQ</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <ContactCTA
            title="Get a Custom Quote"
            subtitle="Share your target device count, Android/iOS models, and destination country. We reply with specifications, lead time, and USD pricing."
          />
        </div>
      </section>
    </>
  );
}
