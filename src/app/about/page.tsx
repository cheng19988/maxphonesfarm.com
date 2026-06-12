import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { CONTACT, SITE } from "@/lib/config";
import { DELIVERY_PROCESS } from "@/data/delivery-process";

export const metadata = buildMetadata({
  title: "About — Guangzhou Phone Farm Factory Since 2017",
  description:
    "Max Phones Farm — Guangzhou phone farm box and rackmount hardware factory. Assembly, burn-in QC, custom chassis, and worldwide export for enterprise device labs.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        variant="banner"
        label={SITE.location}
        title="About Max Phones Farm"
        subtitle={SITE.intro}
        image={IMAGES.workshop}
        imageAlt="Max Phones Farm Guangzhou workshop"
      >
        <Link href="/contact" className="btn-primary">Contact Sales</Link>
      </PageHero>

      <section className="section section-white border-b border-neutral-200">
        <div className="container-wide">
          <div className="feature-grid mb-16">
            {[
              { title: "Physical Hardware", desc: "Chassis, PSU, fans, and USB infrastructure — built for real Android and iOS device labs." },
              { title: "Assembly & QC", desc: "Units are built and burn-in tested at our Guangzhou workshop before international shipment." },
              { title: "Custom Builds", desc: "Slot layouts, rack ears, and power budgets quoted against your target device list." },
              { title: "Sales & Engineering", desc: "WhatsApp, Telegram, and email — typically within 24 hours on business days (UTC+8)." },
            ].map((item) => (
              <div key={item.title} className="surface-elevated p-8">
                <h2 className="text-lg font-medium text-neutral-900 mb-3">{item.title}</h2>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="section-title">Guangzhou Facility</h2>
          <p className="section-subtitle">Office, workshop, and warehouse — real photos from our operation.</p>
          <div className="gallery-grid mb-12">
            {[
              { src: IMAGES.workshop, label: "Assembly Workshop", desc: "Chassis build and burn-in testing" },
              { src: IMAGES.warehouse, label: "Warehouse & Export", desc: "Export packing and logistics" },
              { src: IMAGES.meeting, label: "Engineering", desc: "Deployment planning and quotes" },
              { src: IMAGES.office, label: "Office", desc: "Sales and project coordination" },
              { src: IMAGES.frontDesk, label: "Reception", desc: "Factory visits by appointment" },
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
        </div>
      </section>

      <section className="section section-muted border-b border-neutral-200">
        <div className="container-wide max-w-4xl">
          <h2 className="section-title">Delivery Workflow</h2>
          <ol className="space-y-4">
            {DELIVERY_PROCESS.map((step) => (
              <li key={step.step} className="flex gap-5 surface p-6">
                <span className="text-2xl font-semibold text-neutral-600 shrink-0 w-8">{step.step}</span>
                <div>
                  <h3 className="font-medium text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-neutral-500">
            Contact: {CONTACT.telegram} · {CONTACT.whatsapp} · {CONTACT.email} · {SITE.location}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <ContactCTA title="Discuss Your Lab Project" />
        </div>
      </section>
    </>
  );
}
