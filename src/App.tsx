import ProductGrid from './components/ProductGrid'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <ProductGrid />
      </main>
    </div>
  )
}