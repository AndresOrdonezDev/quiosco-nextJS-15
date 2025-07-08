"use client"

import { useRouter } from "next/navigation"

export default function GoBackButton() {
    const router = useRouter()
  return (
    <button
        className="bg-amber-400 w-full lg:w-auto text-xl px-8 py-2 text-center font-bold"
        onClick={()=> router.back()}
    >
        Volver
    </button>
  )
}
