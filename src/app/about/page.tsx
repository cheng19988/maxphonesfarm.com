import Image from "next/image";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "About Us — Guangzhou Manufacturer",
  description:
    "Max Phones Farm manufactures real-device phone farm hardware in Guangzhou since 2017. Assembly, QC, and worldwide export from our own facility.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-4xl">
        <h1 className="section-title">About Max Phones Farm</h1>
        <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
          {SITE.intro} We operate from {SITE.location}, where we design chassis, assemble hardware, run QC, and prepare export shipments — factory-direct, without resellers.
        </p>

        <div className="border border-neutral-800 p-6 mb-12 text-sm text-neutral-500 leading-relaxed">
          <p className="text-white font-medium mb-2">At a glance</p>
          <ul className="space-y-1">
            <li>Founded {SITE.since} · Based in Guangzhou, China</li>
            <li>Product focus: 20-node phone farm boxes, motherboard arrays, 2U rackmount cabinets</li>
            <li>Services: remote control setup, bulk provisioning, custom hardware, international shipping</li>
            <li>Sales: WhatsApp, Telegram, phone, and email — English and Chinese support</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { title: "Physical Hardware Only", desc: "Every product uses real smartphones or motherboards. We do not resell cloud phones or emulator services." },
            { title: "Assembly & QC On-Site", desc: "Units are built and burn-in tested in our Guangzhou workshop before packing for export." },
            { title: "Custom Builds", desc: "Node counts, chassis dimensions, power layouts, and rack integrations tailored to your device models." },
            { title: "Export Experience", desc: "Regular shipments via express courier and sea freight with commercial invoices and packing documentation." },
          ].map((item) => (
            <div key={item.title} className="border border-neutral-800 p-6 bg-neutral-950">
              <h2 className="font-medium text-white mb-2">{item.title}</h2>
              <p className="text-neutral-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-white mb-6">Our Facility</h2>
        <p className="text-neutral-500 text-sm mb-6">Photos taken at our Guangzhou office and production space.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { src: IMAGES.office, label: "Office" },
            { src: IMAGES.meeting, label: "Meeting Room" },
            { src: IMAGES.workshop, label: "Assembly Workshop" },
            { src: IMAGES.warehouse, label: "Warehouse & Shipping" },
            { src: IMAGES.frontDesk, label: "Reception" },
          ].map((img) => (
            <div key={img.label} className="relative aspect-[4/3] border border-neutral-800 overflow-hidden">
              <Image src={img.src} alt={img.label} fill className="object-cover" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent flex items-end p-3">
                <span className="text-white text-sm">{img.label}</span>
              </div>
            </div>
          ))}
        </div>

        <ContactCTA title="Talk to Our Factory Team" />
      </div>
    </div>
  );
}
