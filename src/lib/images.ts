const P = "maxphonesfarm.com";
const card = (name: string) => `/images/card_800x800/${name}-card_800x800.webp`;
const hero = (name: string) => `/images/hero_1600x900/${name}-hero_1600x900.webp`;
const detail = (name: string) => `/images/detail_1200x900/${name}-detail_1200x900.webp`;

export const IMAGES = {
  homeHero: hero(`${P}-product-box-2025-10-25-11-27-img-0551-a9b35`),
  phoneFarmBox: {
    card: card(`${P}-product-box-2025-10-25-11-27-img-0551-a9b35`),
    hero: hero(`${P}-product-box-2025-10-25-11-27-img-0551-a9b35`),
    detail: detail(`${P}-product-box-2025-10-25-11-27-img-0551-a9b35`),
  },
  motherboardBox: {
    card: card(`${P}-product-box-2025-10-25-11-21-img-0547-4b35a`),
    hero: hero(`${P}-product-box-2025-10-25-11-21-img-0547-4b35a`),
    detail: detail(`${P}-product-box-2025-10-25-11-21-img-0547-4b35a`),
  },
  androidFarm: {
    card: card(`${P}-product-box-2025-10-25-11-28-img-0553-47327`),
    hero: hero(`${P}-product-box-2025-10-25-11-28-img-0553-47327`),
    detail: detail(`${P}-product-box-2025-10-25-11-28-img-0553-47327`),
  },
  iphoneFarm: {
    card: card(`${P}-product-box-2025-10-25-11-37-img-0566-ee21b`),
    hero: hero(`${P}-product-box-2025-10-25-11-37-img-0566-ee21b`),
    detail: detail(`${P}-product-box-2025-10-25-11-37-img-0566-ee21b`),
  },
  realDevice: {
    card: card(`${P}-product-box-0f5501e1584de9a625d220f62951bc6d-d04df`),
    hero: hero(`${P}-product-box-0f5501e1584de9a625d220f62951bc6d-d04df`),
    detail: detail(`${P}-product-box-0f5501e1584de9a625d220f62951bc6d-d04df`),
  },
  emptyBox: {
    card: card(`${P}-product-box-2025-10-25-11-24-img-0549-f696b`),
    hero: hero(`${P}-product-box-2025-10-25-11-24-img-0549-f696b`),
    detail: detail(`${P}-product-box-2025-10-25-11-24-img-0549-f696b`),
  },
  usbHub: {
    card: card(`${P}-product-box-2025-10-25-11-24-img-0549-f696b`),
    hero: hero(`${P}-product-box-2025-10-25-11-24-img-0549-f696b`),
    detail: detail(`${P}-product-box-2025-10-25-11-24-img-0549-f696b`),
  },
  power: {
    card: card(`${P}-product-box-2025-10-25-11-29-img-0556-25-10-2025-22-02-38-73237`),
    hero: hero(`${P}-product-box-2025-10-25-11-29-img-0556-25-10-2025-22-02-38-73237`),
    detail: detail(`${P}-product-box-2025-10-25-11-29-img-0556-25-10-2025-22-02-38-73237`),
  },
  cooling: {
    card: card(`${P}-product-box-2025-10-25-11-33-img-0561-db197`),
    hero: hero(`${P}-product-box-2025-10-25-11-33-img-0561-db197`),
    detail: detail(`${P}-product-box-2025-10-25-11-33-img-0561-db197`),
  },
  network: {
    card: card(`${P}-product-box-0f5501e1584de9a625d220f62951bc6d-d04df`),
    hero: hero(`${P}-product-box-0f5501e1584de9a625d220f62951bc6d-d04df`),
    detail: detail(`${P}-product-box-0f5501e1584de9a625d220f62951bc6d-d04df`),
  },
  customCabinet: {
    card: card(`${P}-product-box-2025-10-25-11-27-img-0551-a9b35`),
    hero: hero(`${P}-product-box-2025-10-25-11-27-img-0551-a9b35`),
    detail: detail(`${P}-product-box-2025-10-25-11-27-img-0551-a9b35`),
  },
  remoteControl: {
    card: "/images/facility/workshop.png",
    hero: "/images/facility/workshop.png",
    detail: "/images/facility/workshop.png",
  },
  serviceScene: "/images/facility/workshop.png",
  factory: "/images/facility/workshop.png",
  workshop: "/images/facility/workshop.png",
  office: "/images/facility/office.png",
  meeting: "/images/facility/meeting-room.png",
  warehouse: "/images/facility/warehouse.png",
  frontDesk: "/images/facility/front-desk.png",
} as const;
