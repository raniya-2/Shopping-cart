import type { CartTotals } from '../utils/cartCalculations'

type CartSummaryProps = {
  totals: CartTotals
}

export default function CartSummary({ totals }: CartSummaryProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">Price Summary</h2>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-600">Subtotal</dt>
          <dd>${totals.subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Tax (5%)</dt>
          <dd>${totals.tax.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Discount (10% over $100)</dt>
          <dd className={totals.discount > 0 ? 'text-green-600' : ''}>
            -${totals.discount.toFixed(2)}
          </dd>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold">
          <dt>Final total</dt>
          <dd>${totals.total.toFixed(2)}</dd>
        </div>
      </dl>
    </div>
  )
}