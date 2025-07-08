"use server"
import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";


export async function completeOrder(formdata: FormData) {
    const data = {
        orderId: formdata.get('order_id')
    }
    const result = OrderIdSchema.safeParse(data)
    if (result.success) {
        try {
            const now = new Date();
            const ColombiaTime = new Date(now.getTime() - (5 * 60 * 60 * 1000));
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: ColombiaTime
                }
            })
            revalidatePath('admin/orders')
        } catch (error) {
            console.log(error);

        }
    }
}