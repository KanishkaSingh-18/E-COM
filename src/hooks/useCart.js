import { useState, useEffect, useCallback } from 'react'

const CART_KEY = 'ecom_cart_v1'

export default function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)) } catch { }
  }, [cart])

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
      return [...prev, { ...product, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }, [])

  const updateQuantity = useCallback((id, qty) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p).filter(p => p.qty > 0))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart }
}

