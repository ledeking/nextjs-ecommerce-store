"use server";

import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { generateOrderNumber, calculateDiscount } from "@/lib/utils";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { createCheckoutSession } from "@/lib/stripe";

export async function createOrder({
  items,
  shippingAddress,
  billingAddress,
  couponCode,
}: {
  items: Array<{
    variantId: string;
    productId: string;
    quantity: number;
  }>;
  shippingAddress: any;
  billingAddress: any;
  couponCode?: string;
}) {
  const user = await requireAuth();

  // Calculate totals
  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const variant = await prisma.variant.findUnique({
      where: { id: item.variantId },
      include: { product: true },
    });

    if (!variant) {
      throw new Error(`Variant ${item.variantId} not found`);
    }

    const price = Number(variant.price || variant.product.price);
    const itemTotal = price * item.quantity;
    subtotal += itemTotal;

    orderItems.push({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      price,
    });
  }

  // Apply coupon if provided
  let discount = 0;
  let coupon = null;
  if (couponCode) {
    coupon = await prisma.coupon.findUnique({
      where: {
        code: couponCode,
        active: true,
      },
    });

    if (coupon) {
      const now = new Date();
      if (
        now >= coupon.validFrom &&
        now <= coupon.validUntil &&
        (!coupon.usageLimit || coupon.usedCount < coupon.usageLimit)
      ) {
        discount = calculateDiscount(
          subtotal,
          coupon.type,
          Number(coupon.value)
        );

        if (coupon.maxDiscount) {
          discount = Math.min(discount, Number(coupon.maxDiscount));
        }

        if (coupon.minPurchase && subtotal < Number(coupon.minPurchase)) {
          discount = 0;
        }
      }
    }
  }

  // Calculate shipping
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  // Calculate tax (simplified - 8% tax rate)
  const tax = (subtotal - discount) * 0.08;

  const total = subtotal - discount + shipping + tax;

  // Create order
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      orderNumber: generateOrderNumber(),
      status: "PENDING",
      subtotal: subtotal,
      tax: tax,
      shipping: shipping,
      discount: discount || null,
      couponCode: couponCode || null,
      total: total,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      orderItems: {
        create: orderItems.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // Update coupon usage
  if (coupon) {
    await prisma.coupon.update({
      where: { id: coupon.id },
      data: {
        usedCount: coupon.usedCount + 1,
      },
    });
  }

  // Create Stripe checkout session
  const session = await createCheckoutSession({
    orderId: order.id,
    orderNumber: order.orderNumber,
    items: order.orderItems.map((item) => ({
      name: item.product.name,
      price: Number(item.price),
      quantity: item.quantity,
    })),
    customerEmail: user.email,
  });

  // Update order with Stripe payment ID
  await prisma.order.update({
    where: { id: order.id },
    data: {
      stripePaymentId: session.id,
    },
  });

  return {
    order,
    checkoutUrl: session.url,
  };
}

export async function getOrders() {
  const user = await requireAuth();

  return prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      orderItems: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getOrderById(orderId: string) {
  const user = await requireAuth();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });

  if (!order || order.userId !== user.id) {
    throw new Error("Order not found");
  }

  return order;
}
