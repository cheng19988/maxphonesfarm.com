import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { markPaymentManualReview, markPaymentPaidManually } from "@/lib/payment";
import { isPaymentStatus } from "@/lib/payment-status";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = (await req.json()) as {
    action?: "mark_paid" | "manual_review";
    txHash?: string;
    receivedAmount?: number;
    paymentStatus?: string;
  };

  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (body.action === "mark_paid") {
    await markPaymentPaidManually(id, {
      txHash: body.txHash,
      receivedAmount: body.receivedAmount,
    });
  } else if (body.action === "manual_review") {
    await markPaymentManualReview(id);
  } else if (body.paymentStatus && isPaymentStatus(body.paymentStatus)) {
    await prisma.payment.update({
      where: { id },
      data: { paymentStatus: body.paymentStatus, verificationStatus: body.paymentStatus },
    });
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const updated = await prisma.payment.findUnique({
    where: { id },
    include: { order: { select: { orderNumber: true, status: true } } },
  });

  return NextResponse.json({ payment: updated });
}
