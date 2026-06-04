import Image from "next/image";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "About Max Phones Farm — Guangzhou Manufacturer",
  description:
    "Real-device phone farm hardware manufacturer in Guangzhou, China since 2017. Factory-direct boxes, custom solutions, and global delivery.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-4xl">
        <h1 className="section-title">About Max Phones Farm</h1>
        <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
          {SITE.intro} Based in <strong className="text-white">{SITE.location}</strong>, we specialize in rackmount phone farm hardware, server-style device farms, and custom cabinet projects. Serving enterprise teams worldwide since <strong className="text-white">{SITE.since}</strong>.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { title: "Real Device Environment", desc: "Every product uses physical smartphones or motherboards — not cloud phones or emulators." },
            { title: "Stable Deployment", desc: "Centralized power, active cooling, and QC burn-in testing ensure 24/7 uptime." },
            { title: "Custom Production", desc: "Bespoke chassis, node counts, and rack integrations engineered for your workflow." },
            { title: "Enterprise Partnership", desc: "Dedicated account management, SLA support, and bulk pricing for large orders." },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <h2 className="font-bold text-white mb-2">{item.title}</h2>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Our Facilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { src: IMAGES.office, label: "Office" },
            { src: IMAGES.meeting, label: "Meeting Room" },
            { src: IMAGES.workshop, label: "Production Workshop" },
            { src: IMAGES.factory, label: "Assembly Line" },
            { src: IMAGES.warehouse, label: "Warehouse & Shipping" },
            { src: IMAGES.serviceScene, label: "Testing Lab" },
          ].map((img) => (
            <div key={img.label} className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src={img.src} alt={img.label} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent flex items-end p-3">
                <span className="text-white text-sm">{img.label}</span>
              </div>
            </div>
          ))}
        </div>

        <ContactCTA title="Partner With Our Factory" />
      </div>
    </div>
  );
}
