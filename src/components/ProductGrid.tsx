import { useCartStore } from '../store/cartStore'
import { useProducts } from '../hooks/useProducts'
import { useProductFilters } from '../hooks/useProductFilters'
import ProductCard from './ProductCard'
import ProductFilters from './ProductFilters'


export default function ProductGrid() {
  const { data: products, isLoading, isError, error, refetch } = useProducts()
  const filters = useProductFilters(products)

  // TEMPORARY: replaced by the Zustand cart in Phase 5
  const addToCart = useCartStore((state) => state.addToCart)  
   

  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-semibold text-red-700">Could not load products.</p>
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <p className="py-16 text-center text-gray-600">No products are available right now.</p>
    )
  }

  return (
    <div>
      <ProductFilters
        search={filters.search}
        onSearchChange={filters.setSearch}
        category={filters.category}
        onCategoryChange={filters.setCategory}
        categories={filters.categories}
        minPrice={filters.minPrice}
        onMinPriceChange={filters.setMinPrice}
        maxPrice={filters.maxPrice}
        onMaxPriceChange={filters.setMaxPrice}
        hasActiveFilters={filters.hasActiveFilters}
        onClear={filters.clearFilters}
      />

      {filters.filteredProducts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-600">No products match your search or filters.</p>
          <button
            onClick={filters.clearFilters}
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filters.filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  )
}