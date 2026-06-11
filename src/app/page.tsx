import Image from "next/image";
import Link from "next/link";
import { ProductCardMinimal, FAQAccordion } from "@/components/commerce";
import { ApplicationGrid, BeforeAfter, PageHero, SectionHeader, StatStrip } from "@/components/page-hero";
import { ContactCTA } from "@/components/shared";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { HOME_FAQ } from "@/data/faq";
import { getFlagshipProduct } from "@/data/products";
import { getProductsGrouped } from "@/lib/products";
import { IMAGES } from "@/lib/images";
import { HERO_PILLARS, SITE } from "@/lib/config";
import { formatProductPrice } from "@/lib/format-price";
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
        label={`${SITE.location} · ${SITE.headerBar}`}
        title="Rackmount Phone Farm Hardware for Real-Device Labs"
        subtitle="Factory-direct 20-node chassis, phone farm boxes, and motherboard arrays — built for app testing, ad verification, multi-account environment management, and QA automation at scale."
        image={IMAGES.homeHeroProduct}
        imageRetina={IMAGES.homeHeroProductRetina}
        imageAlt="Max Phones Farm rackmount phone farm hardware showroom"
        variant="product-banner"
      >
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/contact" className="btn-primary">Request Quote</Link>
          <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            WhatsApp Quote
          </a>
          <Link href="/products" className="btn-outline">View Catalog</Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {HERO_PILLARS.map((pillar) => (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="inline-flex flex-col gap-0.5 px-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl text-neutral-700 hover:border-blue-300 hover:text-blue-700 shadow-sm transition-colors max-w-xs"
            >
              <span className="font-medium leading-snug">{pillar.label}</span>
              <span className="text-xs text-neutral-500 leading-snug">{pillar.desc}</span>
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="border-b border-blue-100 bg-blue-50">
        <div className="container-wide py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-blue-900">
            <span className="inline-block mr-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-blue-700 text-white rounded">
              In Stock
            </span>
            Rackmount +20 and Enterprise Phone Farm Box available for export — factory-direct from Guangzhou.
          </p>
          <Link href="/products" className="text-sm font-medium text-blue-700 hover:underline shrink-0">
            View all models →
          </Link>
        </div>
      </section>

      <StatStrip
        items={[
          { value: "20", label: "Phones per chassis", detail: "Phones installed, organized, and working together — ready for app testing, automation, and mobile compute workloads." },
          { value: "2–10%", label: "Power efficiency", detail: "Screenless, battery-free node layouts can improve power efficiency and thermal stability vs phones running with displays and batteries under continuous load." },
          { value: "2U", label: "Rack integration", detail: "Server-style mounting for standard 19\" racks — mobile compute without desk clutter." },
          { value: "24h", label: "Sales response", detail: "WhatsApp, Telegram, and email — typically within one business day (UTC+8)." },
        ]}
      />

      {/* Flagship */}
      <section className="section section-white border-b border-neutral-200">
        <div className="container-wide">
          <SectionHeader
            label="Flagship System"
            title={flagship.name}
            subtitle="Server-style smartphone chassis for teams that need serious mobile compute density without desk clutter."
          />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="product-shot-hero product-shot-hero-detail">
              <Image
                src={flagship.imageDetail}
                alt={flagship.name}
                fill
                className="product-shot-hero-img"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-lead mb-8">{flagship.description}</p>
              <table className="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden mb-8">
                <tbody>
                  {Object.entries(specs)
                    .slice(0, 5)
                    .map(([k, v]) => (
                      <tr key={k} className="border-b border-neutral-100 last:border-0">
                        <td className="py-3 px-4 text-neutral-500 bg-neutral-50 w-2/5">{k}</td>
                        <td className="py-3 px-4 text-neutral-900">{v}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <span className="text-4xl font-semibold text-blue-700">{formatProductPrice(flagship.priceUsd)}</span>
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
      <section className="section section-muted border-b border-neutral-200">
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

      {/* What is a phone farm box — reference module 6 */}
      <section className="section section-white border-b border-neutral-200">
        <div className="container-wide max-w-4xl mx-auto text-center">
          <p className="section-label">Hardware Explained</p>
          <h2 className="section-title mb-6">What Is a Phone Farm Box?</h2>
          <p className="text-lead mb-6">
            A phone farm box is a 20-slot smartphone container — phones installed, organized, and working together in one regulated chassis. Each device shares centralized power, active cooling, and a USB path to your control PC so operators manage the fleet from one workstation instead of scattered chargers and cables.
          </p>
          <p className="text-neutral-600 leading-relaxed mb-8">
            Battery-free and screenless node layouts are available on compatible builds: removing displays and accessory load where applicable improves power efficiency (often 2–10% better thermal and energy profile vs full phones under continuous load), extends hardware life, and keeps nodes stable for app testing, automation, hash-rate and mobile compute workloads, and remote Android control. Deploy as a desk box or integrate as a 2U rackmount module — the architecture is the same mobile compute density, scaled to your lab.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/products/phone-farm-box" className="btn-primary">Enterprise Phone Farm Box</Link>
            <Link href="/products/custom-cabinet" className="btn-outline">Rackmount +20</Link>
            <Link href="/blog/what-is-a-phone-farm-box" className="btn-outline">Read the Guide</Link>
          </div>
        </div>
      </section>

      {/* Value proposition */}
      <section className="section section-white border-b border-neutral-200">
        <div className="container-wide grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label">Rack Integration</p>
            <h2 className="section-title">A New Way to Host Mobile Compute at Scale</h2>
            <p className="text-lead mb-6">
              Many smartphones boast impressive computing power for their cost. Max Phones Farm makes it possible to scale phone CPU and bring value to new or used devices in a regulated chassis — custom motherboard routing, centralized power, and active cooling for battery-free, screenless operation built for continuous mobile compute workloads.
            </p>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              A phone farm box is a 20-slot smartphone container: devices share one power input, one USB path to your control PC, and an integrated fan array. Whether deployed as a desk box or 2U rackmount module, the goal is the same — run many phones from one place instead of scattered chargers and cables.
            </p>
            <ul className="space-y-4 text-neutral-600">
              {[
                "Centralized PSU replaces multiple chargers",
                "Active cooling for continuous test workloads",
                "Per-slot USB paths for ADB and device provisioning",
                "19\" rack integration for existing lab space",
                "Export-ready packing from Guangzhou",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-blue-700 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/packages" className="btn-primary">View Solution Packages</Link>
            </div>
          </div>
          <div className="product-shot-hero">
            <Image src={IMAGES.scenes.rackLab} alt="Rackmount phone farm lab deployment" fill className="product-shot-hero-img" sizes="50vw" />
          </div>
        </div>
      </section>

      <BeforeAfter
        title="From Desk Clutter to Rackmount Lab"
        subtitle="Consolidate power, cooling, and USB routing into one chassis — cleaner operations and easier scaling for QA and automation teams."
        before={{ src: IMAGES.scenes.before, alt: "Phones on individual chargers before rackmount deployment" }}
        after={{ src: IMAGES.scenes.after, alt: "Organized rackmount phone farm chassis after deployment" }}
        beforeLabel="Before"
        afterLabel="After"
        stat={{
          value: "20",
          label: "Phones in one chassis",
          detail: "Replace scattered chargers and cables with centralized power, active cooling, and per-slot USB paths — organized mobile compute ready for near-unlimited lab uses.",
        }}
      />

      <ApplicationGrid
        title="Expansive Uses for Device Labs"
        subtitle="Phone farm applications are near-endless — whether your workflow benefits from multiple devices, unified mobile compute, or Android customization at scale."
        items={[
          {
            title: "Mobile app testing at rack scale",
            desc: "Dedicated Android and iOS device slots for release QA, regression suites, and staged builds across regional configurations.",
          },
          {
            title: "Ad verification & campaign QA",
            desc: "Real-device preview and display verification workflows with isolated lab networks and repeatable device environments.",
          },
          {
            title: "Multi-account environment management",
            desc: "Per-team or per-project device slots for legitimate enterprise account environment separation and audit-friendly lab design.",
          },
          {
            title: "QA automation & remote device control",
            desc: "Batch APK deployment, scripted test runs, and workstation-based device management for automation and staging pipelines.",
          },
        ]}
      />

      <section className="section section-white border-b border-neutral-200">
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="product-shot-hero">
            <Image
              src={IMAGES.serviceControl}
              alt="Remote device control workstation setup"
              fill
              className="product-shot-hero-img"
              sizes="50vw"
            />
          </div>
          <div>
            <p className="section-label">Device Management</p>
            <h2 className="section-title">Remote Control From One Workstation</h2>
            <p className="text-lead mb-6">
              Manage your device fleet from a single control PC — ADB paths, screen mirroring, batch APK deployment, and device grouping for QA automation workflows. Our engineering team configures your lab hardware and handover documentation.
            </p>
            <ul className="space-y-3 text-neutral-600 text-sm mb-8">
              {[
                "ADB and USB path verification per slot",
                "Screen mirroring and batch APK install",
                "Device grouping for QA and staging teams",
                "Remote handover session from Guangzhou (UTC+8)",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-blue-700 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link href="/products/remote-control-setup" className="btn-primary">Remote Control Setup</Link>
              <Link href="/services" className="btn-outline">All Lab Services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section section-muted border-b border-neutral-200">
        <div className="container-wide">
          <SectionHeader
            label="Factory Trust"
            title="Guangzhou Assembly & Export"
            subtitle="Real photos from our office, workshop, and warehouse — not stock imagery."
          />
          <div className="gallery-grid">
            {[
              { src: IMAGES.scenes.factoryA, label: "Production & Assembly", desc: "Chassis build, wiring, and QC from our Guangzhou team" },
              { src: IMAGES.workshop, label: "Assembly Workshop", desc: "Burn-in testing before international shipment" },
              { src: IMAGES.scenes.factoryB, label: "Hardware Line", desc: "Real-device lab hardware — not stock imagery" },
              { src: IMAGES.warehouse, label: "Warehouse & Export", desc: "Export packing and logistics" },
              { src: IMAGES.office, label: "Sales & Engineering", desc: "Quote support and deployment planning" },
              { src: IMAGES.meeting, label: "Project Planning", desc: "Custom rack and multi-lab deployment scoping" },
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
      <section className="section section-white border-b border-neutral-200">
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
