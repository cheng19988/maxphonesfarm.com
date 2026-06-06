import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { DELIVERY_PROCESS } from "@/data/delivery-process";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Deployment & Lab Setup Services",
  description:
    "Hardware assembly, remote device control setup, bulk provisioning, and export logistics from our Guangzhou team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Deployment Services</h1>
        <p className="section-subtitle">
          Hardware assembly, remote Android device control setup, bulk lab provisioning, and export logistics — from our Guangzhou team.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc) => (
            <article key={svc.slug} className="card overflow-hidden group">
              <div className="relative aspect-video">
                <Image src={svc.image} alt={svc.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">{svc.title}</h2>
                <p className="text-neutral-400 text-sm mb-4">{svc.description}</p>
                <Link href={`/contact?service=${svc.slug}`} className="text-neutral-400 text-sm hover:text-white underline underline-offset-4">
                  Request This Service →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-20 pt-16 border-t border-neutral-800">
          <h2 className="section-title">Assembly, QC &amp; Export Process</h2>
          <p className="section-subtitle max-w-3xl">
            What happens after you confirm a quote — from device fit check to export packing. No fabricated certifications or client logos; this is our standard hardware delivery workflow.
          </p>
          <ol className="space-y-6 max-w-3xl">
            {DELIVERY_PROCESS.map((step) => (
              <li key={step.step} className="flex gap-5 border border-neutral-800 p-5 bg-neutral-950">
                <span className="text-2xl font-semibold text-neutral-600 shrink-0 w-8">{step.step}</span>
                <div>
                  <h3 className="font-medium text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-16">
          <ContactCTA title="Need a Custom Deployment Plan?" />
        </div>
      </div>
    </div>
  );
}
