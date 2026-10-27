import type { Product } from '../schemas/product'

type ProductCardProps = {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-40 w-full rounded object-contain bg-gray-50"
      />
      <p className="mt-3 text-xs uppercase tracking-wide text-gray-500">
        {product.category}
      </p>
      <h3 className="mt-1 text-base font-semibold text-gray-900">{product.title}</h3>
      <p className="mt-1 text-sm text-yellow-600">★ {product.rating.toFixed(1)}</p>
      <p className="mt-2 text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  )
}