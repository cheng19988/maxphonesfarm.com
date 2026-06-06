import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/services";
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
        <div className="mt-16">
          <ContactCTA title="Need a Custom Deployment Plan?" />
        </div>
      </div>
    </div>
  );
}
