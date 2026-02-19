import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getOrders } from "@/actions/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Package, User, MapPin } from "lucide-react";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const orders = await getOrders();

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">My Account</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              {user.firstName && (
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <p className="text-muted-foreground">No orders yet.</p>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <Link
                          href={`/order-confirmation/${order.id}`}
                          className="font-semibold hover:underline"
                        >
                          {order.orderNumber}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(order.total)}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {order.status.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {orders.length > 5 && (
                    <Link href="/account/orders">
                      <Button variant="outline" className="w-full">
                        View All Orders
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/account/orders">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  All Orders
                </Button>
              </Link>
              <Link href="/account/addresses">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  Addresses
                </Button>
              </Link>
              <Link href="/wishlist">
                <Button variant="outline" className="w-full justify-start">
                  Wishlist
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
