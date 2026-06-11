import { emailComposeUrl } from "@/lib/email-link";
import { CONTACT } from "@/lib/config";

const CHANNELS = [
  {
    id: "telegram",
    label: "Telegram",
    href: CONTACT.telegramUrl,
    external: true,
    buttonClass: "bg-[#229ED9] hover:bg-[#1b8ec7] shadow-[#229ED9]/25",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: CONTACT.whatsappUrl,
    external: true,
    buttonClass: "bg-[#25D366] hover:bg-[#20bd5a] shadow-[#25D366]/25",
  },
  {
    id: "email",
    label: "Email",
    href: emailComposeUrl(),
    external: true,
    buttonClass: "bg-blue-700 hover:bg-blue-800 shadow-blue-700/25",
  },
] as const;

function ChannelIcon({ id }: { id: (typeof CHANNELS)[number]["id"] }) {
  if (id === "telegram") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M21.94 4.57a1.5 1.5 0 0 0-1.53-.21L3.6 11.28a1.25 1.25 0 0 0 .08 2.33l4.57 1.52 1.76 5.32a1 1 0 0 0 1.66.42l2.38-2.3 4.45 3.28a1.25 1.25 0 0 0 1.96-.76l2.49-14.2a1.5 1.5 0 0 0-.71-1.62zM9.18 13.9l8.9-5.52-6.84 6.18-.43 3.86-1.1-3.32 3.47-1.2z" />
      </svg>
    );
  }

  if (id === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function FloatingContact() {
  return (
    <aside
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5"
      aria-label="Contact sales"
    >
      {CHANNELS.map((channel) => (
        <a
          key={channel.id}
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={channel.label}
          title={channel.label}
          className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl ${channel.buttonClass}`}
        >
          <ChannelIcon id={channel.id} />
        </a>
      ))}
    </aside>
  );
}
