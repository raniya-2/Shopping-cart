import { productsResponseSchema, type Product } from '../schemas/product'

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=30'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL)

  if (!response.ok) {
    throw new Error(`Failed to load products (status ${response.status})`)
  }

  const data = await response.json()
  const parsed = productsResponseSchema.parse(data)

  return parsed.products
}