import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create categories
  const categories = [];
  const categoryNames = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
  ];

  for (const name of categoryNames) {
    const category = await prisma.category.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        description: faker.commerce.productDescription(),
        image: `https://images.unsplash.com/photo-${faker.string.numeric(10)}?w=400&h=400&fit=crop`,
      },
    });
    categories.push(category);
  }

  console.log(`✅ Created ${categories.length} categories`);

  // Create products
  const products = [];
  for (let i = 0; i < 30; i++) {
    const category = faker.helpers.arrayElement(categories);
    const name = faker.commerce.productName();
    const price = faker.commerce.price({ min: 10, max: 500, dec: 2 });
    const compareAtPrice =
      Math.random() > 0.5
        ? (Number(price) * 1.2).toFixed(2)
        : null;

    const product = await prisma.product.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: faker.commerce.productDescription(),
        price,
        compareAtPrice,
        images: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(
          () =>
            `https://images.unsplash.com/photo-${faker.string.numeric(10)}?w=800&h=800&fit=crop`
        ),
        categoryId: category.id,
        featured: Math.random() > 0.7,
        inStock: Math.random() > 0.2,
        tags: faker.helpers.arrayElements(
          ["new", "popular", "sale", "trending", "limited"],
          { min: 0, max: 3 }
        ),
      },
    });

    // Create variants for some products
    if (Math.random() > 0.5) {
      const sizes = ["S", "M", "L", "XL"];
      const colors = ["Red", "Blue", "Green", "Black", "White"];

      for (let j = 0; j < faker.number.int({ min: 2, max: 5 }); j++) {
        const size = faker.helpers.arrayElement(sizes);
        const color = faker.helpers.arrayElement(colors);
        await prisma.variant.create({
          data: {
            productId: product.id,
            name: `${size} / ${color}`,
            sku: `SKU-${product.id}-${j}`,
            price: Math.random() > 0.5 ? (Number(price) * 1.1).toFixed(2) : null,
            stock: faker.number.int({ min: 0, max: 100 }),
            attributes: {
              size,
              color,
            },
          },
        });
      }
    }

    products.push(product);
  }

  console.log(`✅ Created ${products.length} products`);

  // Create a coupon
  await prisma.coupon.create({
    data: {
      code: "WELCOME10",
      type: "PERCENTAGE",
      value: 10,
      minPurchase: 50,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      active: true,
    },
  });

  console.log("✅ Created coupon");

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
