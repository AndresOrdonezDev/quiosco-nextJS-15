import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
   
    return (
        <div className="border bg-white items-center flex flex-col">

            <Image 
                width={400} 
                height={500} 
                src={getImagePath(product.image)} 
                alt={`Platillo-${product.name}`}
            />

            <div className="p-5">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-2xl text-amber-500">{formatCurrency(product.price)}</p>
            </div>
            <AddProductButton product={product}/>
        </div>
    )
}
