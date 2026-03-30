import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ProductGrid from '../components/ProductGrid'
import { useFilter } from '../context/FilterContext'

export default function Products() {
  const [showFilters, setShowFilters] = useState(false)
  const { sort, setSort } = useFilter()

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <Sidebar />
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">All Products</h2>
              <div className="flex items-center gap-3">
                <div className="hidden sm:block">
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-[var(--borders)] bg-gray-800 text-white hover:bg-gray-700 rounded px-3 py-2 text-sm">
                    <option value="">Sort</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
                <button onClick={() => setShowFilters(true)} className="sm:hidden px-3 py-2 border rounded text-[var(--text-primary)]">Filters</button>
              </div>
            </div>

            <ProductGrid />
          </div>
        </div>

        {/* Mobile filter drawer */}
        {showFilters && (
          <div className="fixed inset-0 bg-black/40 z-50 sm:hidden" onClick={() => setShowFilters(false)}>
            <div className="absolute left-0 top-0 w-3/4 h-full bg-[var(--card-bg)] p-4 rounded-r-2xl shadow-sm" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-sm text-[var(--text-secondary)]">Close</button>
              </div>
              <Sidebar mobile />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
