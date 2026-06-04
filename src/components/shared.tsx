import { CONTACT, SITE } from "@/lib/config";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ContactBar({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${compact ? "text-xs" : "text-sm"}`}>
      <a href={`tel:${CONTACT.phone}`} className="text-neutral-400 hover:text-white transition-colors">
        {CONTACT.phone}
      </a>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
        WhatsApp
      </a>
      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
        Telegram
      </a>
      <a href={`mailto:${CONTACT.email}`} className="text-neutral-400 hover:text-white transition-colors">
        {CONTACT.email}
      </a>
    </div>
  );
}

export function ContactCTA({ title = "Enterprise Inquiry" }: { title?: string }) {
  return (
    <section className="border border-neutral-800 p-10 md:p-16 text-center bg-neutral-950">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight">{title}</h2>
      <p className="text-neutral-500 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
        Factory-direct from {SITE.location}. Enterprise quotes, bulk delivery, and custom cabinet deployment — typically within 24 hours.
      </p>
      <ContactBar />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          WhatsApp Sales
        </a>
        <a href="/contact" className="btn-secondary">
          Send Enterprise Inquiry
        </a>
      </div>
    </section>
  );
}

export function MobileContactBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-neutral-950/98 border-t border-neutral-800 backdrop-blur-sm">
      <div className="grid grid-cols-4 divide-x divide-neutral-800">
        <a href={`tel:${CONTACT.phone}`} className="flex flex-col items-center py-3 text-[10px] text-neutral-400 hover:text-white">
          Call
        </a>
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center py-3 text-[10px] text-neutral-400 hover:text-white">
          WhatsApp
        </a>
        <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center py-3 text-[10px] text-neutral-400 hover:text-white">
          Telegram
        </a>
        <a href={`mailto:${CONTACT.email}`} className="flex flex-col items-center py-3 text-[10px] text-neutral-400 hover:text-white">
          Email
        </a>
      </div>
    </div>
  );
}

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <span className="badge-red">Sold out</span>;
  if (stock <= 5) return <span className="badge-yellow">Low stock</span>;
  return <span className="badge-green">In stock</span>;
}
