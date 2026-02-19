import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          email: true,
        },
      },
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Orders</h1>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Order Number</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Total</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-4">{order.orderNumber}</td>
                <td className="p-4">{order.user.email}</td>
                <td className="p-4">{formatPrice(order.total)}</td>
                <td className="p-4">
                  <span className="capitalize">{order.status.toLowerCase()}</span>
                </td>
                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <Link href={`/admin/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
