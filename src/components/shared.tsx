import Link from "next/link";
import { CONTACT, SITE } from "@/lib/config";
import { whatsappQuoteUrl } from "@/lib/whatsapp";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ContactBar({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  const linkClass = dark
    ? "text-neutral-400 hover:text-white transition-colors"
    : "text-neutral-600 hover:text-blue-700 transition-colors";

  return (
    <div className={`flex flex-wrap items-center gap-4 ${compact ? "text-xs" : "text-sm"}`}>
      <a href={`tel:${CONTACT.phone}`} className={linkClass}>{CONTACT.phone}</a>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>WhatsApp</a>
      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>Telegram</a>
      <a href={`mailto:${CONTACT.email}`} className={linkClass}>{CONTACT.email}</a>
    </div>
  );
}

export function ContactCTA({
  title = "Enterprise Inquiry",
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="cta-banner">
      <div className="p-10 md:p-16 lg:p-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight max-w-2xl mx-auto">{title}</h2>
        <p className="text-blue-100 mb-10 max-w-xl mx-auto text-base leading-relaxed">
          {subtitle ??
            `Factory-direct from ${SITE.location}. Custom quotes and bulk delivery — typically within 24 hours on business days.`}
        </p>
        <ContactBar dark />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappQuoteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-blue-800 text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm"
          >
            WhatsApp Quote
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-white/80 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Send Inquiry
          </Link>
        </div>
      </div>
    </section>
  );
}

export function MobileContactBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 border-t border-neutral-200 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-4 divide-x divide-neutral-200">
        {[
          { href: `tel:${CONTACT.phone}`, label: "Call" },
          { href: CONTACT.whatsappUrl, label: "WhatsApp" },
          { href: CONTACT.telegramUrl, label: "Telegram" },
          { href: `mailto:${CONTACT.email}`, label: "Email" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.label === "Call" ? undefined : "_blank"}
            rel={item.label === "Call" ? undefined : "noopener noreferrer"}
            className="flex flex-col items-center py-3 text-[10px] text-neutral-600 hover:text-blue-700 font-medium"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <span className="badge-red">Sold out</span>;
  if (stock <= 5) return <span className="badge-yellow">Low stock</span>;
  return <span className="badge-green">In stock</span>;
}
