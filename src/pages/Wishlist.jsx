import React from 'react'
import { Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist } = useCartContext()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4">
        <div className="text-sm text-[var(--text-secondary)]">Home / Products / Wishlist</div>
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Your Wishlist</h2>
          <a href="/products" className="px-4 py-2 rounded-md btn-primary">Continue shopping</a>
        </div>
      </div>
      {wishlist.length === 0 ? (
        <div className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-sm text-center text-[var(--text-secondary)] border border-[var(--borders)]">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4"><path d="M12 21s-6.716-4.435-9.318-7.225C.98 10.982 3.108 6.5 7.5 6.5c2.163 0 3.3 1.325 4.5 2.75C12.2 7.825 13.337 6.5 15.5 6.5 19.892 6.5 22.02 10.982 21.318 13.775 18.716 16.565 12 21 12 21z" stroke="#7C3AED" strokeWidth="0.6" /></svg>
          <div className="text-lg font-semibold mb-2 text-[var(--text-primary)]">No items in your wishlist</div>
          <div className="text-sm mb-4 text-[var(--text-secondary)]">Save items you love and find them here later.</div>
          <Link to="/products" className="px-4 py-2 btn-primary rounded-md">Browse products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {wishlist.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  )
}
