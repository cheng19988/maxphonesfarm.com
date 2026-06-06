import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminProductRow } from "@/components/admin-product-row";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Dashboard",
  description: "Internal admin panel",
  path: "/admin",
  noIndex: true,
});

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  const [users, orders, contacts, products] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.contactSubmission.count(),
    prisma.product.count(),
  ]);

  const recentContacts = await prisma.contactSubmission.findMany({
    take: 15,
    orderBy: { createdAt: "desc" },
  });

  const allProducts = await prisma.product.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Admin Dashboard</h1>
        <p className="text-neutral-500 text-sm mb-10">Internal use — change default admin password after first login.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Users", value: users },
            { label: "Orders", value: orders },
            { label: "Inquiries", value: contacts },
            { label: "Products", value: products },
          ].map((s) => (
            <div key={s.label} className="border border-neutral-800 p-6 text-center bg-neutral-950">
              <div className="text-3xl font-semibold text-white">{s.value}</div>
              <div className="text-neutral-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Inquiries</h2>
          <div className="space-y-3">
            {recentContacts.length === 0 ? (
              <p className="text-neutral-500 text-sm">No inquiries yet.</p>
            ) : (
              recentContacts.map((c) => (
                <div key={c.id} className="border border-neutral-800 p-4 text-sm bg-neutral-950">
                  <div className="flex flex-wrap justify-between gap-2 mb-2">
                    <p className="text-white font-medium">{c.name}</p>
                    <p className="text-neutral-600 text-xs">{c.createdAt.toISOString().slice(0, 10)}</p>
                  </div>
                  <p className="text-neutral-400">
                    {c.email}
                    {c.country ? ` · ${c.country}` : ""}
                    {c.deviceQuantity ? ` · Qty: ${c.deviceQuantity}` : ""}
                  </p>
                  {c.productInterest && (
                    <p className="text-neutral-500 mt-1">Interest: {c.productInterest}</p>
                  )}
                  {c.message && (
                    <p className="text-neutral-500 mt-2 line-clamp-3">{c.message}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Product Inventory</h2>
          <div className="overflow-x-auto border border-neutral-800">
            <table className="w-full text-sm table-neutral">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-500 bg-neutral-950">
                  <th>Product</th>
                  <th>Price (USD)</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-neutral-300">
                {allProducts.map((p) => (
                  <AdminProductRow key={p.id} id={p.id} name={p.name} priceUsd={p.priceUsd} stock={p.stock} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
