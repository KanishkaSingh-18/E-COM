import { useState, useEffect } from 'react'
import api from '../services/api'

// simple in-memory cache across hook instances
let PRODUCTS_CACHE = null

export default function useProducts({ useCache = true } = {}) {
  const [products, setProducts] = useState(() => PRODUCTS_CACHE || [])
  const [loading, setLoading] = useState(!PRODUCTS_CACHE)
  const [error, setError] = useState(null)

  const fetchProducts = async (force = false) => {
    if (useCache && PRODUCTS_CACHE && !force) {
      setProducts(PRODUCTS_CACHE)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await api.get('/products')
      const data = res?.data || []
      const items = data.map(p => ({
        id: p.id,
        title: p.title,
        // legacy name field
        name: p.title,
        price: p.price,
        // fakestore doesn't provide discountPercentage; default 0
        discountPercentage: 0,
        image: p.image,
        thumbnail: p.image,
        rating: (p.rating && p.rating.rate) ? p.rating.rate : (typeof p.rating === 'number' ? p.rating : 0),
        ratingCount: (p.rating && p.rating.count) ? p.rating.count : 0,
        brand: '',
        category: p.category || '',
        featured: false,
        description: p.description || '',
        raw: p
      }))
      PRODUCTS_CACHE = items
      setProducts(items)
      if (typeof window !== 'undefined' && (import.meta.env && import.meta.env.MODE === 'development')) {
        // eslint-disable-next-line no-console
        console.debug('useProducts: loaded', items.map(i => ({ id: i.id, title: i.title, image: i.image })))
      }
    } catch (err) {
      setError(err?.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // on mount, fetch if not cached
    if (!PRODUCTS_CACHE) fetchProducts()
  }, [])

  return { products, loading, error, refetch: () => fetchProducts(true) }
}
