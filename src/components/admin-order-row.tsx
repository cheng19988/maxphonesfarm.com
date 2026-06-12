"use client";

import { useState } from "react";
import { PAYMENT_STATUS_LABELS, paymentStatusBadgeClass, type PaymentStatus } from "@/lib/payment-status";

type AdminOrderRowProps = {
  orderId: string;
  orderNumber: string;
  orderStatus: string;
  totalUsd: number;
  createdAt: string;
  productName: string;
  payment: {
    id: string;
    paymentStatus: string;
    expectedAmount: number;
    receivedAmount: number | null;
    txHash: string | null;
    expiresAt: string;
    paidAt: string | null;
    verificationStatus: string;
  } | null;
};

export function AdminOrderRow(props: AdminOrderRowProps) {
  const { payment } = props;
  const [status, setStatus] = useState(payment?.paymentStatus ?? "—");
  const [busy, setBusy] = useState(false);

  async function runAction(action: "mark_paid" | "manual_review") {
    if (!payment) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/payments/${payment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.payment) setStatus(data.payment.paymentStatus);
    } finally {
      setBusy(false);
    }
  }

  const payStatus = isPaymentStatus(status) ? status : null;

  return (
    <tr className="border-b border-neutral-800 text-neutral-300">
      <td className="p-3 font-mono text-xs">{props.orderNumber}</td>
      <td className="p-3">{props.productName}</td>
      <td className="p-3">${props.totalUsd.toLocaleString()}</td>
      <td className="p-3">
        {payment ? (
          <span className="font-mono">{payment.expectedAmount} USDT</span>
        ) : (
          "—"
        )}
      </td>
      <td className="p-3">
        {payment?.receivedAmount != null ? (
          <span className="font-mono">{payment.receivedAmount} USDT</span>
        ) : (
          "—"
        )}
      </td>
      <td className="p-3">
        {payStatus ? (
          <span className={`inline-block px-2 py-0.5 text-xs border rounded ${paymentStatusBadgeClass(payStatus)}`}>
            {PAYMENT_STATUS_LABELS[payStatus]}
          </span>
        ) : (
          status
        )}
      </td>
      <td className="p-3 text-xs text-neutral-500 max-w-[120px] truncate" title={payment?.txHash ?? ""}>
        {payment?.txHash ? payment.txHash.slice(0, 10) + "…" : "—"}
      </td>
      <td className="p-3 text-xs">{props.orderStatus}</td>
      <td className="p-3">
        {payment && (
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              disabled={busy || status === "paid"}
              onClick={() => runAction("mark_paid")}
              className="text-xs px-2 py-1 border border-green-800 text-green-400 rounded hover:bg-green-950 disabled:opacity-40"
            >
              Mark paid
            </button>
            <button
              type="button"
              disabled={busy || status === "manual_review"}
              onClick={() => runAction("manual_review")}
              className="text-xs px-2 py-1 border border-purple-800 text-purple-400 rounded hover:bg-purple-950 disabled:opacity-40"
            >
              Manual review
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

function isPaymentStatus(value: string): value is PaymentStatus {
  return ["pending", "paid", "underpaid", "overpaid", "expired", "manual_review"].includes(value);
}
