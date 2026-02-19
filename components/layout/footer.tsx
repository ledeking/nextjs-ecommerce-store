import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">NextJS Store</h3>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.description}
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-foreground"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/account"
                  className="text-muted-foreground hover:text-foreground"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
