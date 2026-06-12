import { CONTACT } from "@/lib/config";

/** Homepage FAQ aligned with reference-site topics (no third-party brand names). */
export const REFERENCE_HOME_FAQ = [
  {
    question: "What can I do with a phone farm box or rackmount system?",
    answer:
      "Anything physical phones can do at scale: mobile app testing, server-style workloads on Android nodes, AI and ML pipeline tasks on device farms, sustained SoC compute workloads, automation scripts, mobile display QA, and multi-device management from one workstation. Screenless and battery-free node layouts improve power efficiency for continuous operation. Explore our Remote Control Setup service and device lab guides for workflow examples.",
  },
  {
    question: "Is there a setup tutorial available?",
    answer:
      "Yes. Our Device Lab Guides at /blog include unboxing, power and network planning, USB routing, and first smoke-test workflows. The Remote Control Setup Service adds a live video handover, ADB path verification, batch APK install documentation, and device grouping for up to 20 nodes per session.",
  },
  {
    question: "Which countries do you ship to?",
    answer:
      "We assemble in Guangzhou, China and ship worldwide. International orders are available via express courier or sea freight with DDU or DDP terms quoted per destination. Enter your country on the contact form and we reply with shipping options, lead time, and commercial invoice details.",
  },
  {
    question: "I have more questions — how do I reach support?",
    answer: `Contact us on WhatsApp (${CONTACT.whatsapp}), Telegram (${CONTACT.telegram}), or email (${CONTACT.email}). Support is typically available Monday–Friday (UTC+8) with responses within one business day.`,
  },
] as const;
