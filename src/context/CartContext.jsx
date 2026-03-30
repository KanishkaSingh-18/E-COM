import React, { createContext, useContext, useMemo } from 'react'
import useCart from '../hooks/useCart'
import useWishlist from '../hooks/useWishlist'

const CartContext = createContext()

export function CartProvider({ children }) {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()

  // Expose standardized shapes requested by the audit while keeping the
  // internal implementation backwards-compatible (id, qty)
  const cartItems = useMemo(() => cart.map(i => ({ productId: i.id, quantity: i.qty || 1, price: i.price, title: i.title || i.name, image: i.image })), [cart])
  const wishlistItems = useMemo(() => wishlist.map(i => ({ productId: i.id, title: i.title || i.name, image: i.image })), [wishlist])

  return (
    <CartContext.Provider value={{
      // legacy shape (for existing consumers)
      cart,
      // standardized shape (audit requirement)
      cartItems,
      wishlist,
      wishlistItems,
      // actions
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext)
