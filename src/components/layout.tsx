import Link from "next/link";
import { NAV, SITE } from "@/lib/config";
import { whatsappQuoteUrl } from "@/lib/whatsapp";
import { BrandLogo } from "./brand-logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="hidden lg:block border-b border-neutral-100 bg-neutral-50">
        <div className="container-wide py-2 text-xs text-neutral-500">
          <span>{SITE.location} · {SITE.headerBar}</span>
        </div>
      </div>
      <div className="container-wide py-4 flex items-center justify-between gap-6">
        <BrandLogo />
        <nav className="hidden xl:flex items-center gap-9">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-neutral-600 hover:text-blue-700 font-medium transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={whatsappQuoteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-secondary text-xs py-2.5 px-5"
          >
            WhatsApp
          </a>
          <Link href="/contact" className="btn-primary text-xs py-2.5 px-5">
            Request Quote
          </Link>
        </div>
      </div>
      <nav className="xl:hidden container-wide pb-3 flex gap-6 overflow-x-auto text-sm border-t border-neutral-100 pt-3">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="text-neutral-600 hover:text-blue-700 whitespace-nowrap font-medium">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer-dark border-t border-neutral-800 mt-auto text-white">
      <div className="container-wide py-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <BrandLogo dark />
          <p className="text-neutral-400 text-sm mt-6 mb-8 max-w-md leading-relaxed">{SITE.description}</p>
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-xs uppercase tracking-[0.18em] text-neutral-400 mb-5 font-medium">Products</h3>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li><Link href="/products/custom-cabinet" className="hover:text-white transition-colors">Rackmount Phone Farm</Link></li>
            <li><Link href="/products/phone-farm-box" className="hover:text-white transition-colors">Enterprise Phone Farm Box</Link></li>
            <li><Link href="/products/motherboard-box" className="hover:text-white transition-colors">Motherboard Box</Link></li>
            <li><Link href="/products/real-device-phone-farm" className="hover:text-white transition-colors">Server-Style Device Farm</Link></li>
            <li><Link href="/packages" className="hover:text-white transition-colors">Solution Packages</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-4">
          <h3 className="text-xs uppercase tracking-[0.18em] text-neutral-400 mb-5 font-medium">Company</h3>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Guides</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-800 py-5 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {SITE.name} · {SITE.location}
      </div>
    </footer>
  );
}
