import { getProducts } from "@/actions/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminProductsPage() {
  const { products } = await getProducts({ limit: 100 });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Products</h1>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">{product.name}</td>
                <td className="p-4">${Number(product.price).toFixed(2)}</td>
                <td className="p-4">{product.category.name}</td>
                <td className="p-4">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </td>
                <td className="p-4">
                  <Link href={`/admin/products/${product.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
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
