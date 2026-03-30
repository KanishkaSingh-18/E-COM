import React, { useMemo, useState, useEffect } from 'react'
import { useFilter } from '../context/FilterContext'
import useProducts from '../hooks/useProducts'
import { formatINR } from '../utils/currency'

export default function Sidebar({ mobile = false }) {
  const { categories, selectedCategory, selectCategory, priceRange, setPriceRange, sort, setSort, clearFilters } = useFilter()
  const { products } = useProducts()

  const maxPrice = useMemo(() => {
    if (!products || products.length === 0) return 1000
    return Math.ceil(Math.max(...products.map(p => Number(p.price || 0))))
  }, [products])

  const [localMax, setLocalMax] = useState(priceRange || maxPrice)

  useEffect(() => {
    // sync when products load
    if (!priceRange) setLocalMax(maxPrice)
  }, [maxPrice])

  const rootClass = mobile ? 'block w-full p-4' : 'hidden md:block w-72 p-4'

  return (
    <aside className={rootClass}>
      <div className={mobile ? '' : 'sticky top-20'}>
        <div className="bg-[var(--card-bg)] border border-[var(--borders)] rounded-xl p-6 shadow-sm text-[var(--text-primary)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-label)]">Filters</h3>
            <button onClick={clearFilters} className="text-xs text-indigo-600">Clear</button>
          </div>

          <div className="space-y-6 text-sm">
            <div>
              <div className="font-medium mb-3 text-[var(--text-label)]">CATEGORY</div>
              <div className="flex flex-col gap-2">
                <button onClick={() => selectCategory('all')} className={`text-left px-3 py-2 rounded ${selectedCategory === 'all' ? 'bg-indigo-50 text-indigo-700' : 'text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.02)]'}`}>All</button>
                {categories.map(cat => {
                  const active = selectedCategory === cat
                  return (
                    <button key={cat} onClick={() => selectCategory(cat)} className={`text-left px-3 py-2 rounded ${active ? 'bg-indigo-600 text-white' : 'text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.02)]'}`}>
                      {cat}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <div className="font-medium mb-3 text-[var(--text-label)]">MAX PRICE</div>
              <div className="flex items-center gap-3">
                <input type="range" min="0" max={maxPrice} value={localMax} onChange={(e) => setLocalMax(Number(e.target.value))} onMouseUp={() => setPriceRange(localMax)} onTouchEnd={() => setPriceRange(localMax)} className="w-full" />
                <div className="text-sm text-[var(--text-secondary)]">{formatINR(localMax)} Under</div>
              </div>
            </div>

            <div>
              <div className="font-medium mb-3 text-[var(--text-label)]">SORT</div>
              <div>
                <select value={sort || ''} onChange={(e) => setSort(e.target.value)} className="w-full rounded px-3 py-2 text-sm bg-gray-800 text-white hover:bg-gray-700 border border-gray-700">
                  <option value="">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
