import { z } from 'zod'

export const OrderSchema = z.object({
    name: z.string().min(5, 'La mesa es obligatoria'),
    total: z.number().min(1, 'Error al totalizar'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})

export const OrderIdSchema = z.object({
    orderId: z.string()
        .transform((value)=>parseInt(value))
        .refine(value => value > 0, {message:"Hay errores"})
})

export const SearchSchema = z.object({
    search: z.string().trim().min(1,{message:'Escribe el producto a buscar'})
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto está vacío'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image:z.string().trim().min(1,{message:'La imagen es obligatoria'})
})

