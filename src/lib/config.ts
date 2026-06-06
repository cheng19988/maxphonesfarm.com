export const SITE = {
  name: "Max Phones Farm",
  domain: "maxphonesfarm.com",
  url: "https://maxphonesfarm.com",
  tagline: "Rackmount Phone Farm Hardware — Guangzhou Factory",
  intro:
    "Max Phones Farm designs and builds rackmount phone farm chassis, standalone device lab boxes, and motherboard arrays for enterprise app testing, remote device management, and QA automation hardware.",
  location: "Guangzhou, China",
  since: 2017,
  description:
    "Guangzhou factory-direct rackmount phone farm hardware — device lab boxes, motherboard arrays, power/cooling modules, and custom deployment support for enterprise QA teams.",
} as const;

export const CONTACT = {
  phone: "13059502618",
  telegram: "@huicheng1998",
  telegramUrl: "https://t.me/huicheng1998",
  whatsapp: "+852 6215 5642",
  whatsappUrl: "https://wa.me/85262155642",
  email: "qiuxui646@gmail.com",
} as const;

export const PAYMENT = {
  network: "Tron TRC20",
  currency: "USDT",
  address: "TH42KshQyz15iWk5svAwS475RM8oYQjwjW",
  contract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  minAmount: 10,
  expiryMinutes: 30,
} as const;

export const NAV = [
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Guides" },
  { href: "/contact", label: "Contact" },
] as const;

export const HERO_PILLARS = [
  {
    label: "The Original Phone Farm Box",
    href: "/products/phone-farm-box",
    desc: "Factory-built 20-node real device chassis",
  },
  {
    label: "Rackmount Phone Farm",
    href: "/products/custom-cabinet",
    desc: "Server-style 2U rack integration",
  },
  {
    label: "Remote Control Setup",
    href: "/products/remote-control-setup",
    desc: "Unified device management from one workstation",
  },
] as const;
