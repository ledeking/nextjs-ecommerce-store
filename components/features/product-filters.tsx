"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProductFiltersProps {
  categories: Array<{ id: string; name: string; slug: string }>;
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleCategoryChange = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    params.delete("page"); // Reset to page 1
    router.push(`/products?${params.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Category</h3>
          <div className="space-y-2">
            <Button
              variant={!currentCategory ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleCategoryChange(null)}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={currentCategory === category.slug ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleCategoryChange(category.slug)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
