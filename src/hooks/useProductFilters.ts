import { useMemo, useState } from 'react'
import type { Product } from '../schemas/product'

export function useProductFilters(products: Product[] | undefined) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('') // '' means "all categories"
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // Unique, sorted category names built from the fetched products
  const categories = useMemo(() => {
    const all = (products ?? []).map((product) => product.category)
    return [...new Set(all)].sort()
  }, [products])

  // The products that pass every active filter
  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase()
    const min = minPrice === '' ? 0 : Number(minPrice)
    const max = maxPrice === '' ? Infinity : Number(maxPrice)

    return (products ?? []).filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchText)
      const matchesCategory = category === '' || product.category === category
      const matchesPrice = product.price >= min && product.price <= max
      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [products, search, category, minPrice, maxPrice])

  const hasActiveFilters =
    search !== '' || category !== '' || minPrice !== '' || maxPrice !== ''

  const clearFilters = () => {
    setSearch('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
  }

  return {
    search,
    setSearch,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    categories,
    filteredProducts,
    hasActiveFilters,
    clearFilters,
  }
}