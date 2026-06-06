export type ProductQuoteGuide = {
  suitableFor: string[];
  notSuitableFor: string[];
  requiredBeforeQuote: string[];
  typicalLeadTime: string;
  packingShipping: string[];
  warrantySpareParts: string[];
};

export const PRODUCT_QUOTE_GUIDES: Record<string, ProductQuoteGuide> = {
  "custom-cabinet": {
    suitableFor: [
      "Enterprise device labs with existing 19\" rack space",
      "Teams running 15–20 Android devices continuously for app testing or QA automation",
      "Operations that need centralized power and USB routing instead of desk chargers",
      "Export-bound projects requiring factory assembly and burn-in before shipment",
    ],
    notSuitableFor: [
      "Single-phone or small pilot labs under 8 devices — consider Android Device Lab Starter",
      "Labs without rack space and no plan to add a rack — use Enterprise Phone Farm Box",
      "Projects requiring full phones with screens always visible to operators",
      "Buyers expecting plug-and-play cloud phones or emulators — we supply physical hardware only",
    ],
    requiredBeforeQuote: [
      "Target Android phone or motherboard model (with dimensions if available)",
      "Required node count and whether screenless / battery-free layout is acceptable",
      "Destination country and preferred shipping method (express air vs sea freight)",
      "Control workstation OS and whether remote control setup service is needed",
    ],
    typicalLeadTime:
      "In-stock standard 2U / 20-slot layout: 3–5 business days after quote confirmation. Custom slot spacing or board layout: 7–15 business days after fit check sign-off.",
    packingShipping: [
      "Unit is burn-in tested before packing; foam-lined export carton with corner protection",
      "Ships from Guangzhou with commercial invoice and packing list",
      "Express courier (DHL/FedEx/UPS) or sea freight — quoted based on weight and destination",
      "Rack ears included; client supplies devices unless device procurement is quoted separately",
    ],
    warrantySpareParts: [
      "12 months support for manufacturing defects on chassis, PSU, fans, and USB backplane",
      "Spare fan modules and PSU units available — quote part number at order stage",
      "Device phones/boards are client-supplied — not covered under chassis warranty",
      "Remote troubleshooting via WhatsApp/Telegram during business hours (UTC+8)",
    ],
  },
  "phone-farm-box": {
    suitableFor: [
      "QA teams scaling from a few phones to a managed 20-device bench lab",
      "App testing labs that do not have server rack infrastructure yet",
      "Pilot deployments before committing to rackmount integration",
      "Teams needing a self-contained box with one power input and one USB uplink",
    ],
    notSuitableFor: [
      "Data-center rack integration — use Rackmount Phone Farm +20 instead",
      "Headless motherboard-only farms — Motherboard Box is a better fit",
      "Buyers who need fewer than 4 devices — Android Device Lab Starter is more economical",
      "Projects expecting us to supply and provision Android phones with pre-loaded accounts",
    ],
    requiredBeforeQuote: [
      "Android models to be mounted (or confirm client-supplied devices)",
      "Desk/shelf dimensions available in your lab",
      "Destination country and quantity",
      "Whether optional rack adapter ears are needed for future migration",
    ],
    typicalLeadTime:
      "Standard 20-slot box in stock: 3–5 business days. Custom fan or USB layout: 7–10 business days after specification approval.",
    packingShipping: [
      "Factory QC checklist included in shipment documentation",
      "Single-carton export pack; weight typically 8–12 kg before devices installed",
      "Devices are not pre-installed unless explicitly quoted as an add-on service",
      "Worldwide express or sea freight from Guangzhou",
    ],
    warrantySpareParts: [
      "12 months on chassis, integrated PSU, and fan module for manufacturing defects",
      "Replacement fan and USB host cable available as spare parts",
      "Connector wear from client device swaps is normal maintenance — spare USB cables quoted on request",
    ],
  },
  "motherboard-box": {
    suitableFor: [
      "Headless Android app testing where display output is not required",
      "Labs optimizing per-node cost and thermal load vs full-phone arrays",
      "ADB-driven automation and remote Android control workflows",
      "Teams with a confirmed motherboard SKU and dimensions ready for fit check",
    ],
    notSuitableFor: [
      "Campaign QA requiring on-device screen preview for ad display verification",
      "iOS workloads — use iPhone Device Lab Array",
      "Buyers without a confirmed motherboard model — fit cannot be guaranteed",
      "First-time phone farm buyers who have not validated their board choice yet",
    ],
    requiredBeforeQuote: [
      "Exact motherboard model or technical drawing with mounting hole pattern",
      "Android version and whether USB debugging is enabled on your board image",
      "Target node count (up to 20 per chassis)",
      "Shelf vs rack adapter mounting preference",
    ],
    typicalLeadTime:
      "Standard layout for a previously verified board: 7–10 business days. New board fit check and custom frame: 10–15 business days after sample review.",
    packingShipping: [
      "Board fit must be confirmed before assembly — we do not ship until layout is signed off",
      "Motherboards are client-supplied unless procurement is quoted separately",
      "Anti-static internal packaging; export carton with shock padding",
      "Thermal pads and fan module pre-installed per slot layout",
    ],
    warrantySpareParts: [
      "12 months on chassis, PSU, fans, and USB harness for manufacturing defects",
      "Spare thermal pads and fan modules available",
      "Motherboard damage from improper client installation is not covered",
    ],
  },
  "android-phone-farm": {
    suitableFor: [
      "Engineering teams proving device farm hardware requirements before a 20-node purchase",
      "Small QA labs with 4–8 Android devices",
      "Training environments for QA automation staff",
      "Contractor pilots with a clear upgrade path to Enterprise Phone Farm Box",
    ],
    notSuitableFor: [
      "Production labs already running 15+ devices — go directly to 20-node systems",
      "iOS testing workloads",
      "Buyers expecting rackmount form factor",
      "Large-scale ad verification fleets — insufficient slot density",
    ],
    requiredBeforeQuote: [
      "Approximate device count (4–8 typical)",
      "Android phone models or approximate dimensions",
      "Whether upgrade to 20-node box is planned within 6–12 months",
      "Destination country",
    ],
    typicalLeadTime:
      "In-stock compact chassis: 3–5 business days. Custom slot spacing: 5–7 business days.",
    packingShipping: [
      "Lightweight single-carton shipment suitable for express courier",
      "Quick-start guide included; remote setup service available as add-on",
      "Client supplies phones unless quoted otherwise",
    ],
    warrantySpareParts: [
      "12 months on chassis and power adapter for manufacturing defects",
      "Upgrade path to larger systems — retain power/USB concepts where compatible",
      "Replacement USB host cable available",
    ],
  },
  "remote-control-setup": {
    suitableFor: [
      "Labs receiving new Max Phones Farm hardware and needing ADB path verification",
      "QA teams onboarding to multi-device management from one workstation",
      "Engineering groups rolling out batch APK deployment to a device fleet",
      "Remote handover when client engineers are overseas and hardware ships from Guangzhou",
    ],
    notSuitableFor: [
      "Hardware procurement — this is an engineering service, not a chassis",
      "Full managed operations or 24/7 NOC staffing",
      "Software licensing procurement — client retains license ownership unless quoted",
      "Third-party chassis without compatibility review — fit not guaranteed",
    ],
    requiredBeforeQuote: [
      "Hardware model purchased (or photos/specs of third-party chassis)",
      "Device count per session (standard session covers up to 20 devices)",
      "Control workstation OS (Windows / macOS / Linux)",
      "Tools already licensed (scrcpy, commercial device lab platforms, etc.)",
    ],
    typicalLeadTime:
      "Scheduled 1–2 business days after hardware delivery or parallel with on-site install. Bulk multi-rack projects quoted separately.",
    packingShipping: [
      "Deliverable is remote configuration plus documentation — no physical shipment for the service itself",
      "Video handover session included; timezone coordination required (UTC+8 base)",
      "Configuration notes delivered as PDF / shared doc after session",
    ],
    warrantySpareParts: [
      "Service covers configuration as scoped in quote — not ongoing software support unless retainer quoted",
      "Re-configuration after client OS reinstall available as a follow-up service",
      "Hardware defects discovered during setup are escalated to chassis warranty process",
    ],
  },
};

export function getProductQuoteGuide(slug: string): ProductQuoteGuide | null {
  return PRODUCT_QUOTE_GUIDES[slug] ?? null;
}
