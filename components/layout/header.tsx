import Link from "next/link";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ShoppingCart, Heart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/store/cart-store";
import { CartSheet } from "@/components/features/cart-sheet";
import { SearchDialog } from "@/components/features/search-dialog";

export function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">NextJS Store</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/products"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Categories
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <SearchDialog />
          <SignedIn>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
          </SignedIn>
          <CartSheet>
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </CartSheet>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="default">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
