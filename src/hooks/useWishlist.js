import { useState, useEffect, useCallback } from 'react'

const WISHLIST_KEY = 'ecom_wishlist_v1'

export default function useWishlist() {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)) } catch { }
  }, [wishlist])

  const addToWishlist = useCallback((product) => {
    setWishlist(prev => prev.find(p => p.id === product.id) ? prev : [...prev, product])
  }, [])

  const removeFromWishlist = useCallback((id) => {
    setWishlist(prev => prev.filter(p => p.id !== id))
  }, [])

  return { wishlist, addToWishlist, removeFromWishlist }
}
