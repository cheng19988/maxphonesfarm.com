import Image from "next/image";
import Link from "next/link";
import { ProductCard, FAQAccordion } from "@/components/commerce";
import { ContactCTA } from "@/components/shared";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { HOME_FAQ } from "@/data/faq";
import { getFlagshipProduct } from "@/data/products";
import { getProductsGrouped } from "@/lib/products";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";
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

  return (
    <>
      <JsonLd data={faqJsonLd(HOME_FAQ)} />

      {/* Hero */}
      <section className="border-b border-neutral-800">
        <div className="container-wide py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="section-label">{SITE.location} · {SITE.headerBar}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white max-w-xl tracking-tight leading-[1.08] mb-6">
                Rackmount Phone Farm Hardware for Real-Device Labs
              </h1>
              <p className="text-neutral-400 text-lg max-w-lg mb-8 leading-relaxed">
                Factory-direct rackmount systems, phone farm boxes, motherboard arrays, and power/cooling/network integration — built for app testing, ad verification, multi-account environment management, remote device control, and QA automation workflows.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">Request Quote</Link>
                <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  WhatsApp Quote
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] border border-neutral-800 bg-neutral-950">
              <Image
                src={IMAGES.homeHero}
                alt="Max Phones Farm rackmount phone farm hardware"
                fill
                className="object-cover"
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured flagship */}
      <section className="section border-b border-neutral-800 bg-neutral-950">
        <div className="container-wide">
          <p className="section-label">Flagship System</p>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="relative aspect-[4/3] border border-neutral-800">
              <Image
                src={flagship.imageDetail}
                alt={flagship.name}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">{flagship.name}</h2>
              <p className="text-neutral-400 leading-relaxed mb-6">{flagship.description}</p>
              <table className="w-full text-sm border border-neutral-800 mb-8">
                <tbody>
                  {Object.entries(specs)
                    .slice(0, 6)
                    .map(([k, v]) => (
                      <tr key={k} className="border-b border-neutral-800 last:border-0">
                        <td className="py-2.5 px-4 text-neutral-500 w-2/5">{k}</td>
                        <td className="py-2.5 px-4 text-white">{v}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-neutral-800">
                <span className="text-3xl font-semibold text-white">${flagship.priceUsd.toLocaleString()}</span>
                <span className="text-sm text-neutral-500">USD list price · quote for bulk/custom</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/products/${flagship.slug}`} className="btn-secondary">Full Specifications</Link>
                <Link href={`/contact?product=${flagship.slug}`} className="btn-primary">Request Quote</Link>
                <a href={whatsappQuoteUrl(flagship.name)} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  WhatsApp Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product models — complete systems & core hardware (accessories on /products) */}
      {grouped.filter((g) => g.id !== "accessories").map((group) => (
        <section key={group.id} className="section border-b border-neutral-800">
          <div className="container-wide">
            <h2 className="section-title">{group.label}</h2>
            <p className="section-subtitle">{group.description}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.products.map((p) => (
                <ProductCard
                  key={p.id}
                  slug={p.slug}
                  name={p.name}
                  shortDesc={p.shortDesc}
                  priceUsd={p.priceUsd}
                  stock={p.stock}
                  imageCard={p.imageCard}
                  category={p.category}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="border-b border-neutral-800 py-12">
        <div className="container-wide text-center">
          <p className="text-neutral-500 text-sm mb-4">Power modules, USB backplanes, cooling, network kits, and setup services</p>
          <Link href="/products" className="btn-outline">View Accessories &amp; Deployment Support</Link>
        </div>
      </section>

      {/* Why Max Phones Farm */}
      <section className="section border-b border-neutral-800 bg-neutral-950">
        <div className="container-wide">
          <h2 className="section-title">Why Max Phones Farm</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
            {[
              { title: "Factory-Direct Hardware", desc: "Assembled and tested by our Guangzhou hardware team — no reseller markup on chassis builds." },
              { title: "Custom Rack & Cabinet Builds", desc: "Node count, slot layout, and rack integration quoted to your device models and lab plan." },
              { title: "Tested Power & Cooling", desc: "Centralized PSU sizing and fan layouts validated for continuous app testing workloads." },
              { title: "WhatsApp Engineering Support", desc: "Speak directly with our team about fit, lead time, and deployment — usually within 24 hours on business days." },
              { title: "Export-Ready Packing", desc: "Commercial invoices, packing lists, and shock-protected export cartons for international labs." },
              { title: "Deployment Services", desc: "Remote control setup, ADB configuration, and multi-rack planning available as add-on services." },
            ].map((item) => (
              <div key={item.title} className="bg-neutral-950 p-6 md:p-8">
                <h3 className="font-medium text-white mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rack integration benefits */}
      <section className="section border-b border-neutral-800 bg-neutral-950">
        <div className="container-wide grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="section-label">Rack Integration</p>
            <h2 className="text-2xl font-semibold text-white mb-4">Why Rackmount Instead of Desk Clutter</h2>
            <p className="text-neutral-500 text-sm leading-relaxed mb-4">
              A 20-node rackmount chassis consolidates power, cooling, and USB routing into one 2U unit. Labs gain cleaner cable management, predictable thermals, and easier scaling compared to phones on individual chargers.
            </p>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Suitable for enterprise device infrastructure, internal QA labs, and teams running automation workflows or remote device management at scale.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-neutral-400 border border-neutral-800 p-6">
            <li>Centralized PSU replaces multiple chargers</li>
            <li>Active cooling for continuous test workloads</li>
            <li>Per-slot USB paths for ADB and device provisioning</li>
            <li>19&quot; rack integration for existing lab space</li>
            <li>Export-ready packing from Guangzhou</li>
          </ul>
        </div>
      </section>

      {/* Application scenarios */}
      <section className="section border-b border-neutral-800">
        <div className="container-wide max-w-4xl">
          <h2 className="section-title">Application Scenarios</h2>
          <p className="section-subtitle">Hardware for legitimate enterprise device lab workloads.</p>
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              "Mobile app testing lab with rack-scale Android fleet",
              "Campaign QA, regional ad preview, and ad display verification",
              "Account environment management with dedicated device slots per team",
              "QA automation and scripted testing workflows with batch APK deployment",
              "Remote device management for staging and release validation",
              "Enterprise device infrastructure for internal automation labs",
            ].map((item) => (
              <li key={item} className="border border-neutral-800 p-4 text-sm text-neutral-400">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Factory */}
      <section className="section border-b border-neutral-800 bg-neutral-950">
        <div className="container-wide">
          <h2 className="section-title">Guangzhou Assembly & Export</h2>
          <p className="section-subtitle">Photos from our Guangzhou facility — office, workshop, and warehouse.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { src: IMAGES.office, label: "Office" },
              { src: IMAGES.frontDesk, label: "Front Desk" },
              { src: IMAGES.meeting, label: "Meeting Room" },
              { src: IMAGES.workshop, label: "Workshop" },
              { src: IMAGES.warehouse, label: "Warehouse" },
            ].map((img) => (
              <div key={img.label} className="relative aspect-[4/3] border border-neutral-800">
                <Image src={img.src} alt={img.label} fill className="object-cover" sizes="20vw" />
                <span className="absolute bottom-2 left-2 text-xs text-white/80">{img.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-b border-neutral-800">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title">Common Questions</h2>
          <p className="text-neutral-500 text-sm mb-8">Monday–Friday (UTC+8) · Typical response within one business day</p>
          <FAQAccordion items={HOME_FAQ} />
          <div className="mt-8">
            <Link href="/faq" className="btn-outline">View All FAQ</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container-wide">
          <ContactCTA
            title="Get a Custom Quote"
            subtitle="WhatsApp us with your target device count, Android/iOS models, and deployment country. We reply with specifications, lead time, and USD pricing."
          />
        </div>
      </section>
    </>
  );
}
