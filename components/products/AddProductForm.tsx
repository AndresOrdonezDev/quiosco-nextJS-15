"use client"

import { createProduct } from "@/actions/create-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function AddProductForm({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const handleSubmit = async (formdata: FormData) => {
    const data = {
      name: formdata.get('name'),
      price: formdata.get('price'),
      categoryId: formdata.get('categoryId'),
      image: formdata.get('image')
    }
    const result = ProductSchema.safeParse(data)

    if (!result.success) {
      result.error.errors.forEach(error => {
        toast.error(error.message)
      })
      return
    }

    const response = await createProduct(result.data)
    if (response?.errors) {
      response.errors.forEach(error => {
        toast.error(error.message)
      })
      return
    }
    toast.success('Se ha creado un nuevo producto')
    router.push('/admin/products')
  }
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form
        action={handleSubmit}
        className="space-y-5"
      >

        {children}

        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 transition-all text-white w-full mt-5 p-2 uppercase font-bold cursor-pointer"
          value={'Registrar Producto'}
        />
      </form>
    </div>
  )
}
