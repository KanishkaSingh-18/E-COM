import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ProductGrid from '../components/ProductGrid'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero />

        <section className="mt-8">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <div className="text-sm text-indigo-600 font-semibold">Hand-picked</div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">Featured</h2>
              <div className="text-sm text-[var(--text-secondary)] mt-1">Hand-picked from this week's lineup.</div>
            </div>
            <div>
              <a href="/products" className="text-indigo-600">View products →</a>
            </div>
          </div>

          <div className="mt-6">
            <ProductGrid featured limit={4} />
          </div>
        </section>
      </main>
    </div>
  )
}
