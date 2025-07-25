"use client"
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "@/components/order/LatestOrderItem";

export default function OrdersPage() {
    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 5000,
        revalidateOnFocus: false
    })
    if (isLoading) return <p>Cargando ordenes...</p>

    if (data) return (
        <>
            <h1 className="text-center mt-20 text-3xl font-black">Ordenes Listas</h1>
            <Logo />
            {data.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto my-10">
                    {data.map(order =>(
                        <LatestOrderItem key={order.id} order={order} />
                    ))}
                </div>
            ): <p className="text-center my-10"> No hay ordenes listas </p>}

        </>
    )
}
