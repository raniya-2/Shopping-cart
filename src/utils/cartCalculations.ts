import type { CartItem } from '../schemas/product'

export const TAX_RATE = 0.05
export const DISCOUNT_RATE = 0.1
export const DISCOUNT_THRESHOLD = 100
export const MIN_CHECKOUT_VALUE = 10

export type CartTotals = {
  subtotal: number
  tax: number
  discount: number
  total: number
  canCheckout: boolean
}

// Round to 2 decimal places to avoid problems like 0.1 + 0.2 = 0.30000000000000004
const round = (value: number) => Math.round(value * 100) / 100

export function getItemTotal(item: CartItem): number {
  return round(item.price * item.quantity)
}

export function getItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}

export function calculateTotals(items: CartItem[]): CartTotals {
  const subtotal = round(items.reduce((sum, item) => sum + item.price * item.quantity, 0))
  const tax = round(subtotal * TAX_RATE)
  const discount = subtotal > DISCOUNT_THRESHOLD ? round(subtotal * DISCOUNT_RATE) : 0
  const total = round(subtotal + tax - discount)
  const canCheckout = subtotal >= MIN_CHECKOUT_VALUE

  return { subtotal, tax, discount, total, canCheckout }
}