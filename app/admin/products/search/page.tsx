import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function searchProduct(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {
    const { search } = await searchParams
    const products = await searchProduct(search)
    return (
        <>

            <Heading>Resultados de búsqueda: {search}</Heading>
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between ">
                <Link
                    className="bg-amber-400 w-full lg:w-auto text-xl px-8 py-2 text-center font-bold"
                    href={'/admin/products'}
                >Listar todos</Link>
                <ProductSearchForm />
            </div>
            {products.length ?
                (<ProductTable products={products} />)
                : <p className="text-center font-bold text-gray-700 mt-10">No hay resultados</p>}

        </>
    )
}
