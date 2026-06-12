import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { whatsappQuoteUrl } from "@/lib/whatsapp";
import { REFERENCE_PRICE_NOTE } from "@/lib/format-price";

export const metadata = buildMetadata({
  title: "Phone Farm Packages — Starter, Rackmount & Multi-Rack Bundles",
  description:
    "Pre-configured phone farm hardware packages — 20-slot box starter, 2U rackmount enterprise, and multi-rack wholesale bundles. Factory-direct Guangzhou export, MOQ 1, quote-first B2B.",
  path: "/packages",
});

const PACKAGES = [
  {
    name: "Starter Lab Package",
    price: "From $2,499",
    slug: "phone-farm-box",
    image: IMAGES.phoneFarmBox.card,
    includes: [
      "Enterprise Phone Farm Box (20 slots)",
      "Centralized power module",
      "Basic cooling kit",
      "Export packing from Guangzhou",
    ],
    ideal: "Small QA teams starting a dedicated real-device lab.",
  },
  {
    name: "Rackmount Enterprise Package",
    price: "From $4,899",
    slug: "custom-cabinet",
    image: IMAGES.customCabinet.card,
    includes: [
      "2U Rackmount Phone Farm chassis",
      "Rack ears and cable management",
      "Active cooling & PSU sizing",
      "Burn-in QC before export",
    ],
    ideal: "Teams integrating into existing 19\" rack infrastructure.",
    featured: true,
  },
  {
    name: "Multi-Rack Scale Package",
    price: "Custom Quote",
    slug: "real-device-phone-farm",
    image: IMAGES.realDevice.card,
    includes: [
      "Multiple chassis or cabinet builds",
      "Network & USB backplane planning",
      "Remote control setup option",
      "Multi-shipment export logistics",
    ],
    ideal: "Enterprise labs scaling to 40+ devices across racks.",
  },
];

export default function PackagesPage() {
  return (
    <>
      <PageHero
        variant="simple"
        label="Deployment Bundles"
        title="Phone Farm Hardware Packages"
        subtitle="Bundle phone farm box, rackmount, or multi-rack chassis with power, cooling, and export logistics — USD list pricing as the starting point, custom device fit quoted per lab plan."
      >
        <Link href="/contact" className="btn-primary">Discuss Your Lab</Link>
      </PageHero>

      <section className="section-tight section-muted border-b border-neutral-200">
        <div className="container-wide max-w-4xl">
          <p className="text-neutral-600 leading-relaxed text-center">
            Max Phones Farm packages combine factory-direct{" "}
            <strong className="font-medium text-neutral-800">phone farm box</strong>,{" "}
            <strong className="font-medium text-neutral-800">2U rackmount phone farm</strong>, and{" "}
            <strong className="font-medium text-neutral-800">mobile device farm</strong> hardware with
            centralized power, active cooling, and optional remote setup. MOQ is one unit on standard bundles;
            wholesale and multi-rack scale packages are quoted with palletized export from Guangzhou.
          </p>
        </div>
      </section>

      <section className="section section-white border-b border-neutral-200">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.name}
                className={`card flex flex-col rounded-xl ${pkg.featured ? "ring-2 ring-blue-600 shadow-lg" : ""}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-50">
                  <Image src={pkg.image} alt={pkg.name} fill className="object-cover" sizes="33vw" />
                  {pkg.featured && (
                    <span className="absolute top-4 left-4 bg-white text-black text-[10px] uppercase tracking-widest px-3 py-1 font-medium">
                      Most Popular
                    </span>
                  )}
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-2">{pkg.name}</h2>
                  <p className="text-2xl font-semibold text-blue-700">{pkg.price}</p>
                  <p className="text-xs text-neutral-500 mt-1 mb-4">{REFERENCE_PRICE_NOTE}</p>
                  <p className="text-sm text-neutral-600 mb-6">{pkg.ideal}</p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {pkg.includes.map((item) => (
                      <li key={item} className="text-sm text-neutral-600 flex gap-2">
                        <span className="text-blue-700 shrink-0">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/contact?product=${pkg.slug}`} className="btn-primary text-center">
                    Request Package Quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight section-muted border-b border-neutral-200">
        <div className="container-wide max-w-3xl text-center">
          <p className="text-neutral-400 mb-6">
            Every package can be customized — device models, slot layout, power budget, and deployment services are quoted to your lab plan.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/pricing" className="btn-outline">View Full Pricing</Link>
            <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              WhatsApp Quote
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <ContactCTA title="Build a Custom Package" />
        </div>
      </section>
    </>
  );
}
