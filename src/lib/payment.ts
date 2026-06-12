import { PAYMENT } from "./config";
import { prisma } from "./prisma";
import type { PaymentStatus } from "./payment-status";

export type TronTransaction = {
  txHash: string;
  amount: number;
  to: string;
  confirmed: boolean;
};

const USDT_DECIMALS = 1_000_000;
/** Accept 0.1% tolerance for rounding on TRC20 transfers. */
const AMOUNT_TOLERANCE = 0.001;

export function isAutoVerificationEnabled() {
  return Boolean(process.env.TRON_API_KEY?.trim());
}

export function createPaymentExpiry() {
  return new Date(Date.now() + PAYMENT.expiryMinutes * 60 * 1000);
}

/** 1 USD list price → USDT due (1:1), floored at configured minimum. */
export function usdToUsdt(usd: number) {
  return Math.max(PAYMENT.minAmount, Math.round(usd * 100) / 100);
}

function amountsMatch(received: number, expected: number) {
  if (received >= expected * (1 - AMOUNT_TOLERANCE)) return "paid" as const;
  if (received > 0 && received < expected * (1 - AMOUNT_TOLERANCE)) return "underpaid" as const;
  return null;
}

/** Query TronGrid for inbound USDT (TRC20) to our address after `since`. */
export async function verifyTronPayment(
  address: string,
  expectedAmount: number,
  since: Date
): Promise<TronTransaction | null> {
  const apiKey = process.env.TRON_API_KEY?.trim();
  if (!apiKey) return null;

  const sinceMs = since.getTime();
  const url = new URL(`https://api.trongrid.io/v1/accounts/${address}/transactions/trc20`);
  url.searchParams.set("limit", "50");
  url.searchParams.set("contract_address", PAYMENT.contract);
  url.searchParams.set("only_to", "true");

  try {
    const res = await fetch(url.toString(), {
      headers: { "TRON-PRO-API-KEY": apiKey },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;

    const body = (await res.json()) as {
      data?: Array<{
        transaction_id: string;
        to: string;
        value: string;
        block_timestamp: number;
      }>;
    };

    for (const tx of body.data ?? []) {
      if (tx.to?.toLowerCase() !== address.toLowerCase()) continue;
      if (tx.block_timestamp < sinceMs) continue;

      const amount = Number(tx.value) / USDT_DECIMALS;
      if (amount <= 0) continue;

      return {
        txHash: tx.transaction_id,
        amount,
        to: tx.to,
        confirmed: true,
      };
    }
  } catch {
    return null;
  }

  return null;
}

async function applyPaymentStatus(
  paymentId: string,
  orderId: string,
  status: PaymentStatus,
  data: {
    receivedAmount?: number;
    txHash?: string;
    verificationStatus: string;
    orderStatus: string;
    paidAt?: Date;
  }
) {
  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      paymentStatus: status,
      verificationStatus: data.verificationStatus,
      receivedAmount: data.receivedAmount,
      txHash: data.txHash,
      paidAt: data.paidAt,
    },
  });
  await prisma.order.update({
    where: { id: orderId },
    data: { status: data.orderStatus },
  });
}

export async function checkAndUpdatePayment(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { order: true },
  });
  if (!payment) return null;

  const terminal: PaymentStatus[] = ["paid", "expired", "manual_review", "underpaid", "overpaid"];
  if (terminal.includes(payment.paymentStatus as PaymentStatus) && payment.paymentStatus !== "pending") {
    return { status: payment.paymentStatus as PaymentStatus, payment, autoVerification: isAutoVerificationEnabled() };
  }

  if (new Date() > payment.expiresAt && payment.paymentStatus === "pending") {
    await applyPaymentStatus(payment.id, payment.orderId, "expired", {
      verificationStatus: "expired",
      orderStatus: "Expired",
    });
    return { status: "expired" as const, payment, autoVerification: isAutoVerificationEnabled() };
  }

  if (!isAutoVerificationEnabled()) {
    return {
      status: (payment.paymentStatus as PaymentStatus) || "pending",
      payment,
      autoVerification: false,
      manualConfirmation: true,
    };
  }

  const tx = await verifyTronPayment(
    payment.paymentAddress,
    payment.expectedAmount,
    payment.createdAt
  );

  if (!tx) {
    return { status: "pending" as const, payment, autoVerification: true };
  }

  const match = amountsMatch(tx.amount, payment.expectedAmount);

  if (match === "paid") {
    const now = new Date();
    await applyPaymentStatus(payment.id, payment.orderId, "paid", {
      receivedAmount: tx.amount,
      txHash: tx.txHash,
      verificationStatus: "verified",
      orderStatus: "Paid",
      paidAt: now,
    });
    return { status: "paid" as const, payment, autoVerification: true };
  }

  if (match === "underpaid") {
    await applyPaymentStatus(payment.id, payment.orderId, "underpaid", {
      receivedAmount: tx.amount,
      txHash: tx.txHash,
      verificationStatus: "underpaid",
      orderStatus: "Payment Underpaid",
    });
    return { status: "underpaid" as const, payment, autoVerification: true };
  }

  if (tx.amount > payment.expectedAmount * (1 + AMOUNT_TOLERANCE)) {
    const now = new Date();
    await applyPaymentStatus(payment.id, payment.orderId, "overpaid", {
      receivedAmount: tx.amount,
      txHash: tx.txHash,
      verificationStatus: "overpaid",
      orderStatus: "Payment Overpaid",
      paidAt: now,
    });
    return { status: "overpaid" as const, payment, autoVerification: true };
  }

  return { status: "pending" as const, payment, autoVerification: true };
}

export async function markPaymentManualReview(paymentId: string) {
  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) return null;

  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      paymentStatus: "manual_review",
      verificationStatus: "manual_review",
    },
  });
  await prisma.order.update({
    where: { id: payment.orderId },
    data: { status: "Manual Review" },
  });

  return prisma.payment.findUnique({ where: { id: paymentId } });
}

export async function markPaymentPaidManually(paymentId: string, opts?: { txHash?: string; receivedAmount?: number }) {
  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) return null;

  const now = new Date();
  await applyPaymentStatus(payment.id, payment.orderId, "paid", {
    receivedAmount: opts?.receivedAmount ?? payment.expectedAmount,
    txHash: opts?.txHash,
    verificationStatus: "manual_confirmed",
    orderStatus: "Paid",
    paidAt: now,
  });

  return prisma.payment.findUnique({ where: { id: paymentId } });
}
