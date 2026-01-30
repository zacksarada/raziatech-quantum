// src/app/page.tsx
export default function Home() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">RaziaTech Marketplace</h1>
      <p className="text-gray-600 mb-8">Digital Products Platform</p>
      <div className="space-x-4">
        <a href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Browse Products
        </a>
        <a href="/admin" className="border border-gray-300 px-6 py-3 rounded-lg">
          Admin Panel
        </a>
      </div>
    </div>
  )
}
