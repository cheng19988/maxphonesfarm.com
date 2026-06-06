export const DELIVERY_PROCESS = [
  {
    step: "1",
    title: "Requirement confirmation",
    detail:
      "We confirm use case, target device models, node count, and destination country. You receive a written scope before pricing — no production start without sign-off.",
  },
  {
    step: "2",
    title: "Device model / node count confirmation",
    detail:
      "Share phone or motherboard dimensions, USB requirements, and slot layout. We confirm physical fit and note any custom frame or spacing needed.",
  },
  {
    step: "3",
    title: "Power and cooling plan",
    detail:
      "PSU sizing and fan layout are matched to your device draw and expected continuous runtime. Ambient lab temperature and rack airflow are reviewed for rackmount builds.",
  },
  {
    step: "4",
    title: "Assembly and wiring",
    detail:
      "Chassis assembly, internal power harness, USB backplane routing, and slot labeling are completed at our Guangzhou workshop. Third-party devices are not installed unless quoted.",
  },
  {
    step: "5",
    title: "Burn-in test",
    detail:
      "Complete systems run a factory burn-in under load before packing. USB paths and thermal behavior are checked per unit — failures are reworked before export.",
  },
  {
    step: "6",
    title: "Export packing",
    detail:
      "Foam-lined cartons, commercial invoice, and packing list prepared for customs. Express air or sea freight booked per your timeline and budget.",
  },
  {
    step: "7",
    title: "Remote setup support",
    detail:
      "Optional ADB configuration, screen mirroring setup, and video handover after delivery. Available for hardware purchased from us or reviewed third-party chassis.",
  },
] as const;
