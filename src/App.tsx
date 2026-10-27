import { useState } from 'react'
import CartPage from './components/CartPage'
import ProductGrid from './components/ProductGrid'
import { useCartStore } from './store/cartStore'
import { getItemCount } from './utils/cartCalculations'

type View = 'products' | 'cart'

export default function App() {
  const [view, setView] = useState<View>('products')
  const items = useCartStore((state) => state.items)
  const itemCount = getItemCount(items)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <button
            onClick={() => setView('products')}
            className="text-2xl font-bold text-gray-900"
          >
            Shopping Cart
          </button>
          <button
            onClick={() => setView('cart')}
            className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
          >
            Cart: {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {view === 'products' ? (
          <ProductGrid />
        ) : (
          <CartPage
            onBackToProducts={() => setView('products')}
            onCheckout={() => console.log('Checkout comes in Phase 7')}
          />
        )}
      </main>
    </div>
  )
}