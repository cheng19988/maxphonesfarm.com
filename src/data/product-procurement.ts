/** B2B procurement facts — rendered server-side on every product detail page. */
export type ProductProcurement = {
  moq: string;
  leadTime: string;
  packingSize: string;
  grossWeight: string;
  voltage: string;
  warranty: string;
  shippingMethod: string;
  paymentProcess: string;
};

const DEFAULT_HARDWARE: ProductProcurement = {
  moq: "1 unit (standard models)",
  leadTime: "In stock: 3–5 business days from Guangzhou; custom layout: 7–15 business days after spec sign-off",
  packingSize: "Foam-lined export carton (dimensions quoted per SKU on pro-forma)",
  grossWeight: "Quoted on pro-forma after device model confirmation",
  voltage: "110–240V AC, 50/60 Hz (centralized PSU included on complete systems)",
  warranty: "12 months on chassis, PSU, fans, and USB backplane — manufacturing defects under normal lab use",
  shippingMethod: "Express courier (DHL/FedEx/UPS) or sea freight; DDU/DDP quoted per destination",
  paymentProcess: "Written quote → pro-forma invoice → T/T, Wise, or PayPal (USDT on request when agreed) → assembly & QC → shipment",
};

export const PRODUCT_PROCUREMENT: Record<string, ProductProcurement> = {
  "custom-cabinet": {
    moq: "1 unit",
    leadTime: "In stock 2U / 20-slot: 3–5 business days; custom slot layout: 7–15 business days",
    packingSize: "Approx. 55 × 50 × 25 cm export carton (rack ears inside)",
    grossWeight: "Approx. 14–22 kg packed (chassis only; devices client-supplied unless quoted)",
    voltage: "110–240V AC, 50/60 Hz — centralized PSU sized per device list",
    warranty: "12 months on chassis, PSU, fan module, USB backplane, and mounting ears",
    shippingMethod: "Express air 3–7 days transit or sea freight 15–30 days from Guangzhou",
    paymentProcess: "Quote with fit check → pro-forma → T/T / Wise / PayPal (USDT on request) → 72h burn-in → export packing → ship",
  },
  "phone-farm-box": {
    moq: "1 unit",
    leadTime: "In stock: 3–5 business days; custom slot spacing: 7–15 business days",
    packingSize: "Approx. 48 × 32 × 18 cm single export carton",
    grossWeight: "Approx. 10–16 kg packed (8–12 kg chassis before phones)",
    voltage: "110–240V AC, 50/60 Hz — integrated PSU",
    warranty: "12 months on chassis, integrated PSU, and fan module",
    shippingMethod: "Express courier or sea freight — weight quoted on commercial invoice",
    paymentProcess: "Quote → pro-forma → T/T / Wise / PayPal → factory QC → foam carton export",
  },
  "real-device-phone-farm": {
    moq: "Project quote (typically 2+ chassis)",
    leadTime: "Staged delivery per project plan — first units often 10–20 business days after sign-off",
    packingSize: "Palletized or multi-carton — dimensions per rack layout on pro-forma",
    grossWeight: "Quoted per chassis count and packing method",
    voltage: "Per-chassis 110–240V AC; rack power budget documented in project scope",
    warranty: "12 months per chassis module; project SLA on spare parts quoted separately",
    shippingMethod: "Sea freight typical for multi-rack; express available for pilot units",
    paymentProcess: "Project scope → milestone pro-forma schedule → staged production & shipment",
  },
  "motherboard-box": {
    moq: "1 unit",
    leadTime: "7–15 business days after motherboard fit check",
    packingSize: "Approx. 48 × 32 × 16 cm export carton",
    grossWeight: "Approx. 9–14 kg packed (chassis + PSU, boards client-supplied)",
    voltage: "110–240V AC — industrial PSU approx. 550W class (config dependent)",
    warranty: "12 months on chassis, PSU, fans, and USB harness",
    shippingMethod: "Express air from Guangzhou; anti-static internal packaging",
    paymentProcess: "Fit check → quote → pro-forma → payment → assembly → burn-in → ship",
  },
  "android-phone-farm": {
    moq: "1 unit",
    leadTime: "In stock: 3–5 business days",
    packingSize: "Approx. 35 × 28 × 15 cm compact carton",
    grossWeight: "Approx. 4–7 kg packed",
    voltage: "110–240V AC, 50/60 Hz",
    warranty: "12 months on chassis and power adapter",
    shippingMethod: "Express courier recommended for pilot units",
    paymentProcess: "Quote → pro-forma → payment → QC → single-carton export",
  },
  "iphone-phone-farm": {
    moq: "1 unit (fit confirmed per iPhone model list)",
    leadTime: "7–15 business days after model fit sign-off",
    packingSize: "Quoted per slot count and chassis depth",
    grossWeight: "Quoted after iPhone model and slot layout confirmed",
    voltage: "110–240V AC — charging budget sized per iPhone generation",
    warranty: "12 months on chassis and power distribution; client-supplied iPhones excluded",
    shippingMethod: "Express air typical; sea for bulk iOS lab projects",
    paymentProcess: "Model list → fit check → quote → pro-forma → build → ship",
  },
  "empty-box-chassis": {
    moq: "1 unit",
    leadTime: "5–10 business days",
    packingSize: "Approx. 50 × 35 × 12 cm flat-pack style carton",
    grossWeight: "Approx. 6–9 kg packed (shell and rails only)",
    voltage: "N/A — bare chassis (PSU quoted separately)",
    warranty: "12 months on shell and mounting rails; no coverage on unconfigured internals",
    shippingMethod: "Express courier; economical single-carton export",
    paymentProcess: "Quote → pro-forma → payment → ship shell; full build quoted separately",
  },
  "power-supply-solution": {
    moq: "1 module",
    leadTime: "3–7 business days after draw specification",
    packingSize: "Approx. 30 × 20 × 12 cm module carton",
    grossWeight: "Approx. 2–4 kg depending on output configuration",
    voltage: "Input 110–240V AC; outputs quoted per slot count and device draw",
    warranty: "12 months on PSU module — manufacturing defects",
    shippingMethod: "Express courier; compatible with chassis spare-part shipments",
    paymentProcess: "Share device draw → quote module → pro-forma → ship",
  },
  "usb-hub": {
    moq: "1 backplane module",
    leadTime: "3–7 business days",
    packingSize: "Approx. 28 × 22 × 8 cm anti-static box",
    grossWeight: "Approx. 0.5–1.5 kg",
    voltage: "Powered from chassis PSU (no separate mains)",
    warranty: "12 months on backplane board and internal cabling kit",
    shippingMethod: "Express courier as spare part or upgrade shipment",
    paymentProcess: "Quote with chassis model → pro-forma → payment → ship",
  },
  "cooling-solution": {
    moq: "1 fan module",
    leadTime: "3–5 business days",
    packingSize: "Approx. 25 × 20 × 10 cm",
    grossWeight: "Approx. 0.8–1.2 kg",
    voltage: "Powered from chassis PSU",
    warranty: "12 months on fan module assembly",
    shippingMethod: "Express courier — often bundled as spare with chassis orders",
    paymentProcess: "Quote part number → pro-forma → payment → ship",
  },
  "network-equipment": {
    moq: "1 kit (switch model quoted per lab size)",
    leadTime: "5–10 business days",
    packingSize: "Retail switch carton + VLAN guide document",
    grossWeight: "Approx. 2–5 kg depending on switch model",
    voltage: "110–240V AC per switch manufacturer spec",
    warranty: "12 months per switch vendor warranty; VLAN guide from Max Phones Farm",
    shippingMethod: "Express courier with chassis orders or standalone accessory ship",
    paymentProcess: "Lab port count → switch quote → pro-forma → ship",
  },
  "remote-control-setup": {
    moq: "1 session (up to 20 devices)",
    leadTime: "Scheduled 1–2 business days after hardware delivery or parallel with install",
    packingSize: "N/A — engineering service (documentation delivered digitally)",
    grossWeight: "N/A — service only",
    voltage: "N/A — service only",
    warranty: "30-day follow-up on configuration delivered; hardware warranty separate",
    shippingMethod: "N/A — remote video handover (UTC+8 business hours)",
    paymentProcess: "Book with hardware quote → service fee on pro-forma → scheduled handover session",
  },
};

export function getProductProcurement(slug: string): ProductProcurement {
  return PRODUCT_PROCUREMENT[slug] ?? DEFAULT_HARDWARE;
}
