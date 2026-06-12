/** Buyer pre-sales questions — dimensions, power, models, warranty, shipping photos, remote install. */
export const BUYER_SPEC_FAQ = [
  {
    question: "What are the chassis dimensions?",
    answer:
      "Enterprise Phone Farm Box (standalone): approx. 43 × 28 × 9 cm (W × D × H), config dependent. Rackmount Phone Farm +20: standard 19\" rack width (482 mm), 2U height (88 mm), depth approx. 45–50 cm. Motherboard Box: approx. 43.5 × 27.5 × 9 cm. Custom slot spacing is quoted against your device list — share phone or board dimensions for a fit check before production.",
  },
  {
    question: "How much does a phone farm chassis weigh?",
    answer:
      "Enterprise Phone Farm Box: approx. 8–12 kg for the chassis, PSU, and fans before your phones are installed. Rackmount +20: approx. 10–14 kg empty chassis. Final packed weight depends on whether devices are client-supplied or quoted separately — express freight is quoted on actual carton weight from Guangzhou.",
  },
  {
    question: "What is the power consumption and voltage?",
    answer:
      "Mains input is 110–240V AC, 50/60 Hz on all complete systems. Typical continuous draw at full 20-node load is approx. 180–450W depending on device type — screenless motherboard nodes run lower; full phones with radios active run higher. We size the centralized PSU per your device list during quoting. Share target models so we include a power budget on your written quote.",
  },
  {
    question: "Which phone models are supported?",
    answer:
      "We do not publish a fixed universal list because slot rails and USB routing are matched to your SKU. Standard chassis target mid-size Android phones and screenless motherboard boards. Commonly quoted fits include Samsung Galaxy A series, Redmi Note / POCO class devices, and compact Android boards — iPhone arrays use a separate iOS chassis. Send your exact model names and we confirm fit before build. MOQ is one unit so you can validate hardware with your devices.",
  },
  {
    question: "How many phone farm boxes can one computer control?",
    answer:
      "Each chassis uses one USB uplink to your control PC and manages up to 20 nodes per box. One workstation can run multiple boxes when it has enough independent USB 3.0 root controllers — typical engineering PCs handle 1–4 chassis (20–80 phones) with a powered USB topology we document during Remote Control Setup. Scaling beyond that usually means multiple control PCs or a server-style multi-rack plan — see Server-Style Device Farm packages.",
  },
  {
    question: "What is the delivery lead time?",
    answer:
      "In-stock standard models: 3–5 business days from Guangzhou after quote confirmation and payment. Custom slot layout or non-standard device fit: 7–15 business days after specification sign-off. Multi-rack projects are staged per agreed schedule. Express courier is typically 3–7 days transit; sea freight 15–30 days depending on destination.",
  },
  {
    question: "How is the hardware packed for international shipping?",
    answer:
      "Each unit is burn-in tested, then packed in foam-lined export cartons with corner protection. We include a commercial invoice and packing list for customs. Rackmount units ship with mounting ears; bulk orders can be palletized. Express (DHL / FedEx / UPS) or sea freight is quoted per destination weight and incoterms (DDU or DDP).",
  },
  {
    question: "How long is the warranty?",
    answer:
      "Chassis, centralized PSU, fan modules, and USB backplane carry 12 months support for manufacturing defects under normal lab use. Client-supplied phones and motherboard boards are not covered under chassis warranty. Spare fan and PSU modules are available — request part numbers at order stage.",
  },
  {
    question: "What if something breaks or fails after delivery?",
    answer:
      "Contact us on WhatsApp or Telegram with your order reference and photos or video of the issue. Manufacturing defects within 12 months are reviewed for repair guidance, spare-part shipment, or replacement of the affected module (fan, PSU, USB harness). Unauthorized modifications, misuse, and normal connector wear are excluded. Remote troubleshooting is typically answered within one business day (UTC+8).",
  },
  {
    question: "Can you send photos or video before shipment?",
    answer:
      "Yes. On request we share pre-shipment photos or a short video of your unit after factory burn-in and before the export carton is sealed — useful for enterprise procurement and remote teams. Ask your sales contact when confirming the quote or before we book freight.",
  },
  {
    question: "Do you offer remote installation or setup?",
    answer:
      "Yes. Remote Control Setup Service includes a video handover session: ADB path verification, screen mirroring, batch APK workflow, and device grouping for up to 20 nodes per session. Delivery workflow step 7 covers optional post-delivery remote setup. Bulk multi-rack projects quote extended support separately.",
  },
] as const;
