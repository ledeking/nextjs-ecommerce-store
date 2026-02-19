"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";

export async function syncCartToDatabase(items: Array<{
  variantId: string;
  quantity: number;
}>) {
  const user = await getCurrentUser();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value || crypto.randomUUID();

  if (!cookieStore.get("sessionId")) {
    cookieStore.set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  // Clear existing cart items
  await prisma.cartItem.deleteMany({
    where: {
      OR: [
        { sessionId },
        ...(user ? [{ userId: user.id }] : []),
      ],
    },
  });

  // Add new cart items
  if (items.length > 0) {
    await prisma.cartItem.createMany({
      data: items.map((item) => ({
        sessionId,
        userId: user?.id,
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    });
  }
}

export async function getCartFromDatabase() {
  const user = await getCurrentUser();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId && !user) {
    return [];
  }

  const cartItems = await prisma.cartItem.findMany({
    where: {
      OR: [
        { sessionId },
        ...(user ? [{ userId: user.id }] : []),
      ],
    },
    include: {
      variant: {
        include: {
          product: true,
        },
      },
    },
  });

  return cartItems.map((item) => ({
    id: item.id,
    variantId: item.variantId,
    productId: item.variant.productId,
    name: item.variant.product.name,
    price: Number(item.variant.price || item.variant.product.price),
    image: item.variant.product.images[0] || "",
    quantity: item.quantity,
    attributes: item.variant.attributes as Record<string, string>,
  }));
}
