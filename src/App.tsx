import ProductGrid from './components/ProductGrid'
import { useCartStore } from './store/cartStore'
import { getItemCount } from './utils/cartCalculations'

export default function App() {
  const items = useCartStore((state) => state.items)
  const itemCount = getItemCount(items)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white">
            Cart: {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <ProductGrid />
      </main>
    </div>
  )
}