import { z } from 'zod'

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  category: z.string(),
  price: z.number(),
  rating: z.number(),
  thumbnail: z.string(),
})

export const productsResponseSchema = z.object({
  products: z.array(productSchema),
})

export type Product = z.infer<typeof productSchema>
export type CartItem = Product & { quantity: number }