import { CONTACT } from "@/lib/config";

const CHANNELS = [
  {
    id: "telegram",
    label: "Telegram",
    value: CONTACT.telegram,
    href: CONTACT.telegramUrl,
    external: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsappUrl,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    external: false,
  },
] as const;

export function FloatingContact() {
  return (
    <aside
      className="fixed bottom-5 right-5 z-50 w-72 max-w-[calc(100vw-2.5rem)] rounded-xl border border-neutral-200 bg-white p-4 shadow-xl shadow-neutral-900/10"
      aria-label="Contact sales"
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
        Contact Sales
      </p>
      <ul className="space-y-2">
        {CHANNELS.map((channel) => (
          <li key={channel.id}>
            <a
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className="flex flex-col rounded-lg px-3 py-2.5 transition-colors hover:bg-blue-50"
            >
              <span className="text-xs font-medium text-neutral-500">{channel.label}</span>
              <span className="text-sm font-medium text-neutral-900 break-all">{channel.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
