import { prisma } from "@/lib/prisma";
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
  title: "Enterprise-Grade Phone Farm Hardware for Real Device Deployment",
  description:
    "Max Phones Farm — Guangzhou enterprise rackmount phone farm hardware, server-style device farms, custom cabinets, and large-scale real-device deployment since 2017.",
  path: "/",
});

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { published: true },
    orderBy: { priceUsd: "desc" },
  });

  const featured = products.find((p) => p.slug === "custom-cabinet") ?? products[0];
  const gridProducts = products.filter((p) => p.slug !== featured?.slug).slice(0, 6);
  const previewFaq = FAQ_ITEMS.slice(0, 4);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />

      {/* Hero pillars — cellhasher-style triptych */}
      <section className="border-b border-neutral-800">
        <div className="container-wide py-16 md:py-24">
          <p className="section-label">{SITE.location} · Since {SITE.since}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white max-w-4xl tracking-tight leading-[1.05] mb-6">
            Enterprise-Grade Phone Farm Hardware for Real Device Deployment
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mb-12 leading-relaxed">
            {SITE.intro}
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
            {HERO_PILLARS.map((pillar) => (
              <Link key={pillar.href} href={pillar.href} className="bg-neutral-950 p-8 md:p-10 hover:bg-neutral-900 transition-colors group">
                <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">Explore</p>
                <h2 className="text-xl md:text-2xl font-medium text-white mb-2 group-hover:underline underline-offset-4">{pillar.label}</h2>
                <p className="text-sm text-neutral-500">{pillar.desc}</p>
              </Link>
            ))}
          </div>
          <p className="mt-8">
            <Link href="/services" className="text-sm text-neutral-400 hover:text-white underline underline-offset-4">
              Remote control setup available →
            </Link>
          </p>
        </div>
      </section>

      {/* Featured rackmount product */}
      {featured && (
        <section className="section border-b border-neutral-800">
          <div className="container-wide">
            <p className="section-label">New Models — Now Available</p>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="relative aspect-[4/3] border border-neutral-800 bg-neutral-950">
                <Image src={featured.imageDetail} alt={featured.name} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-tight">{featured.name}</h2>
                <p className="text-neutral-400 leading-relaxed mb-4">
                  Featuring a server-style smartphone box designed for teams that need serious mobile compute power without clutter.
                </p>
                <p className="text-neutral-500 leading-relaxed mb-4 text-sm">
                  Units can be configured with screenless, battery-free phone boards engineered for efficiency, longevity, and rackmount integration. By removing displays and accessory components where applicable, the chassis focuses on stable real-device operation with centralized power and cooling.
                </p>
                <p className="text-neutral-500 leading-relaxed mb-8 text-sm">
                  Built to slot into standard server racks with 2U sizing. Integrated cooling fans and remote management support stable operation across every node. Configuration options vary by deployment — contact sales for exact node type and screen/battery layout.
                </p>
                <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-neutral-800">
                  <span className="text-3xl font-semibold text-white">${featured.priceUsd.toLocaleString()}</span>
                  <span className="text-sm text-neutral-500">{featured.stock > 0 ? "In stock" : "Sold out — contact for lead time"}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/products/${featured.slug}`} className="btn-primary">Add to Order</Link>
                  <Link href={`/contact?product=${featured.slug}`} className="btn-secondary">Enterprise Quote</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product models grid */}
      <section className="section border-b border-neutral-800">
        <div className="container-wide">
          <h2 className="section-title">Max Phones Farm Models</h2>
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

      {/* Brand story */}
      <section className="section border-b border-neutral-800 bg-neutral-950">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title">A New Way of Hosting Mobile Compute</h2>
          <p className="text-neutral-400 leading-relaxed mb-6">
            Many smartphones deliver impressive computing power for their cost. Max Phones Farm makes it possible to scale real-device CPU for testing, automation, QA, and legitimate multi-device workflows — on hardware you control.
          </p>
          <p className="text-neutral-500 leading-relaxed text-sm">
            A Max Phones Farm box is a 20-slot smartphone container, regulated by cooling, with custom power components and optional battery-free operation for extended device life, higher stability benchmarks, and optimized multi-device management. Deployments are built in Guangzhou and shipped worldwide for enterprise teams and agencies.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-neutral-800">
        <div className="container-wide py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-7xl md:text-8xl font-semibold text-white tracking-tight mb-2">20</div>
            <h3 className="text-xl text-neutral-300 mb-2">Phones installed, organized, and working together</h3>
            <p className="text-neutral-500 text-sm">Ready for app testing, automation, QA, and enterprise-scale real-device operations.</p>
          </div>
          <div>
            <div className="text-7xl md:text-8xl font-semibold text-white tracking-tight mb-2">2U</div>
            <h3 className="text-xl text-neutral-300 mb-2">Server-style rackmount form factor</h3>
            <p className="text-neutral-500 text-sm">Enterprise Phone Farm Hardware · Rackmount Phone Farm · Server-style Device Farm infrastructure from Guangzhou.</p>
          </div>
        </div>
      </section>

      {/* Efficiency — reference Before/After concept */}
      <section className="border-b border-neutral-800 bg-neutral-950">
        <div className="container-wide py-20 grid md:grid-cols-2 gap-12">
          <div>
            <p className="section-label">Centralized Power &amp; Cooling</p>
            <h2 className="text-2xl font-semibold text-white mb-4">Optimized for Stable 24/7 Operation</h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Compared to scattered phones on chargers, a rackmount Max Phones Farm box reduces cable clutter, improves airflow, and supports battery-free configurations where specified — helping teams run cleaner, more stable device farms for testing and automation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="border border-neutral-800 p-6">
              <p className="text-xs uppercase tracking-widest text-neutral-600 mb-2">Before</p>
              <p className="text-sm text-neutral-500">Loose devices, individual chargers, thermal drift</p>
            </div>
            <div className="border border-white p-6">
              <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">After</p>
              <p className="text-sm text-neutral-300">2U rack, centralized PSU, integrated cooling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Remote control */}
      <section className="section border-b border-neutral-800">
        <div className="container-wide grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label">Remote Control Setup</p>
            <h2 className="section-title">Expansive Uses — Unified Control</h2>
            <p className="text-neutral-400 leading-relaxed mb-4">
              Applications are near-endless for teams that benefit from multiple real devices, unified computing, and Android automation at scale. Max Phones Farm streamlines running devices together — with remote control configuration and group control system setup available from our Guangzhou team.
            </p>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Instead of manually operating each device, manage your fleet from one workstation. Batch commands, APK deployment, screen mirroring, and ADB-level automation — without cable chaos.
            </p>
            <Link href="/services" className="btn-secondary">Remote Control Services →</Link>
          </div>
          <div className="relative aspect-video border border-neutral-800">
            <Image src={IMAGES.remoteControl.hero} alt="Remote control workstation" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Enterprise capabilities */}
      <section className="section border-b border-neutral-800">
        <div className="container-wide">
          <h2 className="section-title">Enterprise Deployment Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800">
            {[
              { title: "Cooling", desc: "Active fan modules for dense 24/7 rack operation" },
              { title: "Power", desc: "Centralized PSU — battery-free options where configured" },
              { title: "Network", desc: "Switches, routing, and stable multi-device connectivity" },
              { title: "Custom Cabinet", desc: "Bulk delivery and rackmount deployment projects" },
            ].map((item) => (
              <div key={item.title} className="bg-neutral-950 p-6">
                <h3 className="font-medium text-white mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility */}
      <section className="section border-b border-neutral-800">
        <div className="container-wide">
          <h2 className="section-title">Guangzhou Factory &amp; Delivery</h2>
          <p className="section-subtitle">Real production capacity — office, meeting rooms, workshop, and warehouse. Bulk delivery and overseas shipping for enterprise clients.</p>
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
          <h2 className="section-title">FAQ</h2>
          <p className="text-neutral-500 text-sm mb-8">Support available Monday–Friday · Responses typically within 24h</p>
          <FAQAccordion items={previewFaq} />
          <div className="mt-8">
            <Link href="/faq" className="btn-outline">More Questions</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <ContactCTA title="Enterprise Inquiry — Bulk Delivery & Custom Cabinet Projects" />
        </div>
      </section>
    </>
  );
}
