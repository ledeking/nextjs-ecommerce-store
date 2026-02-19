"use client";

import { useWishlistStore } from "@/lib/store/wishlist-store";
import { ProductCard } from "@/components/features/product-card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="flex flex-col items-center justify-center py-12">
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold">Your wishlist is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Start adding products to your wishlist
          </p>
          <Link href="/products" className="mt-6">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Wishlist</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <ProductCard
            key={item.productId}
            id={item.productId}
            name={item.name}
            slug={item.slug}
            price={item.price}
            image={item.image}
            inStock={true}
          />
        ))}
      </div>
    </div>
  );
}
