"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"

type AdminRouteProps = {
    link: {
        url: string;
        text: string;
        blank: boolean;
    }
}
export default function AdminRoute({ link }: AdminRouteProps) {
    const pathname = usePathname()
    const isActive = pathname.startsWith(link.url)

    return (
        <Link
            href={link.url}
            target={link.blank ? '_blank' : '_top'}
            className={`font-bold text-lg p-3 border border-t border-gray-200 ${isActive && 'bg-amber-400'}`}

        >{link.text}</Link>
    )
}
