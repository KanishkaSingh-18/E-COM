import React from 'react'
import ProductCard from './ProductCard'
import SkeletonCard from './SkeletonCard'
import useProducts from '../hooks/useProducts'
import { useSearch } from '../context/SearchContext'
import { useFilter } from '../context/FilterContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductGrid({ featured = false, limit = 0 }) {
  const { products, loading, error, refetch } = useProducts()
  const { query } = useSearch()
  const { selectedCategory, priceRange, sort } = useFilter()

  const filtered = products.filter(p => {
    const title = (p.title || p.name || '').toString()
    const description = (p.description || '').toString()
    const category = (p.category || p.raw?.category || '').toString()
    if (query) {
      const q = query.toString().toLowerCase()
      const hay = `${title} ${description} ${category}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    if (selectedCategory && selectedCategory !== 'all') {
      const cat = (p.raw?.category || p.category || '').toLowerCase()
      if (cat !== selectedCategory.toLowerCase()) return false
    }
    if (priceRange) {
      // priceRange may be a numeric max value or a string; support both
      const maxVal = typeof priceRange === 'number' ? priceRange : (Number(priceRange) || Infinity)
      if (!(p.price <= maxVal)) return false
    }
    return true
  })

  if (sort) {
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price)
    if (sort === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="bg-[var(--card-bg)] p-6 rounded-xl card-shadow text-center border border-[var(--borders)]">
          <div className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Unable to load products</div>
          <div className="text-sm text-[var(--text-secondary)] mb-4">{error}</div>
          <button onClick={refetch} className="px-4 py-2 btn-primary rounded-md">Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {loading ? (
        <div className={featured ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {filtered.length === 0 ? (
            <div className="bg-[var(--card-bg)] p-6 rounded-xl card-shadow text-center border border-[var(--borders)]">
              <div className="text-lg font-semibold mb-2 text-[var(--text-primary)]">No results found</div>
              {query ? (
                <div className="text-sm text-[var(--text-secondary)]">No products found for '{query}'. Try adjusting your search or filters.</div>
              ) : (
                <div className="text-sm text-[var(--text-secondary)]">Try adjusting your filters.</div>
              )}
            </div>
          ) : (
            <motion.div layout className={featured ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
              <AnimatePresence initial={false} mode="popLayout">
                {(limit && filtered.length > limit ? filtered.slice(0, limit) : filtered).map(p => (
                  <motion.div key={p.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6, transition: { duration: 0 } }} transition={{ duration: 0.18 }}>
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}
