import { IMAGES } from "@/lib/images";

export const SERVICES = [
  {
    slug: "phone-farm-setup",
    title: "Device Lab Hardware Setup",
    description:
      "Chassis assembly, device mounting, power routing, lab network planning, and first-boot verification for new device lab deployments.",
    image: IMAGES.workshop,
  },
  {
    slug: "remote-control-configuration",
    title: "Remote Device Control Setup",
    description:
      "ADB path configuration, screen mirroring, and workstation setup so QA teams manage many Android devices from one desk.",
    image: IMAGES.serviceControl,
  },
  {
    slug: "group-control-system-configuration",
    title: "Multi-Device Management Setup",
    description:
      "Device grouping, batch task scheduling, and synchronized test runs for QA automation and staging environments.",
    image: IMAGES.serviceScene,
  },
  {
    slug: "bulk-device-deployment",
    title: "Bulk Lab Provisioning",
    description:
      "Large-scale device staging — signed APK rollout, asset labeling, and health checks for 40–100+ node projects.",
    image: IMAGES.warehouse,
  },
  {
    slug: "custom-hardware-solution",
    title: "Custom Hardware Engineering",
    description:
      "Bespoke chassis design, node count optimization, power/cooling engineering, and rack integration for your device list.",
    image: IMAGES.customCabinet.hero,
  },
  {
    slug: "enterprise-deployment",
    title: "Multi-Rack Lab Deployment",
    description:
      "Multi-cabinet layout, redundant PSU planning, network segmentation guidance, and project-managed rollout for enterprise labs.",
    image: IMAGES.customCabinet.detail,
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Spare Parts",
    description:
      "Fan and PSU replacement, remote diagnostics, and hardware support for production device labs.",
    image: IMAGES.cooling.hero,
  },
  {
    slug: "sample-solution",
    title: "Evaluation Unit Program",
    description:
      "Single-unit evaluation with setup guide and engineering call — validate hardware before bulk purchase.",
    image: IMAGES.phoneFarmBox.hero,
  },
  {
    slug: "overseas-delivery",
    title: "Export & International Shipping",
    description:
      "Express courier or sea freight from Guangzhou with commercial invoices, packing lists, and export documentation.",
    image: IMAGES.warehouse,
  },
];
