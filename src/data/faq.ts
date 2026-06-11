import { CONTACT } from "@/lib/config";

/** B2B FAQ — professional device lab hardware focus */
export const FAQ_ITEMS = [
  {
    question: "What hardware does Max Phones Farm supply?",
    answer:
      "We supply rackmount phone farm chassis, standalone phone farm boxes, motherboard arrays, power and cooling modules, USB backplanes, and lab network kits. We also offer remote control setup and custom multi-rack deployment planning from our Guangzhou assembly team.",
  },
  {
    question: "Can you customize node count, rack size, or device layout?",
    answer:
      "Yes. Share your target Android or motherboard model, slot count, and rack constraints. We confirm fit, power draw, and cooling before production. Custom layouts typically ship in 7–15 business days after specification approval.",
  },
  {
    question: "Which devices are compatible with your chassis?",
    answer:
      "Compatibility depends on slot dimensions and USB routing. Our standard systems target Android phones and screenless motherboard nodes. iOS arrays require a separate chassis design. Send your device model list for a fit check before ordering.",
  },
  {
    question: "Can your hardware support ad verification and campaign QA?",
    answer:
      "Yes. Real-device labs are commonly used for mobile ad testing, regional ad preview, landing page verification, and device compatibility checks across physical Android and iOS hardware — not emulators alone.",
  },
  {
    question: "Real-device lab vs cloud phones — which should we choose?",
    answer:
      "Cloud phones run on shared virtual infrastructure. Our hardware gives you physical Android and iOS devices with authentic sensors, radios, and OS behavior. Choose real-device labs when you need genuine device fingerprints, regional carrier behavior, or long-running QA automation you control in your rack or lab.",
  },
  {
    question: "Do you support multi-account environment management?",
    answer:
      "Our hardware provides separate physical device slots for account environment management, team-based device assignment, and enterprise operation workflows. Your team controls the application layer and internal access policies.",
  },
  {
    question: "What is the MOQ and can I order a sample?",
    answer:
      "MOQ is one unit for standard models so you can evaluate hardware before bulk purchase. Bulk pricing applies from five units. Multi-rack projects are quoted separately with a dedicated project contact.",
  },
  {
    question: "How long is delivery and do you ship internationally?",
    answer:
      "In-stock units ship within 3–5 business days from Guangzhou. Custom builds take 7–15 business days. We ship worldwide via express courier or sea freight with commercial invoices and export packing lists.",
  },
  {
    question: "How is power and cooling handled in a 20-node system?",
    answer:
      "Each complete system uses a centralized PSU sized for your node count, replacing individual phone chargers. Active fans pull air across slots for continuous app testing, automation workflows, or remote device management workloads.",
  },
  {
    question: "Do you provide remote control and ADB setup?",
    answer:
      "Yes. Our engineering team configures ADB paths, screen mirroring, batch APK installation, and device grouping for scripted testing workflows and QA automation on your control workstation.",
  },
  {
    question: "What payment terms do you offer?",
    answer:
      "Sample and standard orders can be settled via bank transfer (T/T), Wise, or PayPal. Bulk and enterprise projects receive a pro-forma invoice with an agreed payment schedule. Contact sales for a quote.",
  },
  {
    question: "What after-sales support is included?",
    answer:
      "Hardware includes 12 months support for manufacturing defects. We supply spare fan and PSU modules on request. Remote troubleshooting is available via WhatsApp and Telegram during business hours (UTC+8), typically within 24 hours.",
  },
  {
    question: "How do I contact your sales team?",
    answer:
      `WhatsApp (${CONTACT.whatsapp}), Telegram (${CONTACT.telegram}), or email (${CONTACT.email}). Include target device count, device models, and destination country for the fastest quote.`,
  },
];

/** Curated subset for homepage */
export const HOME_FAQ = FAQ_ITEMS.filter((_, i) =>
  [0, 1, 3, 4, 7, 8, 9, 11].includes(i)
);
