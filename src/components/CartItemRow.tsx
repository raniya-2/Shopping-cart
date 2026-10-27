import type { CartItem } from '../schemas/product'
import { MAX_QUANTITY, MIN_QUANTITY } from '../store/cartStore'
import { getItemTotal } from '../utils/cartCalculations'

type CartItemRowProps = {
  item: CartItem
  onIncrease: (productId: number) => void
  onDecrease: (productId: number) => void
  onRemove: (productId: number) => void
}

const qtyButtonClass =
  'h-8 w-8 rounded border border-gray-300 text-lg font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent'

export default function CartItemRow({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  return (
    <li className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="h-20 w-20 rounded bg-gray-50 object-contain"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.title}</h3>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onDecrease(item.id)}
          disabled={item.quantity <= MIN_QUANTITY}
          aria-label={`Decrease quantity of ${item.title}`}
          className={qtyButtonClass}
        >
          −
        </button>
        <span className="w-6 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => onIncrease(item.id)}
          disabled={item.quantity >= MAX_QUANTITY}
          aria-label={`Increase quantity of ${item.title}`}
          className={qtyButtonClass}
        >
          +
        </button>
      </div>

      <p className="w-24 font-bold text-gray-900 sm:text-right">
        ${getItemTotal(item).toFixed(2)}
      </p>

      <button
        onClick={() => onRemove(item.id)}
        className="text-sm font-medium text-red-600 hover:underline"
      >
        Remove
      </button>
    </li>
  )
}