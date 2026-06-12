/** Keyword-rich SEO titles and descriptions per product slug — URLs unchanged. */
export type ProductSeo = {
  metaTitle: string;
  metaDescription: string;
  /** Visible keyword line under H1 — supplements, does not replace product name. */
  keywordLine: string;
};

export const PRODUCT_SEO: Record<string, ProductSeo> = {
  "custom-cabinet": {
    metaTitle: "2U Rackmount Phone Farm +20 — 20-Slot Server Rack Chassis",
    metaDescription:
      "Factory-direct 2U rackmount phone farm with 20 Android slots — centralized PSU, active cooling, export from Guangzhou. MOQ 1 unit. Request a rack quote.",
    keywordLine: "2U phone farm rack · rackmount phone farm box · buy rackmount phone farm",
  },
  "phone-farm-box": {
    metaTitle: "Enterprise Phone Farm Box — 20-Slot Original Factory Direct",
    metaDescription:
      "Buy a phone farm box factory-direct — original 20-node chassis with cooling, power, and USB control from one PC. Guangzhou export, MOQ 1, worldwide shipping.",
    keywordLine: "Phone farm box · buy phone farm box · original 20-slot device lab hardware",
  },
  "real-device-phone-farm": {
    metaTitle: "Server-Style Device Farm — Multi-Rack Phone Farm Wholesale",
    metaDescription:
      "Multi-rack phone farm hardware for 40–100+ nodes — staged delivery, palletized export, power and network planning from a Guangzhou factory. Project quote.",
    keywordLine: "Mobile device farm · phone farm wholesale · enterprise device farm hardware",
  },
  "motherboard-box": {
    metaTitle: "Motherboard Phone Farm Box — Screenless 20-Node Array",
    metaDescription:
      "Motherboard phone farm box for screenless, battery-free Android nodes — lower heat and power for continuous app testing and automation. Factory-direct MOQ 1.",
    keywordLine: "Motherboard phone farm box · screenless phone farm · headless Android array",
  },
  "android-phone-farm": {
    metaTitle: "Android Phone Farm Starter — Compact Device Lab Hardware",
    metaDescription:
      "Android phone farm hardware for pilot labs — compact chassis before a full 20-node rollout. Factory-direct from Guangzhou, MOQ 1, express export available.",
    keywordLine: "Android phone farm · Android device farm hardware · lab starter chassis",
  },
  "iphone-phone-farm": {
    metaTitle: "iPhone Device Lab Array — iOS Phone Farm Hardware",
    metaDescription:
      "Physical iPhone device lab hardware — slot layout matched to your model list. Separate from Android chassis. Fit check, export packing, Guangzhou assembly.",
    keywordLine: "iOS device lab · iPhone testing hardware · real-device iOS array",
  },
  "empty-box-chassis": {
    metaTitle: "Custom Phone Farm Box Shell — Empty Expansion Chassis",
    metaDescription:
      "Empty phone farm chassis for custom builds and integrators — reverse-mount expansion shell quoted with your device models. Factory-direct Guangzhou export.",
    keywordLine: "Custom phone farm box · empty chassis · integrator expansion shell",
  },
  "power-supply-solution": {
    metaTitle: "Phone Farm Charging Station — Centralized Power Module",
    metaDescription:
      "Centralized power module for phone farm boxes and rackmount chassis — replaces individual chargers, sized per slot count and device draw. Spare or upgrade module.",
    keywordLine: "Phone farm charging station · centralized PSU · phone farm power supply",
  },
  "usb-hub": {
    metaTitle: "Phone Farm USB Backplane — Multi-Device Data Module",
    metaDescription:
      "USB backplane module for phone farm chassis — stable data paths for ADB, batch APK, and remote device control. Compatible with Max Phones Farm systems.",
    keywordLine: "Phone farm USB hub · device farm backplane · ADB data routing",
  },
  "cooling-solution": {
    metaTitle: "Phone Farm Cooling Module — Active Fan Array",
    metaDescription:
      "Active cooling module for continuous 20-node phone farm load — spare or upgrade fan assembly for rackmount and standalone chassis.",
    keywordLine: "Phone farm cooling · active fan module · 24/7 device lab thermal",
  },
  "network-equipment": {
    metaTitle: "Device Lab Network Kit — VLAN Switch for Phone Farms",
    metaDescription:
      "Lab network switch kit with VLAN planning notes for multi-node phone farm deployments — isolate QA traffic on physical device arrays.",
    keywordLine: "Device lab network · phone farm VLAN · multi-device lab switching",
  },
  "remote-control-setup": {
    metaTitle: "Phone Farm Remote Setup — ADB & Group Control Service",
    metaDescription:
      "Remote setup service for phone farm boxes — video handover, ADB paths, screen mirroring, batch APK, and device grouping for up to 20 nodes per session.",
    keywordLine: "Phone farm box with remote setup · group control · ADB handover service",
  },
};

export function getProductSeo(slug: string): ProductSeo | null {
  return PRODUCT_SEO[slug] ?? null;
}
