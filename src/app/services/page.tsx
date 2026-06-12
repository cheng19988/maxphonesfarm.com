import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { DELIVERY_PROCESS } from "@/data/delivery-process";
import { PageHero } from "@/components/page-hero";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Phone Farm Deployment Services — Remote Setup & Export",
  description:
    "Phone farm remote setup, ADB handover, bulk lab provisioning, and export logistics from Guangzhou. Phone farm box with remote setup for up to 20 nodes per session.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Deployment Support"
        title="Lab Setup Services"
        subtitle="Hardware assembly, remote Android device control setup, bulk lab provisioning, and export logistics — from our Guangzhou team."
        image={IMAGES.serviceScene}
        imageAlt="Device lab management services"
      />

      <section className="section section-white border-b border-neutral-200">
        <div className="container-wide">
          <div className="feature-grid">
            {SERVICES.map((svc) => (
              <article key={svc.slug} className="card card-hover group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={svc.image} alt={svc.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="33vw" />
                </div>
                <div className="p-7">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-3">{svc.title}</h2>
                  <p className="text-neutral-600 text-sm mb-5 leading-relaxed">{svc.description}</p>
                  <Link href={`/contact?service=${svc.slug}`} className="btn-outline text-xs py-2.5 px-4">
                    Request This Service
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted border-b border-neutral-200">
        <div className="container-wide max-w-4xl">
          <h2 className="section-title">Assembly, QC & Export Process</h2>
          <p className="section-subtitle">
            What happens after you confirm a quote — from device fit check to export packing.
          </p>
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
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <ContactCTA title="Need a Custom Deployment Plan?" />
        </div>
      </section>
    </>
  );
}
