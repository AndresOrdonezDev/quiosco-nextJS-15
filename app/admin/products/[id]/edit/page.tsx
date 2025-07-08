import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if (!product) {
        notFound()
    }
    return product
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const { id } = params
    const product = await getProductById(+id)


    return (
        <>
            <Heading>Editar: {product.name}</Heading>
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between ">
                <GoBackButton/>
            </div>
            <EditProductForm>
                <ProductForm
                    product={product}
                />
            </EditProductForm>
        </>
    )
}
