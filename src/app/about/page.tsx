import Image from "next/image";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { SITE, CONTACT } from "@/lib/config";

export const metadata = buildMetadata({
  title: "About — Guangzhou Hardware Supplier",
  description:
    "Max Phones Farm team — Guangzhou-based phone farm hardware assembly, custom rack builds, and export logistics for device labs worldwide.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-4xl">
        <h1 className="section-title">About Max Phones Farm</h1>
        <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
          {SITE.intro} We are a Guangzhou hardware sourcing and assembly team focused on rackmount phone farm equipment for enterprise device labs — not software resale or cloud phone services.
        </p>

        <div className="border border-neutral-800 p-6 mb-12 text-sm text-neutral-500 leading-relaxed bg-neutral-950">
          <p className="text-white font-medium mb-3">What we do</p>
          <ul className="space-y-2">
            <li>Factory-direct assembly of phone farm boxes and rackmount chassis</li>
            <li>Custom rack, cabinet, and node-count configuration to your device models</li>
            <li>Power, cooling, and USB backplane integration tested before export</li>
            <li>Export packing with commercial invoices and packing documentation</li>
            <li>Remote control setup and multi-rack deployment support on request</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { title: "Physical Hardware", desc: "Chassis, PSU, fans, and USB infrastructure — built for real Android and iOS device labs." },
            { title: "Assembly & QC", desc: "Units are built and burn-in tested at our Guangzhou workshop before international shipment." },
            { title: "Custom Builds", desc: "Slot layouts, rack ears, and power budgets quoted against your target device list." },
            { title: "Sales & Engineering", desc: `WhatsApp, Telegram, phone, and email — typically within 24 hours on business days (UTC+8).` },
          ].map((item) => (
            <div key={item.title} className="border border-neutral-800 p-6 bg-neutral-950">
              <h2 className="font-medium text-white mb-2">{item.title}</h2>
              <p className="text-neutral-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2">Guangzhou Facility</h2>
        <p className="text-neutral-500 text-sm mb-6">Office, workshop, and warehouse photos from our Guangzhou operation.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { src: IMAGES.office, label: "Office" },
            { src: IMAGES.meeting, label: "Meeting Room" },
            { src: IMAGES.workshop, label: "Assembly Workshop" },
            { src: IMAGES.warehouse, label: "Warehouse & Export" },
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

        <div className="border border-neutral-800 p-6 mb-12 text-sm text-neutral-400">
          <p className="text-white font-medium mb-2">Contact</p>
          <p>Phone: {CONTACT.phone} · WhatsApp: {CONTACT.whatsapp} · Telegram: {CONTACT.telegram}</p>
          <p className="mt-1">Email: {CONTACT.email} · Location: {SITE.location}</p>
        </div>

        <ContactCTA title="Discuss Your Lab Project" />
      </div>
    </div>
  );
}
