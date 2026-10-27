import { useCartStore } from '../store/cartStore'
import { calculateTotals, MIN_CHECKOUT_VALUE } from '../utils/cartCalculations'
import CartItemRow from './CartItemRow'
import CartSummary from './CartSummary'

type CartPageProps = {
  onBackToProducts: () => void
  onCheckout: () => void
}

export default function CartPage({ onBackToProducts, onCheckout }: CartPageProps) {
  const items = useCartStore((state) => state.items)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)

  const totals = calculateTotals(items)
  const amountNeeded = Math.round((MIN_CHECKOUT_VALUE - totals.subtotal) * 100) / 100

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-gray-600">Your cart is empty.</p>
        <button
          onClick={onBackToProducts}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Browse products
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
        <button onClick={clearCart} className="text-sm font-medium text-red-600 hover:underline">
          Clear cart
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </ul>

        <div className="space-y-4">
          <CartSummary totals={totals} />

          {!totals.canCheckout && (
            <p className="rounded border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
              Checkout is disabled because the minimum checkout value is $
              {MIN_CHECKOUT_VALUE.toFixed(2)}. Add ${amountNeeded.toFixed(2)} more to continue.
            </p>
          )}

          <button
            onClick={onCheckout}
            disabled={!totals.canCheckout}
            className="w-full rounded bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={onBackToProducts}
            className="w-full rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  )
}