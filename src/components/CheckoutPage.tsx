import { useState } from 'react'
import { z } from 'zod'
import { useCartStore } from '../store/cartStore'
import {
  calculateTotals,
  getItemCount,
} from '../utils/cartCalculations'

type CheckoutPageProps = {
  onBackToCart: () => void
  onOrderComplete: () => void
}

// Validate shipping details
const shippingSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(1, 'Phone number is required'),
  address: z.string().trim().min(1, 'Address is required'),
  city: z.string().trim().min(1, 'City is required'),
  postalCode: z.string().trim().min(1, 'Postal code is required'),
})

type ShippingDetails = z.infer<typeof shippingSchema>

const initialShippingDetails: ShippingDetails = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
}

export default function CheckoutPage({
  onBackToCart,
  onOrderComplete,
}: CheckoutPageProps) {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const [step, setStep] = useState(1)

  const [shipping, setShipping] =
    useState<ShippingDetails>(initialShippingDetails)

  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingDetails, string>>
  >({})

  const [success, setSuccess] = useState(false)

  const totals = calculateTotals(items)
  const itemCount = getItemCount(items)

  // Update shipping details
  function updateShipping(
    field: keyof ShippingDetails,
    value: string,
  ) {
    setShipping((previous) => ({
      ...previous,
      [field]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [field]: '',
    }))
  }

  // Move from cart review to shipping
  function continueToShipping() {
    if (items.length === 0) {
      onBackToCart()
      return
    }

    if (totals.subtotal < 10) {
      return
    }

    setStep(2)
  }

  // Validate shipping details
  function reviewOrder() {
    const result = shippingSchema.safeParse(shipping)

    if (!result.success) {
      const nextErrors: Partial<
        Record<keyof ShippingDetails, string>
      > = {}

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ShippingDetails

        if (!nextErrors[field]) {
          nextErrors[field] = issue.message
        }
      }

      setErrors(nextErrors)
      return
    }

    setErrors({})
    setStep(3)
  }

  // Place the order
  function placeOrder() {
    if (items.length === 0 || totals.subtotal < 10) {
      return
    }

    setSuccess(true)
    clearCart()
  }

  // Order success page
  if (success) {
    return (
      <section className="mx-auto max-w-xl rounded-lg bg-white p-8 text-center shadow">
        <div className="mb-4 text-5xl text-green-600">
          ✓
        </div>

        <h1 className="mb-3 text-2xl font-bold text-green-700">
          Order placed successfully!
        </h1>

        <p className="mb-6 text-gray-600">
          Thank you for your order.
        </p>

        <button
          type="button"
          onClick={onOrderComplete}
          className="rounded bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </section>
    )
  }

  // Empty cart page
  if (items.length === 0) {
    return (
      <section className="rounded-lg bg-white p-8 text-center shadow">
        <h1 className="mb-3 text-2xl font-bold">
          Your cart is empty
        </h1>

        <p className="mb-6 text-gray-600">
          Please add products before checking out.
        </p>

        <button
          type="button"
          onClick={onBackToCart}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Return to Cart
        </button>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">
        Checkout
      </h1>

      {/* Checkout progress */}
      <div className="mb-6 flex flex-wrap gap-3 text-sm">
        {[
          'Cart Review',
          'Shipping',
          'Payment Summary',
        ].map((label, index) => (
          <span
            key={label}
            className={`rounded px-3 py-2 ${
              step === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {index + 1}. {label}
          </span>
        ))}
      </div>

      {/* STEP 1: CART REVIEW */}
      {step === 1 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Cart Review
          </h2>

          <ul className="mb-6 divide-y">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between gap-4 py-3"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>

                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <PriceSummary totals={totals} />

          {totals.subtotal < 10 && (
            <p className="mt-4 text-sm text-red-600">
              Add products worth $
              {(10 - totals.subtotal).toFixed(2)} more
              to reach the $10 minimum checkout value.
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onBackToCart}
              className="rounded border px-4 py-2 hover:bg-gray-100"
            >
              Back to Cart
            </button>

            <button
              type="button"
              onClick={continueToShipping}
              disabled={totals.subtotal < 10}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Continue to Shipping
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SHIPPING DETAILS */}
      {step === 2 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Shipping Details
          </h2>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              reviewOrder()
            }}
            noValidate
            className="space-y-4"
          >
            {(
              [
                ['fullName', 'Full Name'],
                ['email', 'Email'],
                ['phone', 'Phone Number'],
                ['address', 'Address'],
                ['city', 'City'],
                ['postalCode', 'Postal Code'],
              ] as const
            ).map(([field, label]) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="mb-1 block text-sm font-medium"
                >
                  {label}
                </label>

                <input
                  id={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={shipping[field]}
                  onChange={(event) =>
                    updateShipping(field, event.target.value)
                  }
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                />

                {errors[field] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded border px-4 py-2 hover:bg-gray-100"
              >
                Back
              </button>

              <button
                type="submit"
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Review Order
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: PAYMENT SUMMARY */}
      {step === 3 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Payment Summary
          </h2>

          {/* Shipping information */}
          <div className="mb-6 rounded bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold">
              Shipping Details
            </h3>

            <p>{shipping.fullName}</p>
            <p>{shipping.email}</p>
            <p>{shipping.phone}</p>
            <p>{shipping.address}</p>
            <p>{shipping.city}</p>
            <p>{shipping.postalCode}</p>
          </div>

          {/* Order items */}
          <h3 className="mb-3 font-semibold">
            Order Items ({itemCount})
          </h3>

          <ul className="mb-6 divide-y">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between gap-4 py-3"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>

                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          {/* Final price summary */}
          <PriceSummary totals={totals} />

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded border px-4 py-2 hover:bg-gray-100"
            >
              Back to Shipping
            </button>

            <button
              type="button"
              onClick={placeOrder}
              disabled={totals.subtotal < 10 || itemCount === 0}
              className="rounded bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

// Price summary component
function PriceSummary({
  totals,
}: {
  totals: {
    subtotal: number
    tax: number
    discount: number
    total: number
  }
}) {
  return (
    <div className="space-y-2 border-t pt-4">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${totals.subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>Tax (5%)</span>
        <span>${totals.tax.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>Discount</span>
        <span>-${totals.discount.toFixed(2)}</span>
      </div>

      <div className="flex justify-between border-t pt-3 text-lg font-bold">
        <span>Final Total</span>
        <span>${totals.total.toFixed(2)}</span>
      </div>
    </div>
  )
}