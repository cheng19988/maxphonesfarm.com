/** RFQ form select options — rackmount / enterprise device lab positioning. */
export const RFQ_PLATFORM_OPTIONS = [
  { value: "", label: "Select primary platform" },
  { value: "android-phones", label: "Android phones (full devices)" },
  { value: "android-motherboard", label: "Android motherboard / screenless nodes" },
  { value: "ios-phones", label: "iPhone / iOS devices" },
  { value: "mixed-android-ios", label: "Mixed Android + iOS lab" },
  { value: "undecided", label: "Undecided — need sizing help" },
] as const;

export const RFQ_CONNECTION_OPTIONS = [
  { value: "", label: "Select deployment form factor" },
  { value: "2u-rackmount", label: "2U rackmount in server cabinet" },
  { value: "standalone-box", label: "Standalone phone farm box (desk/shelf)" },
  { value: "multi-rack", label: "Multi-rack / enterprise rollout" },
  { value: "pilot-starter", label: "Pilot starter chassis (4–8 nodes)" },
  { value: "remote-setup-only", label: "Remote setup on existing hardware" },
  { value: "undecided", label: "Undecided — need layout advice" },
] as const;
