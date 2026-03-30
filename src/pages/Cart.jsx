import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartItems } = useCartContext()
  const navigate = useNavigate()

  const handleProceed = () => {
    navigate('/checkout')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[var(--text-secondary)]">Home / Products / Cart</div>
            <h2 className="text-2xl font-bold mt-2 text-[var(--text-primary)]">Your Cart</h2>
          </div>
          <div>
            <Link to="/products" className="px-4 py-2 rounded-md btn-primary">Continue shopping</Link>
          </div>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-sm text-center text-[var(--text-secondary)] border border-[var(--borders)]">Your cart is empty. <Link to="/products" className="text-indigo-600">Shop now</Link></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <CartItem key={item.id} item={item} onRemove={removeFromCart} onUpdate={updateQuantity} />
            ))}
          </div>

          <aside className="lg:col-span-1">
            <OrderSummary cart={cart} onProceed={handleProceed} />
            <button onClick={clearCart} className="mt-3 w-full px-4 py-2 rounded text-[var(--text-secondary)]">Clear cart</button>
          </aside>
        </div>
      )}
    </div>
  )
}
