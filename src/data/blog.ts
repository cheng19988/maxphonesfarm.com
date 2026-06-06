export const BLOG_POSTS = [
  {
    slug: "how-to-choose-phone-farm-box",
    title: "How to Choose Phone Farm Hardware for a Device Lab",
    category: "Hardware Selection",
    date: "2026-03-27",
    excerpt:
      "CPU generation, cooling design, and expansion path — what lab managers should evaluate before buying a 20-node chassis.",
    content: `A device lab outgrows desk setups quickly: cable clutter, uneven cooling, and unreliable USB paths slow QA teams down. A factory-built phone farm box addresses power, airflow, and data routing in one chassis.

**1. Workload and chipset generation**
Match device SoC to your app testing profile. Lighter APK suites run on mid-tier chipsets; heavy UI automation or high-resolution mirroring needs newer Snapdragon tiers with adequate thermal headroom.

**2. Cooling is structural, not optional**
Passive cooling rarely sustains 15–20 nodes under continuous load. Specify active fan arrays and metal chassis heat paths. Our Guangzhou team burn-in tests complete systems before export.

**3. Scalability path**
Many labs start with a standalone 20-node box, then move to 2U rackmount modules. Confirm your vendor supports modular expansion with consistent USB topology.

**4. Software compatibility**
Verify ADB access, OTG behavior, and your device management toolchain before purchase. We document recommended host PC specs and USB controller layouts.

Contact our team with device count and target models for a sizing recommendation.`,
  },
  {
    slug: "real-device-vs-cloud-phone",
    title: "Real-Device Lab vs Cloud Phone: A Hardware Perspective",
    category: "Lab Architecture",
    date: "2026-02-12",
    excerpt:
      "When physical device labs justify the hardware investment compared to cloud-hosted Android instances.",
    content: `Cloud phone services provide virtual Android instances on shared infrastructure. Real-device labs use physical hardware you control or host with a supplier.

**Cloud fits:** Early prototyping, short-lived experiments, teams without hardware ops capacity.

**Physical labs fit:** App release testing, sensor-dependent QA, remote Android device control that must mirror production hardware, and environments requiring isolated lab networks.

Physical devices deliver genuine radios, sensors, and identifiers. For enterprise QA and device management validation, hardware labs remain the practical baseline.

Max Phones Farm supplies the chassis, power, cooling, and USB layers — assembled in Guangzhou since 2017.`,
  },
  {
    slug: "phone-farm-setup-guide-2026",
    title: "Device Lab Setup Guide: From Unboxing to First Test Run",
    category: "Setup",
    date: "2026-01-20",
    excerpt:
      "Hardware unboxing, power and network planning, USB routing, and first QA automation smoke test.",
    content: `This guide outlines a standard Max Phones Farm box handover for internal QA teams.

**Step 1: Unbox and inspect**
Verify slot count, PSU label, fan operation, and USB harness seating. Document serial numbers for asset tracking.

**Step 2: Power and network**
Connect mains power within rated voltage. Place the chassis on a dedicated lab VLAN with managed switch ports per policy.

**Step 3: Host connection**
Run one USB uplink to the control workstation. Confirm each slot enumerates in your device management tool.

**Step 4: Device preparation**
Enable developer options, confirm ADB authorization, and stage test APKs through your approved deployment pipeline.

**Step 5: Smoke test**
Run a parallel test script across all nodes. Monitor thermals and USB stability for 24 hours before production workloads.

Need remote assistance? Message us on WhatsApp (+852 6215 5642) to schedule a setup session.`,
  },
  {
    slug: "motherboard-box-vs-phone-box",
    title: "Motherboard Box vs Full Phone Box for Headless Labs",
    category: "Hardware Selection",
    date: "2026-04-17",
    excerpt:
      "Cost, thermal profile, and maintenance trade-offs between screenless motherboard arrays and full-phone chassis.",
    content: `**Motherboard box advantages:** Lower per-node cost, smaller thermal footprint, suited to headless app testing and ADB automation without display output.

**Motherboard box considerations:** USB debugging authorization may require temporary display attachment during maintenance.

**Full phone box advantages:** Complete device frame with radios and sensors intact, suitable for end-to-end mobile app QA that includes camera, audio, and connectivity tests.

**Full phone box considerations:** Higher per-node cost and slightly higher heat load.

Max Phones Farm builds both configurations. Request a sample unit to benchmark against your lab SOPs.`,
  },
  {
    slug: "bulk-apk-installation-guide",
    title: "Batch APK Deployment Across a Device Lab",
    category: "Setup",
    date: "2026-03-20",
    excerpt:
      "Standardize APK rollout across many Android nodes using grouped device management.",
    content: `Batch APK deployment saves operator time when staging builds across 20+ devices.

1. Group devices by project or release train in your management dashboard.
2. Select the target group and choose batch install.
3. Upload signed APK artifacts from your CI output directory.
4. Monitor per-device install status and collect logs for failed nodes.

Tips: Keep lab VLANs segmented from production networks. Verify signing certificates match your release policy. Our remote control setup service includes a documented batch install workflow.`,
  },
  {
    slug: "enterprise-phone-farm-deployment",
    title: "Enterprise Rackmount Device Lab Deployment",
    category: "Lab Architecture",
    date: "2026-05-10",
    excerpt:
      "Planning multi-rack device labs with power budgeting, network segmentation, and export logistics.",
    content: `Enterprise device labs require infrastructure planning beyond a single chassis.

**Facility:** Dedicated rack space, rated power circuits, and HVAC capacity for continuous load.

**Hardware:** Multiple 2U rackmount modules or custom cabinet layouts with documented USB and PSU redundancy.

**Operations:** Asset tagging, spare fan/PSU stock, maintenance windows, and remote engineering support.

Max Phones Farm supports multi-rack projects from Guangzhou with export documentation and staged QC. Contact us with target node count and destination country for a project quote.`,
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
