import { prisma } from "@/src/lib/prisma"
export const dynamic = 'force-dynamic' //to refresh all cache
export async function GET() {
    const orders = await prisma.order.findMany({
        where: {
            status: false
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
        
    return Response.json(orders)
}