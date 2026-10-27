import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '../schemas/product'

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 5

type CartState = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id)

          // Same product again: increase quantity instead of adding a duplicate
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
                  : item,
              ),
            }
          }

          return { items: [...state.items, { ...product, quantity: MIN_QUANTITY }] }
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
              : item,
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(item.quantity - 1, MIN_QUANTITY) }
              : item,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' },
  ),
)