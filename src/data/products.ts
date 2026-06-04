import { IMAGES } from "@/lib/images";

export type ProductSeed = {
  slug: string;
  name: string;
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
};

function p(
  slug: string,
  name: string,
  category: string,
  shortDesc: string,
  imgs: { card: string; hero: string; detail: string },
  priceUsd: number,
  stock: number,
  extra?: Partial<ProductSeed>
): ProductSeed {
  return {
    slug,
    name,
    category,
    shortDesc,
    description:
      extra?.description ||
      `${name} from Max Phones Farm — enterprise real-device hardware engineered in Guangzhou since 2017. Server-style chassis with centralized power, cooling, and professional deployment support.`,
    features: extra?.features || [
      "Enterprise-grade metal chassis — 2U rack compatible",
      "Real physical devices — not cloud or emulator",
      "Centralized power and active cooling",
      "Remote control and group control compatible",
      "QC tested before international shipment",
    ],
    specs: extra?.specs || {
      "Form Factor": "2U server-style chassis",
      "Device Capacity": "Up to 20 nodes per unit",
      "Power Supply": "450–550W centralized PSU",
      "Cooling": "Integrated multi-fan airflow",
      "Connectivity": "USB 2.0/3.0 + OTG",
      "Rack Mount": "Standard 19\" rack compatible",
      "Shell Material": "Industrial metal",
      "Warranty": "12 months hardware support",
    },
    scenarios: extra?.scenarios || [
      "Enterprise app testing and QA automation",
      "Server-style device farm deployment",
      "Large-scale real-device automation",
      "Agency and studio multi-device workflows",
    ],
    accessories: extra?.accessories || [
      "Industrial chassis unit",
      "Power cable (region-specific)",
      "USB data cables",
      "Deployment documentation",
    ],
    delivery: extra?.delivery || [
      "Factory QC and burn-in test",
      "Export-grade packaging",
      "Express / sea freight worldwide",
      "Remote setup support available",
    ],
    maintenance: extra?.maintenance || [
      "Clean fan filters every 30 days",
      "Verify USB connections monthly",
      "Maintain ambient temp below 35°C",
      "Contact support for firmware guidance",
    ],
    faq: extra?.faq || [
      {
        q: "Is this real device hardware?",
        a: "Yes. Max Phones Farm products use physical smartphones or motherboards — not cloud phones or emulators.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes. We ship worldwide from Guangzhou with express and sea freight options for enterprise clients.",
      },
    ],
    priceUsd,
    stock,
    imageCard: imgs.card,
    imageHero: imgs.hero,
    imageDetail: imgs.detail,
  };
}

export const PRODUCT_SEEDS: ProductSeed[] = [
  p(
    "custom-cabinet",
    "Rackmount Phone Farm +20",
    "Rackmount",
    "Server-style 2U rackmount box for 20 real devices — enterprise mobile compute without clutter.",
    IMAGES.customCabinet,
    1899,
    6,
    {
      description:
        "Featuring a server-style smartphone box designed for teams that need serious mobile compute power without clutter. Configurable with screenless, battery-free phone boards where applicable — engineered for efficiency, longevity, and rackmount integration. Slots into standard server racks with 2U sizing. Integrated cooling and centralized management support stable 24/7 operation.",
      specs: {
        "Form Factor": "2U rackmount server-style",
        Capacity: "20 nodes",
        "Power Architecture": "Centralized battery-free PSU (config dependent)",
        Cooling: "Integrated active fans",
        "Rack Standard": "19\" server rack",
        Management: "Remote control / ADB compatible",
        "Build Location": "Guangzhou, China",
      },
    }
  ),
  p(
    "phone-farm-box",
    "Enterprise Phone Farm Box",
    "Phone Farm Box",
    "The original 20-node real device phone farm box — factory-built for professional deployment.",
    IMAGES.phoneFarmBox,
    1399,
    12,
    {
      description:
        "The Original Phone Farm Box — a 20-slot real device container regulated by cooling, with custom power components enabling stable multi-device management. Factory-direct from Guangzhou for agencies, QA teams, and enterprise automation.",
    }
  ),
  p(
    "motherboard-box",
    "Motherboard Box — Screenless Array",
    "Motherboard Box",
    "High-density screenless, battery-free motherboard chassis for efficient rack-scale deployment.",
    IMAGES.motherboardBox,
    1824,
    8,
    {
      description:
        "Android Motherboard Box integrates up to 20 smartphone motherboards into a single cooled enclosure. Optional screenless and battery-free configuration reduces thermal load and simplifies 24/7 operation. Exact layout depends on your node specification — contact sales to confirm.",
      specs: {
        "Node Type": "Android motherboard (screenless option)",
        Capacity: "20 nodes per 2U box",
        PSU: "550W industrial grade",
        Cooling: "4-fan optimized airflow",
        Software: "ADB + group control compatible",
        Chassis: "43.5 × 27.5 × 9 cm",
      },
    }
  ),
  p(
    "real-device-phone-farm",
    "Server-Style Device Farm",
    "Enterprise",
    "Complete server-style real device farm for large-scale professional deployment.",
    IMAGES.realDevice,
    1824,
    10
  ),
  p(
    "android-phone-farm",
    "Android Phone Farm — Classic",
    "Android",
    "Entry enterprise Android cluster in industrial chassis — scale real-device automation.",
    IMAGES.androidFarm,
    159,
    18
  ),
  p(
    "iphone-phone-farm",
    "iPhone Phone Farm",
    "iPhone",
    "iOS device array for enterprise testing, account workflows, and automation.",
    IMAGES.iphoneFarm,
    1280,
    5,
    {
      description:
        "iPhone Phone Farm arrays real Apple devices with centralized charging and network routing. Built for iOS QA, TestFlight testing, and multi-account enterprise workflows.",
      specs: {
        "Device Type": "Real iPhone hardware",
        Capacity: "10–20 devices per rack",
        Connectivity: "Lightning / USB-C hub",
        Management: "macOS control station compatible",
        Network: "Dedicated router per cluster",
      },
    }
  ),
  p(
    "empty-box-chassis",
    "Empty Box / Expansion Chassis",
    "Chassis",
    "Empty industrial chassis for custom builds, reverse-mount layouts, and fleet expansion.",
    IMAGES.emptyBox,
    179,
    22
  ),
  p(
    "power-supply-solution",
    "Power / Charging Station",
    "Power",
    "Centralized power infrastructure for rackmount phone farm deployments.",
    IMAGES.power,
    149,
    35
  ),
  p("usb-hub", "USB Hub Backplane", "USB Hub", "Industrial USB hub modules for stable multi-device rack connectivity.", IMAGES.usbHub, 89, 50),
  p("cooling-solution", "Cooling Module", "Cooling", "Active cooling for dense 24/7 rackmount phone farm operation.", IMAGES.cooling, 149, 40),
  p("network-equipment", "Network Equipment", "Network", "Enterprise switches and routing for server-style device farms.", IMAGES.network, 150, 30),
  p(
    "remote-control-setup",
    "Remote Control Setup",
    "Services",
    "Unified multi-device management configuration — group control and remote automation setup.",
    IMAGES.remoteControl,
    350,
    99,
    {
      description:
        "Remote Control Setup includes software configuration, ADB setup, screen mirroring, batch APK deployment, and group control integration for your rackmount or box deployment.",
    }
  ),
];

export function getProductSeed(slug: string) {
  return PRODUCT_SEEDS.find((p) => p.slug === slug);
}
