"use client"

import { SearchSchema } from "@/src/schema"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"

export default function ProductSearchForm() {
    const handleSearchForm = (formdata: FormData) => {
        const data = {
            search: formdata.get('search')
        }
        const result = SearchSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })

            return
        }
        redirect(`/admin/products/search?search=${result.data.search}`)
    }
    return (
        <form
            className=" flex items-center lg:gap-2  lg:w-1/4"
            action={handleSearchForm}
        >
            <input
                type="text"
                placeholder="Buscar Producto"
                className="p-2 placeholder-gray-400 w-full "
                name="search"
            />
            <input
                type="submit"
                value={'Buscar'}
                className="bg-indigo-600 p-2 uppercase cursor-pointer text-white"
            />
        </form>
    )
}
