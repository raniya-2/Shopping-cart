
import { useState } from 'react'

import CartPage from './components/CartPage'
import CheckoutPage from './components/CheckoutPage'
import ProductGrid from './components/ProductGrid'

import { useCartStore } from './store/cartStore'
import { getItemCount } from './utils/cartCalculations'

type View = 'products' | 'cart' | 'checkout'

export default function App() {
  const [view, setView] = useState<View>('products')

  // Get cart items from Zustand store
  const items = useCartStore((state) => state.items)

  // Calculate the total number of cart items
  const itemCount = getItemCount(items)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Website title */}
          <button
            type="button"
            onClick={() => setView('products')}
            className="text-2xl font-bold text-gray-900"
          >
            Shopping Cart
          </button>

          {/* Cart button */}
          <button
            type="button"
            onClick={() => setView('cart')}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Cart: {itemCount}{' '}
            {itemCount === 1 ? 'item' : 'items'}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* PRODUCTS PAGE */}
        {view === 'products' && <ProductGrid />}

        {/* CART PAGE */}
        {view === 'cart' && (
          <CartPage
            onBackToProducts={() => setView('products')}
            onCheckout={() => setView('checkout')}
          />
        )}

        {/* CHECKOUT PAGE */}
        {view === 'checkout' && (
          <CheckoutPage
            onBackToCart={() => setView('cart')}
            onOrderComplete={() => setView('products')}
          />
        )}
      </main>
    </div>
  )
}

