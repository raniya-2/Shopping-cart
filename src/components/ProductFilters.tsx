type ProductFiltersProps = {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  categories: string[]
  minPrice: string
  onMinPriceChange: (value: string) => void
  maxPrice: string
  onMaxPriceChange: (value: string) => void
  hasActiveFilters: boolean
  onClear: () => void
}

const inputClass =
  'w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none'

export default function ProductFilters(props: ProductFiltersProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <label htmlFor="search" className="mb-1 block text-sm font-medium text-gray-700">
          Search by title
        </label>
        <input
          id="search"
          type="text"
          value={props.search}
          onChange={(e) => props.onSearchChange(e.target.value)}
          placeholder="e.g. laptop"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={props.category}
          onChange={(e) => props.onCategoryChange(e.target.value)}
          className={inputClass}
        >
          <option value="">All categories</option>
          {props.categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="minPrice" className="mb-1 block text-sm font-medium text-gray-700">
          Min price ($)
        </label>
        <input
          id="minPrice"
          type="number"
          min="0"
          value={props.minPrice}
          onChange={(e) => props.onMinPriceChange(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="maxPrice" className="mb-1 block text-sm font-medium text-gray-700">
          Max price ($)
        </label>
        <input
          id="maxPrice"
          type="number"
          min="0"
          value={props.maxPrice}
          onChange={(e) => props.onMaxPriceChange(e.target.value)}
          className={inputClass}
        />
      </div>

      {props.hasActiveFilters && (
        <div className="sm:col-span-2 lg:col-span-5">
          <button
            onClick={props.onClear}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}