import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminInquiryRow } from "@/components/admin-inquiry-row";
import { AdminProductRow } from "@/components/admin-product-row";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const STATUS_ORDER: Record<string, number> = {
  New: 0,
  Contacted: 1,
  Quoted: 2,
  Closed: 3,
};

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  const [inquiries, newCount, products, orders, users] = await Promise.all([
    prisma.contactSubmission.findMany({ take: 50 }),
    prisma.contactSubmission.count({ where: { status: "New" } }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  inquiries.sort((a, b) => {
    const sa = STATUS_ORDER[a.status] ?? 9;
    const sb = STATUS_ORDER[b.status] ?? 9;
    if (sa !== sb) return sa - sb;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Inquiry Dashboard</h1>
        <p className="text-neutral-500 text-sm mb-10">
          Sales follow-up — change default admin password after first login.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          <div className="border border-green-900/50 p-6 bg-green-950/20">
            <div className="text-3xl font-semibold text-white">{newCount}</div>
            <div className="text-green-400/80 text-sm mt-1">New inquiries</div>
          </div>
          <div className="border border-neutral-800 p-6 bg-neutral-950">
            <div className="text-3xl font-semibold text-white">{inquiries.length}</div>
            <div className="text-neutral-500 text-sm mt-1">Recent inquiries shown</div>
          </div>
          <div className="border border-neutral-800 p-6 bg-neutral-950 hidden md:block">
            <div className="text-3xl font-semibold text-white">{products.length}</div>
            <div className="text-neutral-500 text-sm mt-1">Products in catalog</div>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-xl font-semibold text-white mb-4">Inquiries</h2>
          <div className="space-y-3">
            {inquiries.length === 0 ? (
              <p className="text-neutral-500 text-sm">No inquiries yet.</p>
            ) : (
              inquiries.map((c) => (
                <AdminInquiryRow
                  key={c.id}
                  id={c.id}
                  name={c.name}
                  company={c.company}
                  email={c.email}
                  whatsapp={c.whatsapp}
                  country={c.country}
                  deviceQuantity={c.deviceQuantity}
                  productInterest={c.productInterest}
                  message={c.message}
                  sourcePage={c.sourcePage}
                  status={c.status}
                  createdAt={c.createdAt.toISOString()}
                />
              ))
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-neutral-400 mb-4">Product Inventory</h2>
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
                {products.map((p) => (
                  <AdminProductRow key={p.id} id={p.id} name={p.name} priceUsd={p.priceUsd} stock={p.stock} />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-neutral-600 text-xs">
          Legacy: {orders} orders · {users} users —{" "}
          <Link href="/account/orders" className="underline underline-offset-4 hover:text-neutral-400">
            orders module
          </Link>
        </p>
      </div>
    </div>
  );
}
