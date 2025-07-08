import { OrderWithProducts } from "@/src/types"

type LatestOrderItemProps = {
    order:OrderWithProducts
}

export default function LatestOrderItem({order}:LatestOrderItemProps) {

  return (
    <div className="bg-white shadow-lg p-5 space-y-3 rounded-lg">
        <p className="text-2xl font-bold text-slate-700">
            {order.name}
        </p>
        <ul
            className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-600"
            role="list"
        >
            {order.orderProducts.map(item =>(
                <li 
                    key={item.id}
                    className="flex py-5 text-lg"
                >
                    <p>
                        <span>({item.quantity}) </span>
                        {item.product.name}
                    </p>
                </li>
            ))}
        </ul>
    </div>
  )
}
