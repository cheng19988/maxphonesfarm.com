import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Register",
  description: "Internal account registration.",
  path: "/register",
  noIndex: true,
});

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
