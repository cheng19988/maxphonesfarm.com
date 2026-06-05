import { getPublishedProducts } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { ProductCard, FAQAccordion } from "@/components/commerce";
import { ContactCTA } from "@/components/shared";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { IMAGES } from "@/lib/images";
import { HERO_PILLARS, SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Rackmount Phone Farm Hardware",
  description:
    "Max Phones Farm builds rackmount phone farm boxes, motherboard arrays, and custom cabinets in Guangzhou. Real-device hardware for QA, automation, and large-scale mobile deployment since 2017.",
  path: "/",
});

export default async function HomePage() {
  const products = await getPublishedProducts();

  const featured = products.find((p) => p.slug === "custom-cabinet") ?? products[0];
  const gridProducts = products.filter((p) => p.slug !== featured?.slug).slice(0, 6);
  const previewFaq = FAQ_ITEMS.slice(0, 6);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />

      <section className="border-b border-neutral-800">
        <div className="container-wide py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div>
              <p className="section-label">{SITE.location} · Since {SITE.since}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white max-w-xl tracking-tight leading-[1.08] mb-6">
                Rackmount Phone Farm Hardware for Real Devices
              </h1>
              <p className="text-neutral-400 text-lg max-w-lg mb-8 leading-relaxed">
                {SITE.intro} Factory-built chassis, centralized power, and active cooling — shipped worldwide from Guangzhou.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/products" className="btn-primary">Browse Products</Link>
                <Link href="/contact" className="btn-secondary">Request Quote</Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] border border-neutral-800 bg-neutral-950">
              <Image
                src={IMAGES.homeHero}
                alt="Max Phones Farm rackmount phone farm box"
                fill
                className="object-cover"
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
            {HERO_PILLARS.map((pillar) => (
              <Link key={pillar.href} href={pillar.href} className="bg-neutral-950 p-8 md:p-10 hover:bg-neutral-900 transition-colors group">
                <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">Product line</p>
                <h2 className="text-xl md:text-2xl font-medium text-white mb-2 group-hover:underline underline-offset-4">{pillar.label}</h2>
                <p className="text-sm text-neutral-500">{pillar.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured && (
        <section className="section border-b border-neutral-800">
          <div className="container-wide">
            <p className="section-label">Featured Model</p>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="relative aspect-[4/3] border border-neutral-800 bg-neutral-950">
                <Image src={featured.imageDetail} alt={featured.name} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-tight">{featured.name}</h2>
                <p className="text-neutral-400 leading-relaxed mb-4">
                  2U rackmount chassis for 20 real devices. Built for teams running mobile QA, automation, or multi-device workflows who need clean rack integration instead of scattered phones on chargers.
                </p>
                <p className="text-neutral-500 leading-relaxed mb-8 text-sm">
                  Optional screenless and battery-free node layouts reduce heat and cable clutter. Integrated fans, centralized PSU, and ADB-compatible management. Exact node configuration depends on your device model — contact us before ordering.
                </p>
                <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-neutral-800">
                  <span className="text-3xl font-semibold text-white">${featured.priceUsd.toLocaleString()}</span>
                  <span className="text-sm text-neutral-500">{featured.stock > 0 ? "In stock · ships in 3–5 days" : "Made to order — ask for lead time"}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/products/${featured.slug}`} className="btn-secondary">View Specifications</Link>
                  <Link href={`/contact?product=${featured.slug}`} className="btn-primary">Request Quote</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section border-b border-neutral-800">
        <div className="container-wide">
          <h2 className="section-title">Product Catalog</h2>
          <p className="section-subtitle">Phone farm boxes, motherboard arrays, rackmount cabinets, and infrastructure accessories — USD list pricing. Bulk and custom projects quoted separately.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridProducts.map((p) => (
              <ProductCard key={p.id} slug={p.slug} name={p.name} shortDesc={p.shortDesc} priceUsd={p.priceUsd} stock={p.stock} imageCard={p.imageCard} category={p.category} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/products" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      <section className="section border-b border-neutral-800 bg-neutral-950">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title">Built for 24/7 Real-Device Operations</h2>
          <p className="text-neutral-400 leading-relaxed mb-6">
            Each Max Phones Farm box holds up to 20 physical phones or motherboards in a single cooled chassis. Centralized power replaces individual chargers; active airflow keeps nodes stable under continuous load.
          </p>
          <p className="text-neutral-500 leading-relaxed text-sm">
            We assemble and test hardware at our Guangzhou facility before export. Typical deployments serve app QA labs, mobile ad verification teams, and operators who need repeatable device environments — not emulators or cloud instances.
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-800">
        <div className="container-wide py-20 grid md:grid-cols-3 gap-12">
          <div>
            <div className="text-5xl md:text-6xl font-semibold text-white tracking-tight mb-2">20</div>
            <h3 className="text-lg text-neutral-300 mb-2">Nodes per standard 2U box</h3>
            <p className="text-neutral-500 text-sm">Modular expansion available for larger rack deployments.</p>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-semibold text-white tracking-tight mb-2">2017</div>
            <h3 className="text-lg text-neutral-300 mb-2">Manufacturing in Guangzhou</h3>
            <p className="text-neutral-500 text-sm">Factory assembly, QC burn-in, and export packaging on-site.</p>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-semibold text-white tracking-tight mb-2">24h</div>
            <h3 className="text-lg text-neutral-300 mb-2">Sales response on business days</h3>
            <p className="text-neutral-500 text-sm">WhatsApp, Telegram, phone, or email — we reply with specs and lead times.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-800 bg-neutral-950">
        <div className="container-wide py-20 grid md:grid-cols-2 gap-12">
          <div>
            <p className="section-label">Rack Integration</p>
            <h2 className="text-2xl font-semibold text-white mb-4">From Desk Clutter to 2U Rack</h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              A typical starting point is phones on individual chargers with tangled USB cables. A rackmount box consolidates power, cooling, and connectivity into one unit that fits standard 19&quot; server racks — easier to maintain and easier to scale.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="border border-neutral-800 p-6">
              <p className="text-xs uppercase tracking-widest text-neutral-600 mb-2">Before</p>
              <p className="text-sm text-neutral-500">Loose devices, separate chargers, uneven cooling</p>
            </div>
            <div className="border border-white p-6">
              <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">After</p>
              <p className="text-sm text-neutral-300">2U chassis, shared PSU, managed USB backplane</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-b border-neutral-800">
        <div className="container-wide grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label">Remote Control</p>
            <h2 className="section-title">Manage the Fleet from One Workstation</h2>
            <p className="text-neutral-400 leading-relaxed mb-4">
              Our Guangzhou team configures screen mirroring, ADB access, batch APK installs, and group control for rack and box deployments. You operate dozens of devices without switching cables between phones.
            </p>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Remote control setup is available as a standalone service or bundled with hardware orders. See the Services page for scope and pricing.
            </p>
            <Link href="/services" className="btn-secondary">View Services →</Link>
          </div>
          <div className="relative aspect-video border border-neutral-800">
            <Image src={IMAGES.remoteControl.hero} alt="Remote control workstation for phone farm devices" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section border-b border-neutral-800">
        <div className="container-wide">
          <h2 className="section-title">What We Supply</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800">
            {[
              { title: "Chassis & Racks", desc: "20-node boxes, motherboard arrays, custom 2U cabinets" },
              { title: "Power & Cooling", desc: "Centralized PSU, fan modules, thermal layouts for 24/7 load" },
              { title: "Connectivity", desc: "USB backplanes, switches, and routing for multi-device farms" },
              { title: "Deployment Support", desc: "Remote control setup, bulk provisioning, export logistics" },
            ].map((item) => (
              <div key={item.title} className="bg-neutral-950 p-6">
                <h3 className="font-medium text-white mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-neutral-800">
        <div className="container-wide">
          <h2 className="section-title">Guangzhou Factory</h2>
          <p className="section-subtitle">Office, assembly workshop, and warehouse on-site. Photos from our Guangzhou facility — not stock renders.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { src: IMAGES.office, label: "Office" },
              { src: IMAGES.frontDesk, label: "Front Desk" },
              { src: IMAGES.meeting, label: "Meeting Room" },
              { src: IMAGES.workshop, label: "Assembly Workshop" },
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

      <section className="section border-b border-neutral-800">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title">Common Questions</h2>
          <p className="text-neutral-500 text-sm mb-8">Support available Monday–Friday · Typical response within one business day</p>
          <FAQAccordion items={previewFaq} />
          <div className="mt-8">
            <Link href="/faq" className="btn-outline">Full FAQ</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <ContactCTA title="Bulk Orders & Custom Cabinet Projects" />
        </div>
      </section>
    </>
  );
}
