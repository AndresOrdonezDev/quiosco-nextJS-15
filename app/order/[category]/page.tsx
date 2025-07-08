import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

export default async function orderPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const products = await getProducts(category)

  return (
    <>
      <Heading>
        Elige los productos para tu pedido:
      </Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 items-center">
        {products.map(product => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </>
  )
}
