import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (productId: Product['id']) => void
    decreaseQuantity: (productId: Product['id']) => void
    removeItemOrder: (productId: Product['id']) => void
    resetOrders: ()=>void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        const { ...data } = product

        let order: OrderItem[] = []

        if (get().order.find(item => item.id === data.id)) {
            order = get().order.map(item => item.id === data.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * data.price
            }]
        }
        set(() => ({
            order
        }))
    },

    increaseQuantity: (productId) => {
        set((state) => ({
            order: state.order.map(item => item.id === productId ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },
    decreaseQuantity: (productId) => {
        set((state) => ({
            order: state.order.map(item => item.id === productId ? {
                ...item,
                quantity: item.quantity === 1 ? 1 : item.quantity - 1,
                subtotal: item.quantity === 1 ? item.price * 1 : item.price * (item.quantity - 1)
            } : item)
        }))
    },

    removeItemOrder: (productId) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== productId)
        }))
    },

    resetOrders:()=>{
        set(()=>({
            order: []
        }))
    }
    
}))

