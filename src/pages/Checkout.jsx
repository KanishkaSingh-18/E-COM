import React from 'react'
import { useCartContext } from '../context/CartContext'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name too short'),
  email: yup.string().required('Email is required').email('Invalid email'),
  address: yup.string().required('Address is required').min(8, 'Please provide a full address')
}).required()

export default function Checkout() {
  const { cart, clearCart } = useCartContext()
  const subtotal = cart.reduce((s, p) => s + (p.price * (p.qty || 0)), 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', address: '' }
  })

  const onSubmit = async (data) => {
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    try {
      // Simulate order processing
      await new Promise(r => setTimeout(r, 700))
      toast.success('Order placed successfully')
      clearCart()
    } catch (err) {
      toast.error('Failed to place order')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4">
        <div className="text-sm text-[var(--text-secondary)]">Home / Products / Checkout</div>
        <div className="mt-2">
          <a href="/" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:underline">← Back to home</a>
        </div>
        <h2 className="text-2xl font-bold mt-2 mb-6 text-[var(--text-primary)]">Checkout</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 bg-[var(--card-bg)] rounded-2xl p-6 shadow-sm border border-[var(--borders)]">
          <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Shipping details</h3>

          <div className="grid grid-cols-1 gap-4">
            <label className="block">
              <div className="text-sm font-medium mb-1 text-[var(--text-secondary)]">Full name</div>
              <input {...register('name')} className={`w-full border border-[var(--borders)] px-3 py-2 rounded ${errors.name ? 'border-red-500' : ''} bg-[var(--card-bg)] text-[var(--text-primary)] neon-ring`} />
              {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name.message}</div>}
            </label>

            <label className="block">
              <div className="text-sm font-medium mb-1 text-[var(--text-secondary)]">Email</div>
              <input {...register('email')} className={`w-full border border-[var(--borders)] px-3 py-2 rounded ${errors.email ? 'border-red-500' : ''} bg-[var(--card-bg)] text-[var(--text-primary)] neon-ring`} />
              {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email.message}</div>}
            </label>

            <label className="block">
              <div className="text-sm font-medium mb-1 text-[var(--text-secondary)]">Address</div>
              <textarea {...register('address')} rows={4} className={`w-full border border-[var(--borders)] px-3 py-2 rounded ${errors.address ? 'border-red-500' : ''} bg-[var(--card-bg)] text-[var(--text-primary)] neon-ring`} />
              {errors.address && <div className="text-xs text-red-500 mt-1">{errors.address.message}</div>}
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button type="submit" disabled={isSubmitting} className="px-6 py-3 btn-primary rounded disabled:opacity-60">Place order</button>
            <div className="text-sm text-[var(--text-secondary)]">You will be redirected to the confirmation page</div>
          </div>
        </form>

        <aside className="lg:col-span-1">
          <OrderSummary cart={cart} onProceed={() => { /* no-op, same page */ }} />
        </aside>
      </div>
    </div>
  )
}
