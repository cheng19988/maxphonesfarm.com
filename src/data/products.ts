import { IMAGES } from "@/lib/images";

export type ProductGroupId = "complete-systems" | "core-hardware" | "accessories";

export type ProductSeed = {
  slug: string;
  name: string;
  group: ProductGroupId;
  category: string;
  shortDesc: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  scenarios: string[];
  accessories: string[];
  delivery: string[];
  maintenance: string[];
  faq: { q: string; a: string }[];
  priceUsd: number;
  stock: number;
  imageCard: string;
  imageHero: string;
  imageDetail: string;
  flagship?: boolean;
};

export const PRODUCT_GROUPS: { id: ProductGroupId; label: string; description: string }[] = [
  {
    id: "complete-systems",
    label: "Complete Systems",
    description:
      "Ready-to-deploy phone farm hardware systems for rack, box, and multi-device lab setups — integrated power, cooling, and USB control.",
  },
  {
    id: "core-hardware",
    label: "Core Hardware",
    description:
      "Core device infrastructure for Android/iOS testing, project-isolated lab slots, mobile display QA, and remote device control.",
  },
  {
    id: "accessories",
    label: "Accessories & Deployment Support",
    description:
      "Power, USB, cooling, network, and setup accessories for scaling or customizing a phone farm lab.",
  },
];

export const PRODUCT_SEEDS: ProductSeed[] = [
  {
    slug: "custom-cabinet",
    name: "Rackmount Phone Farm +20",
    group: "complete-systems",
    category: "Complete System",
    shortDesc: "2U rackmount server-style phone farm with 20 slots — screenless, battery-free nodes optional; centralized cooling and USB control.",
    description:
      "Featuring a server-style smartphone chassis for teams that need serious mobile compute power without desk clutter. The Rackmount Phone Farm +20 holds twenty Android phones or motherboard nodes inside a 2U metal enclosure with shared power, front-mounted cooling, and per-slot USB paths to your control workstation. Nodes can be built screenless and battery-free — engineered for efficiency, longevity, and rack integration. Removing displays and accessory load where applicable helps nodes deliver maximum performance with minimal energy consumption. Built to slot into standard 19\" server racks at 2U height, this rackmount phone farm delivers strong compute density per watt while staying cool and organized. Integrated cooling fans and centralized device management support stable 24/7 operation for app testing, automation, sustained mobile compute workloads, and remote Android control. Each unit is assembled and burn-in tested in Guangzhou before export.",
    features: [
      "2U form factor for standard 19\" server racks",
      "20 device slots with individual USB data paths",
      "Centralized PSU — replaces 20 separate chargers",
      "Front intake fans with exhaust routing for 24/7 load",
      "ADB and remote device management compatible",
      "Export-grade packaging and deployment documentation",
    ],
    specs: {
      "Form Factor": "2U rackmount (19\" rack)",
      "Rack Width": "482 mm (19\" standard)",
      "Rack Height": "2U (88 mm)",
      "Chassis Depth": "Approx. 45–50 cm (config dependent)",
      "Weight (chassis only)": "Approx. 10–14 kg before devices installed",
      "Device Slots": "20 nodes",
      "Mains Voltage": "110–240V AC, 50/60 Hz",
      "Typical Power Draw": "Approx. 200–450W at full 20-node load (device dependent)",
      "Cooling": "Active front fans, metal chassis heat spread",
      "Data Control": "USB 2.0/3.0 per slot, hub backplane — 1 USB uplink per chassis",
      "Compatible Devices": "Android phones or motherboard nodes (quoted per model)",
      "Chassis Material": "Industrial steel",
      "Lead Time": "In stock: 3–5 business days; custom node layout: 7–15 days",
    },
    scenarios: [
      "Enterprise app testing lab with rack-scale Android fleet",
      "Mobile display QA and in-app creative preview on real devices",
      "Remote device management for QA and staging environments",
      "Multi-device automation hardware for internal tooling teams",
      "Custom rackmount phone farm for managed lab providers",
    ],
    accessories: [
      "2U rackmount chassis with 20 slots",
      "Centralized power supply unit",
      "USB data backplane and internal cabling",
      "Rack mounting ears",
      "Deployment and wiring guide",
    ],
    delivery: [
      "72-hour factory burn-in before shipment",
      "Foam-lined export carton",
      "Express air or sea freight worldwide",
      "Optional remote control setup service",
    ],
    maintenance: [
      "Clean intake filters every 30 days under continuous load",
      "Verify USB seating monthly",
      "Keep ambient lab temperature below 35°C",
    ],
    faq: [
      {
        q: "Can I mount this in a standard server rack?",
        a: "Yes. The chassis is designed for 19\" racks at 2U height. We supply mounting ears; rail kits can be quoted separately.",
      },
      {
        q: "Which Android models are supported?",
        a: "Slot dimensions and USB routing depend on your target device. Share your phone or motherboard model and we confirm fit before production.",
      },
      {
        q: "Is battery-free operation supported?",
        a: "Yes, on compatible motherboard or phone board configurations. This reduces heat and simplifies long-running lab workloads.",
      },
      {
        q: "Can you send photos before shipment?",
        a: "Yes — on request we share pre-shipment photos or short video after burn-in and before the export carton is sealed.",
      },
      {
        q: "How many rackmount units can one PC control?",
        a: "Each chassis has one USB uplink for up to 20 nodes. Most workstations support 1–4 chassis with proper USB 3.0 root controllers; we document topology during Remote Control Setup.",
      },
      {
        q: "What is a 2U phone farm rack?",
        a: "A 2U phone farm rack is this chassis format — 20 Android nodes in two rack units (88 mm height) of a standard 19-inch cabinet. See our 2U buyer guide at /blog/2u-phone-farm-rack-buyer-guide.",
      },
    ],
    priceUsd: 1899,
    stock: 6,
    imageCard: IMAGES.phoneFarmBox.card,
    imageHero: IMAGES.customCabinet.hero,
    imageDetail: IMAGES.customCabinet.detail,
    flagship: true,
  },
  {
    slug: "phone-farm-box",
    name: "Enterprise Phone Farm Box",
    group: "complete-systems",
    category: "Complete System",
    shortDesc: "The original-style 20-slot phone farm box — standalone mobile compute container with cooling, power, and USB management.",
    description:
      "The Enterprise Phone Farm Box is the original-style phone farm container: a 20-slot smartphone chassis regulated by cooling, with custom motherboard routing and centralized power components. Battery-free and screenless node layouts are available for extended device life, higher performance stability, and optimized multi-device management. Real Android devices mount in a cooled metal enclosure with one power input and a single USB hub path to your control PC — so you run commands from one workstation instead of operating each phone manually. Ideal for app testing labs, device management pilots, QA automation, sustained compute workloads, and teams scaling from a handful of phones to a managed fleet. Factory-assembled in Guangzhou with QC documentation included.",
    features: [
      "20 real-device slots in one enclosure",
      "Integrated cooling and shared power architecture",
      "Single USB uplink to control workstation",
      "Desk, shelf, or optional rack adapter mounting",
      "Compatible with ADB and common device lab tools",
      "Sample and bulk pricing available",
    ],
    specs: {
      "Form Factor": "Standalone box (non-rack)",
      "Device Slots": "20 nodes",
      "Dimensions": "Approx. 43 × 28 × 9 cm (W × D × H, config dependent)",
      "Weight (chassis only)": "Approx. 8–12 kg before devices installed",
      "Mains Voltage": "110–240V AC, 50/60 Hz",
      "Typical Power Draw": "Approx. 180–400W at full 20-node load (device dependent)",
      "Cooling": "Internal fan array",
      "Data Control": "USB hub to host PC — 1 uplink per box, up to 20 nodes",
      "Lead Time": "In stock: 3–5 business days; custom layout: 7–15 days",
    },
    scenarios: [
      "App testing lab with separate device slots per team",
      "QA automation hardware for CI-triggered device runs",
      "Remote Android device control for distributed engineering teams",
      "Pilot deployment before rackmount scale-up",
    ],
    accessories: [
      "20-slot chassis with fans",
      "Power supply and mains cable",
      "USB host cable",
      "Slot mounting hardware",
      "Quick-start deployment guide",
    ],
    delivery: [
      "Factory QC checklist included",
      "Ships within 3–5 business days when in stock",
      "Worldwide express or sea freight",
    ],
    maintenance: [
      "Keep fan vents unobstructed",
      "Label each slot for asset tracking",
      "Rotate devices periodically for even wear on connectors",
    ],
    faq: [
      {
        q: "How is this different from the rackmount +20?",
        a: "Same 20-node capacity, but in a standalone box without 2U rack ears. Choose rackmount for data-center integration; choose this box for bench or shelf labs.",
      },
      {
        q: "Do I need to supply my own phones?",
        a: "Yes — we supply the chassis, power, cooling, and USB infrastructure. Device procurement can be quoted separately on request.",
      },
      {
        q: "Can you send photos before shipment?",
        a: "Yes — pre-shipment photos or video are available on request after QC and before packing.",
      },
      {
        q: "How many boxes can one computer control?",
        a: "One box = 20 phones via one USB cable. A typical control PC runs 1–4 boxes (20–80 phones) depending on USB controller layout — we help size this during setup.",
      },
      {
        q: "Is this a factory-direct phone farm box I can buy online?",
        a: "Yes — we are a Guangzhou factory-direct supplier. Submit a quote at /contact with your device models and country; we reply with USD pricing and export shipping options. MOQ is one unit.",
      },
    ],
    priceUsd: 1399,
    stock: 12,
    imageCard: IMAGES.phoneFarmBox.card,
    imageHero: IMAGES.phoneFarmBox.hero,
    imageDetail: IMAGES.phoneFarmBox.detail,
  },
  {
    slug: "real-device-phone-farm",
    name: "Server-Style Device Farm",
    group: "complete-systems",
    category: "Complete System",
    shortDesc: "Multi-unit device lab package — several phone farm boxes or rackmount modules with shared power and network planning.",
    description:
      "The Server-Style Device Farm is a project-scale package for teams deploying 40–100+ Android devices across multiple chassis. We plan rack layout, power budgeting, USB topology, and network segmentation with your lab team, then assemble and test units in Guangzhou. Mix Rackmount Phone Farm +20 modules with standalone Enterprise Phone Farm Boxes as your floor plan requires. Ideal for enterprise device infrastructure, large QA environments, mobile compute at rack scale, and custom phone farm rollouts that exceed a single 20-node box.",
    features: [
      "Multi-chassis layout design and power budgeting",
      "Coordinated USB and network topology",
      "Mixed rackmount and box configurations available",
      "On-site assembly QC and burn-in per unit",
      "Dedicated project contact via WhatsApp",
      "Export documentation for bulk shipments",
    ],
    specs: {
      "Typical Scale": "40–100+ device nodes",
      "Configuration": "Custom — quoted per project",
      "Rack Planning": "2U modules or standalone boxes",
      "Power": "Per-rack PSU sizing included in design",
      "Network": "Switch and VLAN guidance included",
      "Project Lead Time": "2–4 weeks after specification sign-off",
    },
    scenarios: [
      "Enterprise device infrastructure for app release testing",
      "Large-scale QA automation hardware program",
      "Custom rackmount phone farm for managed service providers",
      "Multi-site lab standardization with identical hardware builds",
    ],
    accessories: [
      "Multiple chassis units per project plan",
      "Power and cabling kit per rack",
      "Network layout document",
      "Asset labeling scheme",
      "Project deployment runbook",
    ],
    delivery: [
      "Staged production with milestone QC reports",
      "Palletized export packing for bulk orders",
      "Optional on-call setup support during rollout",
    ],
    maintenance: [
      "Quarterly fan and filter service schedule provided",
      "Spare PSU and fan modules available on contract",
    ],
    faq: [
      {
        q: "Is there a minimum device count?",
        a: "Projects typically start at 40 nodes. Smaller labs should start with a single Rackmount +20 or Enterprise Phone Farm Box.",
      },
      {
        q: "Do you visit our site for installation?",
        a: "Remote guidance is standard. On-site integration can be quoted for select regions.",
      },
    ],
    priceUsd: 0,
    stock: 10,
    imageCard: IMAGES.realDevice.card,
    imageHero: IMAGES.realDevice.hero,
    imageDetail: IMAGES.realDevice.detail,
  },
  {
    slug: "motherboard-box",
    name: "Motherboard Box — Screenless Array",
    group: "core-hardware",
    category: "Core Hardware",
    shortDesc: "Screenless, battery-free Android motherboard array — up to 20 headless nodes with lower heat and power draw.",
    description:
      "The Motherboard Box is built for screenless, battery-free mobile compute at scale. Up to twenty Android motherboard nodes mount in one cooled enclosure — phones engineered without displays or batteries for efficiency, longevity, and dense lab operation. Removing screens and batteries lowers per-node cost and thermal load while improving power efficiency compared with running full phones under continuous load. Each node keeps USB debugging access for ADB automation, remote Android control, app testing, and server-style workloads where display output is not required. Layout and board model must be confirmed before build — share your target motherboard SKU for a fit check.",
    features: [
      "Screenless, battery-free node option",
      "Up to 20 motherboard slots per chassis",
      "Optimized airflow for dense headless load",
      "Per-node USB debug access",
      "Lower power draw vs full-phone arrays",
      "Compatible with rack adapter or shelf mount",
    ],
    specs: {
      "Node Type": "Android motherboard (screenless)",
      "Capacity": "Up to 20 nodes",
      "Chassis Size": "43.5 × 27.5 × 9 cm",
      "PSU": "Industrial 550W (config dependent)",
      "Cooling": "4-fan internal array",
      "Software Interface": "ADB, scrcpy, group control tools",
      "Mounting": "Shelf or rack adapter (optional)",
    },
    scenarios: [
      "Headless Android app testing at scale",
      "QA automation where UI display is not needed",
      "Cost-optimized device lab expansion",
      "Remote Android device control for backend services",
    ],
    accessories: [
      "Motherboard mounting frames",
      "PSU and internal power harness",
      "USB debug harness per slot",
      "Thermal pads and fan module",
    ],
    delivery: [
      "Board fit confirmed before assembly",
      "7–15 day lead time for custom board layout",
      "Export packaging with shock protection",
    ],
    maintenance: [
      "Inspect board connectors every 60 days",
      "Replace thermal pads when re-seating boards",
    ],
    faq: [
      {
        q: "Do you supply the motherboards?",
        a: "We supply the chassis and integration. Motherboard procurement can be quoted separately based on your target SoC and Android version.",
      },
      {
        q: "Can full phones be used instead?",
        a: "This chassis is optimized for motherboard nodes. For full phones, use the Enterprise Phone Farm Box or Rackmount +20.",
      },
      {
        q: "What is a motherboard phone farm box?",
        a: "A chassis that mounts screenless Android motherboard boards instead of full phones — same phone farm concept with lower power and heat for headless app testing and automation workloads.",
      },
    ],
    priceUsd: 1824,
    stock: 8,
    imageCard: IMAGES.motherboardBox.card,
    imageHero: IMAGES.motherboardBox.hero,
    imageDetail: IMAGES.motherboardBox.detail,
  },
  {
    slug: "android-phone-farm",
    name: "Android Device Lab Starter",
    group: "core-hardware",
    category: "Core Hardware",
    shortDesc: "Compact Android device cluster chassis for small labs — scalable entry point before full 20-node systems.",
    description:
      "The Android Device Lab Starter is a compact classic-style chassis for teams validating workflows on a smaller Android fleet before committing to a full 20-node deployment — the same entry path many labs use before upgrading to an Enterprise Phone Farm Box or rackmount module. It supports a reduced slot count with the same power and USB management principles as our larger boxes. Suitable for startup QA labs, contractor pilots, and engineering teams proving device automation hardware requirements.",
    features: [
      "Compact footprint for bench labs",
      "Shared power and USB management",
      "Upgrade path to 20-node systems",
      "ADB-ready out of box",
      "Low entry price for hardware evaluation",
    ],
    specs: {
      "Platform": "Android phones or boards",
      "Typical Capacity": "4–8 devices (config dependent)",
      "Power Input": "110–240V AC",
      "Cooling": "Single fan module",
      "Data": "USB hub to host",
      "Use Case": "Pilot / evaluation labs",
    },
    scenarios: [
      "Small app testing lab proof-of-concept",
      "Engineering team evaluating device farm hardware",
      "Training environment for QA automation staff",
    ],
    accessories: ["Compact chassis", "Power adapter", "USB host cable", "Mounting stand"],
    delivery: ["Ships in 3–5 business days when in stock"],
    maintenance: ["Standard fan cleaning monthly"],
    faq: [
      {
        q: "Can this be expanded later?",
        a: "Yes. Many clients start here and move to the Enterprise Phone Farm Box or Rackmount +20 once device count grows.",
      },
    ],
    priceUsd: 159,
    stock: 18,
    imageCard: IMAGES.androidFarm.card,
    imageHero: IMAGES.androidFarm.hero,
    imageDetail: IMAGES.androidFarm.detail,
  },
  {
    slug: "iphone-phone-farm",
    name: "iPhone Device Lab Array",
    group: "core-hardware",
    category: "Core Hardware",
    shortDesc: "Real iPhone hardware array with centralized charging and USB-C/Lightning hub routing for iOS QA labs.",
    description:
      "The iOS Device Lab Array organizes real iPhones in a cooled chassis with shared charging and hub connectivity to a macOS control station. Built for TestFlight validation, iOS app QA, enterprise device management workflows, and cross-platform labs that run Android rackmount modules alongside dedicated Apple hardware — not simulators.",
    features: [
      "Real iPhone hardware slots",
      "Centralized charging management",
      "Lightning / USB-C hub integration",
      "macOS control station compatible",
      "Cooled enclosure for continuous test runs",
    ],
    specs: {
      "Platform": "iPhone (model confirmed at quote)",
      "Capacity": "10–20 devices per chassis",
      "Control Host": "macOS recommended",
      "Connectivity": "Lightning or USB-C hub",
      "Network": "Dedicated lab VLAN recommended",
      "Lead Time": "7–15 days (device slot layout confirmed)",
    },
    scenarios: [
      "iOS app QA and TestFlight staging",
      "Enterprise mobile device management testing",
      "Cross-platform lab alongside Android racks",
    ],
    accessories: ["iOS chassis", "Hub module", "Power distribution", "Cable management kit"],
    delivery: ["Device model fit confirmed before build", "Export packaging included"],
    maintenance: ["Use MFi-certified cables where applicable", "Monitor battery health on long-run devices"],
    faq: [
      {
        q: "Do you provide Mac control stations?",
        a: "We supply the iPhone hardware chassis. Mac mini or Mac Studio procurement can be quoted as an add-on.",
      },
    ],
    priceUsd: 1280,
    stock: 5,
    imageCard: IMAGES.iphoneFarm.card,
    imageHero: IMAGES.iphoneFarm.hero,
    imageDetail: IMAGES.iphoneFarm.detail,
  },
  {
    slug: "empty-box-chassis",
    name: "Empty Expansion Chassis",
    group: "core-hardware",
    category: "Core Hardware",
    shortDesc: "Bare expansion chassis for custom slot layouts, reverse-mount builds, and integrator phone farm projects.",
    description:
      "The Empty Expansion Chassis is a bare industrial phone farm shell for custom slot layouts, fleet expansion, and reverse-mount configurations — the flexible counterpart to our fixed 20-slot boxes. Ship as an empty metal enclosure with mounting rails and ventilation cutouts ready for your integrator or our Guangzhou team to configure with PSU, fans, and USB backplane modules. Use it to prototype unique device models, expand an existing lab, or build project-specific mobile compute racks.",
    features: [
      "Bare chassis — custom slot configuration",
      "Compatible with Max Phones Farm power modules",
      "Expansion for existing deployments",
      "Integrator-friendly mounting rails",
    ],
    specs: {
      "Form Factor": "Box chassis (empty)",
      "Slots": "Unconfigured — custom layout",
      "Material": "Industrial steel",
      "Includes": "Shell, rails, basic ventilation cutouts",
      "Excludes": "PSU, fans, USB backplane (quoted separately)",
    },
    scenarios: ["Fleet expansion", "Custom integrator builds", "Prototype slot layouts"],
    accessories: ["Empty chassis shell", "Mounting rail set"],
    delivery: ["5–10 business days"],
    maintenance: ["Configure before continuous 24/7 load"],
    faq: [
      {
        q: "Can you configure it for us?",
        a: "Yes. Share device models and slot count — we quote a complete build with PSU, fans, and USB backplane.",
      },
    ],
    priceUsd: 179,
    stock: 22,
    imageCard: IMAGES.emptyBox.card,
    imageHero: IMAGES.emptyBox.hero,
    imageDetail: IMAGES.emptyBox.detail,
  },
  {
    slug: "power-supply-solution",
    name: "Centralized Power Module",
    group: "accessories",
    category: "Accessory",
    shortDesc: "Centralized charging and power module — replaces multiple individual phone chargers in phone farm labs.",
    description:
      "The Centralized Power Module functions as the charging and power hub for phone farm chassis — the lab equivalent of a multi-device charging station. It provides regulated multi-output power sized for your slot count and device draw, replacing a clutter of individual phone chargers with one industrial PSU. Include your deployment diagram when requesting a quote so we match voltage, connector, and load requirements for 20-node boxes and rackmount systems.",
    features: [
      "Multi-output regulated power",
      "Sized for phone farm chassis loads",
      "Replacement module for existing boxes",
      "110–240V input options",
    ],
    specs: {
      Type: "Centralized PSU module",
      Output: "Quoted per slot count and device draw",
      Input: "110–240V AC",
      Compatibility: "Max Phones Farm chassis series",
      "Standalone Use": "No — requires matching chassis",
    },
    scenarios: ["PSU replacement", "Lab power upgrade", "Custom chassis integration"],
    accessories: ["PSU module", "Output harness (config dependent)"],
    delivery: ["3–7 business days"],
    maintenance: ["Do not exceed rated load — confirm draw at quote stage"],
    faq: [
      {
        q: "Will this work with any server rack?",
        a: "This module is designed for our phone farm chassis form factors, not general 1U server power shelves.",
      },
    ],
    priceUsd: 149,
    stock: 35,
    imageCard: IMAGES.power.card,
    imageHero: IMAGES.power.hero,
    imageDetail: IMAGES.power.detail,
  },
  {
    slug: "usb-hub",
    name: "USB Backplane Module",
    group: "accessories",
    category: "Accessory",
    shortDesc: "Industrial USB hub backplane for stable per-slot data paths in dense device lab chassis.",
    description:
      "The USB Backplane Module adds or replaces the internal USB routing layer in a phone farm chassis. Each slot gets a dedicated path to the host controller — critical for reliable ADB sessions, remote Android control, and batch APK deployment in dense 20-node labs. Use as a replacement part, thermal-event recovery upgrade, or integrator build component alongside our Empty Expansion Chassis.",
    features: [
      "Per-slot USB routing",
      "Industrial-grade hub IC",
      "Replacement or upgrade for existing chassis",
      "ADB and device lab tool compatible",
    ],
    specs: {
      Type: "Internal USB backplane",
      Ports: "Quoted per slot count (typically 10–20)",
      Standard: "USB 2.0 / 3.0 mix (config dependent)",
      Compatibility: "Max Phones Farm chassis",
    },
    scenarios: ["USB reliability upgrade", "Chassis repair", "Custom integrator builds"],
    accessories: ["Hub backplane board", "Internal USB cabling kit"],
    delivery: ["3–7 business days"],
    maintenance: ["Secure cables to avoid slot strain"],
    faq: [
      {
        q: "Is this a desktop USB hub?",
        a: "No. This is an internal backplane module designed to mount inside our chassis enclosures.",
      },
    ],
    priceUsd: 89,
    stock: 50,
    imageCard: IMAGES.usbHub.card,
    imageHero: IMAGES.usbHub.hero,
    imageDetail: IMAGES.usbHub.detail,
  },
  {
    slug: "cooling-solution",
    name: "Active Cooling Module",
    group: "accessories",
    category: "Accessory",
    shortDesc: "Replacement fan module for dense 24/7 device lab chassis — maintains airflow under continuous QA load.",
    description:
      "The Active Cooling Module is a drop-in fan assembly for Max Phones Farm chassis running continuous app testing, sustained compute load, or remote device management. Maintains front-to-rear airflow under 24/7 load — use as a spare, seasonal upgrade when ambient lab temperatures rise, or stock part for enterprise multi-rack deployments.",
    features: [
      "Drop-in fan assembly",
      "Replacement part for existing chassis",
      "Optimized for 20-node thermal load",
      "Low-noise bearing fans",
    ],
    specs: {
      Type: "Fan module assembly",
      Compatibility: "Max Phones Farm box and rackmount series",
      Fans: "Typically 2–4 units per module",
      Power: "Draws from chassis PSU",
    },
    scenarios: ["Fan replacement", "Thermal upgrade", "Spare parts stocking"],
    accessories: ["Fan module", "Mounting screws"],
    delivery: ["3–5 business days"],
    maintenance: ["Clean filters monthly in dusty environments"],
    faq: [
      {
        q: "Can I use this without your chassis?",
        a: "It is designed for our enclosure mounting points. Third-party fit is not guaranteed.",
      },
    ],
    priceUsd: 149,
    stock: 40,
    imageCard: IMAGES.cooling.card,
    imageHero: IMAGES.cooling.hero,
    imageDetail: IMAGES.cooling.detail,
  },
  {
    slug: "network-equipment",
    name: "Lab Network Switch Kit",
    group: "accessories",
    category: "Accessory",
    shortDesc: "Managed switch kit recommended for multi-device labs — VLAN guidance for device traffic separation.",
    description:
      "The Lab Network Switch Kit is a reference networking package for device labs running many Android nodes across one or more phone farm boxes. We recommend managed switches with VLAN capability so test traffic, ADB management, and office networks stay separated — essential for multi-team QA labs. Exact switch model depends on port count and region — quoted per deployment.",
    features: [
      "Managed switch recommendation per lab size",
      "VLAN layout guidance document",
      "Compatible with multi-chassis deployments",
      "Optional rack-mount ears",
    ],
    specs: {
      Type: "Managed Ethernet switch (model quoted)",
      Ports: "24–48 port options typical",
      Features: "VLAN, gigabit, rack-mount option",
      Scope: "Networking accessory — not a phone farm chassis",
    },
    scenarios: ["Lab network segmentation", "Multi-rack device infrastructure", "Enterprise QA environment setup"],
    accessories: ["Switch unit (model quoted)", "VLAN setup guide"],
    delivery: ["5–10 business days"],
    maintenance: ["Firmware updates per vendor schedule"],
    faq: [
      {
        q: "Is Wi-Fi included?",
        a: "Wired lab networking is standard. Wi-Fi APs can be quoted separately if required for specific test cases.",
      },
    ],
    priceUsd: 150,
    stock: 30,
    imageCard: IMAGES.network.card,
    imageHero: IMAGES.network.hero,
    imageDetail: IMAGES.network.detail,
  },
  {
    slug: "remote-control-setup",
    name: "Remote Control Setup Service",
    group: "accessories",
    category: "Deployment Support",
    shortDesc: "Installation and remote control setup — manage all devices from one computer with ADB, mirroring, and batch APK deploy.",
    description:
      "Remote Control Setup is our installation and handover service — the hardware lab equivalent of centralized device control software. Our Guangzhou engineering team configures your workstation so you manage every phone from one computer: ADB paths, screen mirroring, batch APK deployment, and device grouping for QA and automation teams. Instead of manually operating each device, operators run commands and installs from a single control desk. Available for Max Phones Farm hardware or third-party chassis after compatibility review.",
    features: [
      "ADB and device path verification",
      "Screen mirroring workstation setup",
      "Batch APK install workflow",
      "Device grouping for QA teams",
      "Remote handover session via video call",
    ],
    specs: {
      Type: "Engineering service (not hardware)",
      Duration: "Typically 1–2 business days remote",
      Scope: "Up to 20 devices per session; bulk quoted",
      Deliverable: "Configured workstation + documentation",
    },
    scenarios: [
      "New lab hardware handover",
      "QA team onboarding to device farm",
      "Remote Android device control rollout",
    ],
    accessories: ["Configuration documentation", "Tooling checklist"],
    delivery: ["Scheduled after hardware delivery or parallel with install"],
    maintenance: ["Optional support retainer quoted separately"],
    faq: [
      {
        q: "Is software license included?",
        a: "We configure commonly used open-source and commercial tools you already license. Software procurement is client responsibility unless quoted.",
      },
    ],
    priceUsd: 350,
    stock: 99,
    imageCard: IMAGES.usbHub.card,
    imageHero: IMAGES.remoteControl.hero,
    imageDetail: IMAGES.remoteControl.detail,
  },
];

export function getProductSeed(slug: string) {
  return PRODUCT_SEEDS.find((p) => p.slug === slug);
}

export function getProductsByGroup(group: ProductGroupId) {
  return PRODUCT_SEEDS.filter((p) => p.group === group);
}

export function getFlagshipProduct() {
  return PRODUCT_SEEDS.find((p) => p.flagship) ?? PRODUCT_SEEDS[0];
}
