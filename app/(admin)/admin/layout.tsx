import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, Users, LayoutDashboard } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Simple admin check - in production, use proper role-based access
  if (!user) {
    redirect("/sign-in");
  }

  // For demo purposes, allow any logged-in user. In production, check for admin role.
  // if (user.email !== "admin@example.com") {
  //   redirect("/");
  // }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/40 p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button variant="ghost" className="w-full justify-start">
              <Package className="mr-2 h-4 w-4" />
              Products
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </Button>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
