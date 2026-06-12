/** Phone farm industry glossary — reference-aligned vocabulary for SEO and AI citation. */
export const GLOSSARY_TERMS = [
  {
    term: "Phone farm box",
    definition:
      "A regulated chassis that holds many smartphones in one enclosure — typically twenty slots — with shared power input, active cooling fans, and a single USB path to a control PC. Operators manage the entire fleet from one workstation instead of scattered chargers and cables.",
    related: ["/products/phone-farm-box", "/blog/what-is-a-phone-farm-box"],
  },
  {
    term: "Rackmount phone farm",
    definition:
      "A phone farm architecture built for standard 19-inch server racks, usually at 2U height. Delivers the same 20-node mobile compute density as a desk box but integrates into data-center or lab rack infrastructure with front-to-rear airflow.",
    related: ["/products/custom-cabinet", "/blog/rackmount-vs-standalone-phone-farm"],
  },
  {
    term: "Screenless nodes",
    definition:
      "Android phone or motherboard configurations operated without an active display. Removing display load reduces heat and power draw, improving thermal stability for continuous 24/7 lab workloads.",
    related: ["/products/motherboard-box", "/blog/motherboard-box-vs-phone-box"],
  },
  {
    term: "Battery-free operation",
    definition:
      "Running phone farm nodes on direct chassis power instead of phone batteries. Eliminates battery degradation, swelling risk, and charging cycles — standard for long-running app testing, automation, and mobile compute deployments.",
    related: ["/products/motherboard-box", "/products/custom-cabinet"],
  },
  {
    term: "Mobile compute",
    definition:
      "Using smartphone SoC CPU and GPU at scale inside regulated hardware. Phone farms consolidate many low-cost mobile processors into rack-scale or box-scale infrastructure for testing, automation, and compute workloads.",
    related: ["/", "/blog/phone-farm-use-cases-device-labs"],
  },
  {
    term: "Sustained compute workloads",
    definition:
      "Continuous SoC processing tasks executed across many Android nodes in a phone farm. Screenless, battery-free layouts with centralized cooling support long-running lab operation where device configuration allows.",
    related: ["/products/custom-cabinet", "/products/motherboard-box"],
  },
  {
    term: "Original-style phone farm box",
    definition:
      "The classic standalone 20-slot smartphone container form factor — desk or shelf deployment with integrated power, cooling, and USB hub. The entry point for most device labs before rackmount scale-up.",
    related: ["/products/phone-farm-box"],
  },
  {
    term: "Charging station (centralized power)",
    definition:
      "In phone farm terminology, a centralized power module that replaces multiple individual phone chargers with one industrial PSU sized for the full slot count. Also called a centralized power module or phone farm PSU.",
    related: ["/products/power-supply-solution"],
  },
  {
    term: "Reverse-mount / expansion chassis",
    definition:
      "A bare or custom-configured phone farm shell for fleet expansion, integrator builds, or non-standard slot layouts. Ships as an empty metal enclosure ready for PSU, fan, and USB backplane configuration.",
    related: ["/products/empty-box-chassis"],
  },
  {
    term: "Remote device control",
    definition:
      "Managing many phones from one control PC via ADB paths, screen mirroring, batch APK deployment, and device grouping. The hardware layer (USB backplane, stable power) makes software control reliable at 20-node scale.",
    related: ["/products/remote-control-setup", "/blog/remote-adb-multi-device-lab"],
  },
  {
    term: "Group control",
    definition:
      "Operating a subset or entire phone farm as a grouped fleet — batch commands, parallel installs, and synchronized test runs across selected slots from a single workstation.",
    related: ["/products/remote-control-setup", "/services"],
  },
  {
    term: "Real-device lab",
    definition:
      "A QA or automation environment built on physical Android and iOS hardware rather than cloud-hosted virtual phones. Provides authentic sensors, radios, carrier behavior, and OS fingerprints.",
    related: ["/blog/real-device-vs-cloud-phone", "/faq"],
  },
  {
    term: "Motherboard box",
    definition:
      "A phone farm chassis optimized for screenless Android motherboard nodes rather than full phones. Lower per-node cost and thermal footprint; suited to headless app testing and ADB automation.",
    related: ["/products/motherboard-box"],
  },
  {
    term: "Compute per watt",
    definition:
      "Efficiency metric for phone farm hardware — how much mobile compute capacity a chassis delivers relative to power draw. Screenless, battery-free rackmount layouts often improve efficiency 2–10% vs full phones under continuous load.",
    related: ["/products/custom-cabinet"],
  },
  {
    term: "2U rack integration",
    definition:
      "Mounting phone farm hardware in a 2 rack-unit (2U) slot within a standard 19-inch server cabinet. Enables mobile compute density alongside traditional servers in enterprise labs.",
    related: ["/products/custom-cabinet", "/blog/2u-phone-farm-rack-buyer-guide"],
  },
  {
    term: "2U phone farm rack",
    definition:
      "Synonym for a rackmount phone farm chassis at 2U height (88 mm) in a 482 mm wide cabinet — typically twenty Android nodes with centralized PSU, fans, and one USB uplink per chassis.",
    related: ["/products/custom-cabinet", "/blog/2u-phone-farm-rack-buyer-guide"],
  },
  {
    term: "Android phone farm",
    definition:
      "Physical hardware that hosts multiple Android phones or motherboard nodes in one chassis — phone farm box, rackmount array, or starter cluster — with shared power, cooling, and USB routing to one control PC for app QA and automation.",
    related: ["/products/android-phone-farm", "/blog/android-phone-farm-hardware-explained"],
  },
  {
    term: "Mobile device farm",
    definition:
      "Infrastructure that runs many smartphones or headless mobile boards at scale — the hardware layer behind device labs, batch testing, and remote ADB. Contrasts with cloud-hosted virtual phones.",
    related: ["/blog/mobile-device-farm-hardware-guide", "/blog/real-device-vs-cloud-phone"],
  },
  {
    term: "Device farm hardware",
    definition:
      "Chassis, PSU, fan modules, USB backplanes, and rack modules that make a device farm operable — distinct from test software running on the control PC.",
    related: ["/products", "/blog/phone-farm-equipment-buyers-guide"],
  },
  {
    term: "Phone farm equipment",
    definition:
      "Complete systems and accessories for phone farm deployments: boxes, rackmount chassis, centralized power (charging station), USB backplanes, cooling modules, and network kits — not loose consumer USB hubs.",
    related: ["/blog/phone-farm-equipment-buyers-guide", "/products/power-supply-solution"],
  },
  {
    term: "Batch device testing",
    definition:
      "Running installs, smoke tests, or automation scripts across many physical devices in parallel from one workstation — enabled by stable USB topology and grouped ADB control in factory chassis.",
    related: ["/blog/bulk-apk-installation-guide", "/products/remote-control-setup"],
  },
  {
    term: "Phone farm wholesale",
    definition:
      "Volume purchase of phone farm chassis from a factory-direct supplier — typically priced from five units with palletized export and staged delivery for multi-rack projects. MOQ for evaluation remains one unit on standard SKUs.",
    related: ["/blog/phone-farm-wholesale-bulk-order-guide", "/pricing"],
  },
  {
    term: "App compatibility testing hardware",
    definition:
      "Real-device phone farm chassis used to validate mobile apps across a fixed matrix of Android or iOS hardware — catching SoC, display, and carrier-specific behavior emulators miss.",
    related: ["/blog/phone-farm-for-app-testing-labs", "/faq"],
  },
] as const;
