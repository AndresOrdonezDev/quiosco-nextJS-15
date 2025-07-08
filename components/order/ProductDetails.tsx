import {XCircleIcon, PlusIcon, MinusIcon} from '@heroicons/react/24/outline'
import { OrderItem } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import { useStore } from '@/src/store'

type ProductDetailsProps = {
  product: OrderItem
}
export default function ProductDetails({ product }: ProductDetailsProps) {
  const {removeItemOrder,increaseQuantity, decreaseQuantity} = useStore((state) => state)
  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{product.name} </p>

          <button
            type="button"
            onClick={() => removeItemOrder(product.id)}
          >
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-xl text-amber-500 font-black">
          {formatCurrency(product.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            type="button"
            onClick={() => decreaseQuantity(product.id)}
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">
            {product.quantity}
          </p>

          <button
            type="button"
            onClick={() => increaseQuantity(product.id)}
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {''}
          <span className="font-normal">
            {formatCurrency(product.subtotal)}
          </span>
        </p>
      </div>
    </div>
  )
}
