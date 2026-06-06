import Link from "next/link";
import { CONTACT, NAV, SITE } from "@/lib/config";
import { whatsappQuoteUrl } from "@/lib/whatsapp";
import { ContactBar } from "./shared";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
      <div className="hidden md:block border-b border-neutral-800">
        <div className="container-wide py-2 flex justify-between items-center text-xs text-neutral-500">
          <span>{SITE.location} · {SITE.headerBar}</span>
          <ContactBar compact />
        </div>
      </div>
      <div className="container-wide py-5 flex items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <div className="font-semibold text-white tracking-tight text-lg">{SITE.name}</div>
          <div className="text-[10px] text-neutral-500 tracking-wide hidden sm:block">{SITE.logoSubtitle}</div>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={whatsappQuoteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex btn-secondary text-xs py-2.5 px-5"
          >
            WhatsApp Quote
          </a>
          <Link href="/contact" className="btn-primary text-xs py-2.5 px-5">
            Request Quote
          </Link>
        </div>
      </div>
      <nav className="lg:hidden container-wide pb-3 flex gap-5 overflow-x-auto text-sm border-t border-neutral-800 pt-3">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="text-neutral-500 hover:text-white whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 mt-auto bg-neutral-950">
      <div className="container-wide py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-semibold text-white text-lg mb-3">{SITE.name}</div>
          <p className="text-neutral-500 text-sm mb-6 max-w-md leading-relaxed">{SITE.description}</p>
          <ContactBar />
          <p className="text-neutral-600 text-xs mt-4 max-w-md">
            Guangzhou hardware sourcing and assembly team · Custom rack/cabinet configuration · Export packing ·
            Response usually within 24 hours on business days (UTC+8).
          </p>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4">Products</h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/products/custom-cabinet" className="hover:text-white">Rackmount Phone Farm</Link></li>
            <li><Link href="/products/phone-farm-box" className="hover:text-white">Enterprise Phone Farm Box</Link></li>
            <li><Link href="/products/motherboard-box" className="hover:text-white">Motherboard Box</Link></li>
            <li><Link href="/products/real-device-phone-farm" className="hover:text-white">Server-Style Device Farm</Link></li>
            <li><Link href="/products" className="hover:text-white underline underline-offset-4">All Products</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/blog" className="hover:text-white">Guides</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-800 py-5 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} {SITE.name} · {SITE.location}
      </div>
    </footer>
  );
}
