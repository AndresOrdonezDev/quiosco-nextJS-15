"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {

  const order = useStore((state) => state.order)
  const resetOrders = useStore((state) => state.resetOrders)
  const total = order.reduce((total, item) => total + item.subtotal, 0)

  const handleCreateOrder = async () => {
    const name = 'Mesa 1'
    const data = {
      name,
      total,
      order
    }
    // checks on the client
    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach((error)=>{
        toast.error(error.message)
      })
      return
    }
    //checks on the server
    const response = await createOrder(data)
    if(response?.errors){
      response.errors.forEach((error)=>{
        toast.error(error.message)
      })
      return
    }
    toast.success('Pedido Realizado 👌')
    resetOrders()
  }
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-3xl text-center font-black">Mi pedido</h1>

      {total > 0 &&
        <>
          <p
            className="text-center p-5 m-5 text-slate-800 
            font-bold text-xl border bg-white"
          >Total a pagar: {formatCurrency(total)}</p>
          <form
            action={handleCreateOrder}
            className="space-y-3"
          >
            {/* <input 
              type="text"
              className="p-2 w-full border border-amber-500 rounded"
              placeholder="Tu nombre aquí"
              name="name"
            /> */}
            <button
              type="submit"
              className="uppercase bg-black text-white text center w-full p-3 font-bold cursor-pointer"
            >Confirmar Pedido</button>
          </form>
        </>
      }

      {order.length === 0 ? (<p className="text-center mt-10">No hay agregados</p>) : (

        <div className="mt-5">
          {order.map(product => (
            <ProductDetails key={product.id} product={product} />
          ))}

        </div>
      )}
    </aside>
  )
}
