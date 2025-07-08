import { redirect } from "next/navigation";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function productsCount() {
  return await prisma.product.count()
}

async function getProducts(currentPage: number, pageSize: number) {
  const skip = (currentPage - 1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })
  return products
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>

function validatePageNumber(pageParam: string): number {
  if (!pageParam) return 1;
  
  // Verificar formato y longitud en una sola validación
  if (!/^\d{1,8}$/.test(pageParam)) {
    return -1; // Solo dígitos, máximo 8 caracteres (99,999,999)
  }
  
  const pageNumber = parseInt(pageParam, 10);
  return (pageNumber >= 1) ? pageNumber : -1;
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams
  
  // Validar el número de página de forma más robusta
  const currentPage = validatePageNumber(page);
  
  // Si la página es inválida, redirigir
  if (currentPage < 1) {
    redirect('/admin/products');
  }
  
  const pageSize = 10;
  
  // Obtener el total de productos primero para validar la página
  const totalProducts = await productsCount();
  const totalPages = Math.ceil(totalProducts / pageSize);
  
  // Si la página solicitada excede el total de páginas, redirigir
  if (currentPage > totalPages && totalPages > 0) {
    redirect('/admin/products');
  }
  
  // Ahora sí obtener los productos
  const products = await getProducts(currentPage, pageSize);

  return (
    <>
      <Heading>
        Administrar productos
      </Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between ">
        <Link
          className="bg-amber-400 w-full lg:w-auto text-xl px-8 py-2 text-center font-bold"
          href={'/admin/products/new'}
        >Crear Producto</Link>
        <ProductSearchForm/>
      </div>
      <ProductTable
        products={products}
      />
      <ProductsPagination
        page={currentPage}
        totalPages={totalPages}
      />
    </>
  )
}