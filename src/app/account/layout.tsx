import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Account",
  description: "Customer account area.",
  path: "/account",
  noIndex: true,
});

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
