export const SITE = {
  name: "Max Phones Farm",
  domain: "maxphonesfarm.com",
  url: "https://maxphonesfarm.com",
  tagline: "Enterprise-Grade Phone Farm Hardware for Real Device Deployment",
  intro:
    "Max Phones Farm is a Guangzhou-based enterprise phone farm hardware solution provider for large-scale real-device deployment, rackmount phone farm boxes, custom cabinet projects, remote control setup, and professional phone farm infrastructure.",
  location: "Guangzhou, China",
  since: 2017,
  description:
    "Max Phones Farm — Enterprise rackmount phone farm hardware from Guangzhou. Phone farm boxes, motherboard boxes, custom cabinets, power, cooling, network equipment, remote control setup, and large-scale deployment since 2017.",
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
    desc: "Unified multi-device management",
  },
] as const;
