const P = "maxphonesfarm.com";
const card = (name: string) => `/images/card_800x800/${name}-card_800x800.webp`;
const hero = (name: string) => `/images/hero_1600x900/${name}-hero_1600x900.webp`;
const detail = (name: string) => `/images/detail_1200x900/${name}-detail_1200x900.webp`;
const banner = (name: string) => `/images/banner_wide/${name}-banner_wide.webp`;
const banner2560 = (name: string) => `/images/banner_wide/${name}-banner_wide-2560.webp`;

const serviceLab = `${P}-service-scenes-moderntechlabworkspace-c5506`;
const serviceControl = `${P}-service-scenes-moderndevicemanagementcontrol-ae6b9`;
const rackSlide = `${P}-promo-slide-18-rackmount`;
const rackLab = `${P}-promo-slide-08-rack-lab`;
const slideBefore = `${P}-promo-slide-04-before`;
const slideAfter = `${P}-promo-slide-10-after`;
const slideOverview = `${P}-promo-slide-02-overview`;
const slideDeploy = `${P}-promo-slide-15-deployment`;
const homeShowroom = `${P}-home-hero-showroom-lab`;

export const IMAGES = {
  homeHero: hero(rackSlide),
  homeHeroProduct: banner(homeShowroom),
  homeHeroProductRetina: banner2560(homeShowroom),
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
    hero: hero(`${P}-promo-factory-721a7543`),
    detail: detail(`${P}-product-box-0f5501e1584de9a625d220f62951bc6d-d04df`),
  },
  emptyBox: {
    card: card(`${P}-product-box-2025-10-25-11-24-img-0549-f696b`),
    hero: hero(`${P}-product-box-2025-10-25-11-24-img-0549-f696b`),
    detail: detail(`${P}-product-box-2025-10-25-11-24-img-0549-f696b`),
  },
  usbHub: {
    card: card(`${P}-product-box-2025-10-25-12-01-img-0579`),
    hero: hero(`${P}-product-box-2025-10-25-12-01-img-0579`),
    detail: detail(`${P}-product-box-2025-10-25-12-01-img-0579`),
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
    card: card(`${P}-product-box-2025-10-25-11-45-img-0575`),
    hero: hero(`${P}-product-box-2025-10-25-11-45-img-0575`),
    detail: detail(`${P}-product-box-2025-10-25-11-45-img-0575`),
  },
  customCabinet: {
    card: card(rackSlide),
    hero: hero(rackSlide),
    detail: detail(rackLab),
  },
  remoteControl: {
    card: card(`${P}-product-box-untitled-1-setup`),
    hero: hero(`${P}-product-box-untitled-1-setup`),
    detail: detail(`${P}-product-box-untitled-1-setup`),
  },
  scenes: {
    rackmount: hero(rackSlide),
    rackLab: hero(rackLab),
    overview: hero(slideOverview),
    deployment: hero(slideDeploy),
    before: hero(slideBefore),
    after: hero(slideAfter),
    factoryA: hero(`${P}-promo-factory-f2747fe7`),
    factoryB: hero(`${P}-promo-factory-93bb1ee4`),
  },
  serviceScene: hero(serviceLab),
  serviceControl: hero(serviceControl),
  factory: "/images/facility/workshop.png",
  workshop: "/images/facility/workshop.png",
  office: "/images/facility/office.png",
  meeting: "/images/facility/meeting-room.png",
  warehouse: "/images/facility/warehouse.png",
  frontDesk: "/images/facility/front-desk.png",
} as const;

/** Blog / guide cover images keyed by slug */
export const BLOG_COVERS: Record<string, string> = {
  "how-to-choose-phone-farm-box": IMAGES.phoneFarmBox.hero,
  "real-device-vs-cloud-phone": IMAGES.scenes.overview,
  "phone-farm-setup-guide-2026": IMAGES.scenes.deployment,
  "motherboard-box-vs-phone-box": IMAGES.motherboardBox.hero,
  "bulk-apk-installation-guide": IMAGES.scenes.rackLab,
  "enterprise-phone-farm-deployment": IMAGES.scenes.rackmount,
};
