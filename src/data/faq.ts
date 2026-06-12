import { CONTACT } from "@/lib/config";
import { REFERENCE_HOME_FAQ } from "./reference-faq";
import { BUYER_SPEC_FAQ } from "./buyer-spec-faq";

/** B2B purchase & AI-search FAQ — user question phrasing. */
export const B2B_PURCHASE_FAQ = [
  {
    question: "Where can I buy a phone farm box directly from a factory?",
    answer:
      "Max Phones Farm is a Guangzhou factory-direct phone farm box supplier. Browse the hardware catalog at /products, then submit a quote request at /contact with device count, Android or motherboard models, and destination country. We reply with specifications, lead time, and USD pricing — typically within one business day. MOQ is one unit for standard models so you can evaluate before bulk purchase.",
  },
  {
    question: "Can I pay with USDT for phone farm hardware?",
    answer:
      "Standard payment is bank transfer (T/T), Wise, or PayPal per your written quote. USDT (Tron TRC20) may be offered for select orders when agreed in writing on the pro-forma invoice. Request available payment options when you receive your quote — see /terms for full payment policy.",
  },
  {
    question: "What is the difference between a phone farm box and a rackmount phone farm?",
    answer:
      "A phone farm box is a standalone 20-slot chassis for desk or shelf deployment. A rackmount phone farm is the same 20-node density in a 2U 19-inch server rack form factor for data-center, colocation, or NOC integration. Both use centralized PSU, active cooling, and one USB uplink per chassis. Compare layouts in our rackmount vs standalone guide at /blog/rackmount-vs-standalone-phone-farm.",
  },
  {
    question: "Is phone farm hardware used for app testing labs?",
    answer:
      "Yes. Enterprise device labs use phone farm boxes and rackmount chassis for mobile app QA, regression testing, CI automation, batch APK deployment, and remote ADB workflows on physical Android and iOS hardware — not emulators alone. See /blog/phone-farm-for-app-testing-labs for typical lab workflows.",
  },
  {
    question: "Do you offer phone farm wholesale or bulk orders?",
    answer:
      "Bulk pricing applies from five units on standard models. Multi-rack projects receive staged delivery schedules and palletized export packing. MOQ remains one unit for evaluation orders. Contact us with quantity, models, and destination for wholesale pricing on the pro-forma invoice.",
  },
  {
    question: "What is a 2U phone farm rack and who needs one?",
    answer:
      "A 2U phone farm rack is a 19-inch rackmount chassis that holds 20 Android nodes in two rack units (88 mm) of vertical space. It suits teams with existing server racks, colocation, or NOC floors who want phone farm density without standalone boxes on desks. Our Rackmount Phone Farm +20 fits standard 482 mm cabinets — see /blog/2u-phone-farm-rack-buyer-guide.",
  },
  {
    question: "Can you build a custom phone farm box for our device models?",
    answer:
      "Yes. Share target Android or motherboard SKUs, slot count, and rack constraints. We confirm fit, power draw, and cooling before production. Custom slot spacing typically ships in 7–15 business days after specification sign-off. Empty shells for integrator builds are available at /products/empty-box-chassis.",
  },
  {
    question: "What is Android phone farm hardware?",
    answer:
      "Android phone farm hardware is physical chassis — phone farm boxes, rackmount arrays, or motherboard boxes — that power, cool, and USB-route multiple Android devices from one control PC. Max Phones Farm supplies complete systems from Guangzhou with burn-in QC, export packing, and optional remote setup. Overview: /blog/android-phone-farm-hardware-explained.",
  },
  {
    question: "What is phone farm equipment vs phone farm software?",
    answer:
      "Phone farm equipment is physical hardware — chassis, PSU, fans, USB backplanes, and rack modules. Software (ADB, mirroring, CI agents) runs on your control PC. Max Phones Farm supplies the equipment layer and optional Remote Control Setup; your team owns test apps and automation policies.",
  },
  {
    question: "Can phone farm hardware be used for short-video app testing labs?",
    answer:
      "Yes, for legitimate mobile app QA — compatibility testing, release regression, and performance checks on physical Android devices used by short-video and social content apps. We supply B2B hardware for enterprise device labs, not tutorials for policy-violating automation. See /blog/phone-farm-short-video-app-testing-labs.",
  },
  {
    question: "What is mobile device farm hardware?",
    answer:
      "Mobile device farm hardware is rackmount or box chassis that hosts many smartphones or motherboard nodes with shared power, cooling, and USB routing — the physical layer behind device labs, batch testing, and remote ADB workflows. Guide: /blog/mobile-device-farm-hardware-guide.",
  },
] as const;

/** All FAQ entries for schema and /faq.json — buyer specs first. */
export const ALL_FAQ_ITEMS = [
  ...BUYER_SPEC_FAQ,
  ...B2B_PURCHASE_FAQ,
  ...REFERENCE_HOME_FAQ,
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
    question: "Can your hardware support mobile display and in-app creative QA?",
    answer:
      "Yes. Real-device labs are commonly used for mobile creative rendering checks, regional in-app preview, landing page verification, and device compatibility testing across physical Android and iOS hardware — not emulators alone.",
  },
  {
    question: "Real-device lab vs cloud phones — which should we choose?",
    answer:
      "Cloud phones run on shared virtual infrastructure. Our hardware gives you physical Android and iOS devices with authentic sensors, radios, and OS behavior. Choose real-device labs when you need genuine device fingerprints, regional carrier behavior, or long-running QA automation you control in your rack or lab.",
  },
  {
    question: "Do you support project-isolated device slots for enterprise labs?",
    answer:
      "Our hardware provides separate physical device slots per team or project for enterprise lab governance and QA environment separation. Your team controls the application layer and internal access policies.",
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
    question: "How do I place an order?",
    answer:
      "Submit a quote request on our contact page or message us on WhatsApp/Telegram with device count, models, and destination country. We reply with a written USD quote or pro-forma invoice. After you approve specifications and payment terms, we assemble, burn-in test, and ship from Guangzhou. There is no public shopping cart — all orders are quote-first B2B.",
  },
  {
    question: "What payment terms do you offer?",
    answer:
      "Sample and standard orders can be settled via bank transfer (T/T), Wise, or PayPal. Bulk and enterprise projects receive a pro-forma invoice with an agreed payment schedule. USDT (Tron TRC20) may be offered when agreed in writing on the quote. Contact sales for a formal pro-forma.",
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

/** General + enterprise FAQ (excludes buyer spec block shown separately on /faq). */
export const FAQ_ITEMS = ALL_FAQ_ITEMS;

/** Curated subset for homepage — reference topics first, then enterprise essentials */
export const HOME_FAQ = ALL_FAQ_ITEMS.filter((item) =>
  [
    "What can I do with a phone farm",
    "Is there a setup tutorial",
    "Which countries do you ship",
    "I have more questions",
    "Where can I buy a phone farm box",
    "What is the difference between a phone farm box",
    "Is phone farm hardware used for app testing",
    "What hardware does Max Phones Farm",
    "Real-device lab vs cloud",
    "How long is delivery",
    "Do you provide remote control",
    "What are the chassis dimensions",
    "Which phone models are supported",
    "How many phone farm boxes can one computer",
    "Can you send photos or video before shipment",
    "Can I pay with USDT",
  ].some((prefix) => item.question.startsWith(prefix))
);
