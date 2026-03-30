import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import SkeletonCard from '../components/SkeletonCard'
import { formatINR, discountedPrice } from '../utils/currency'
import api from '../services/api'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart, addToWishlist } = useCartContext()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // product data comes from useProducts mock cache; ProductDetail expects raw data
    let mounted = true
    setLoading(true)
    setError(null)
    try {
      ; (async () => {
        try {
          const res = await api.get(`/products/${id}`)
          const p = res?.data
          if (!p) { if (mounted) setError('Product not found') }
          else {
            const mapped = {
              id: p.id,
              title: p.title,
              name: p.title,
              price: p.price,
              discountPercentage: 0,
              image: p.image,
              thumbnail: p.image,
              rating: (p.rating && p.rating.rate) ? p.rating.rate : (typeof p.rating === 'number' ? p.rating : 0),
              ratingCount: (p.rating && p.rating.count) ? p.rating.count : 0,
              category: p.category || '',
              description: p.description || '',
              raw: p
            }
            if (mounted) setProduct(mapped)
          }
        } catch (e) { if (mounted) setError('Failed to load product') }
        if (mounted) setLoading(false)
      })()
    } catch (err) {
      if (mounted) setError(err.message || 'Failed to load product')
      if (mounted) setLoading(false)
    }
    return () => { mounted = false }
  }, [id])

  if (loading) return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SkeletonCard />
    </div>
  )

  if (error) return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-sm text-center border border-[var(--borders)]">
        <div className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Unable to load product</div>
        <div className="text-sm text-[var(--text-secondary)] mb-4">{error}</div>
        <Link to="/products" className="px-4 py-2 btn-primary rounded-md">Back to products</Link>
      </div>
    </div>
  )

  const original = product.price
  const discounted = discountedPrice(original, product.discountPercentage)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-4">
        <div className="text-sm text-[var(--text-secondary)]">Home / Products / Product</div>
        <div className="mt-2">
          <Link to="/products" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:underline"><span>←</span> Back to products</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <motion.div whileHover={{ scale: 1.03 }} className="bg-[var(--card-bg)] rounded-2xl shadow-sm overflow-hidden border border-[var(--borders)]">
          <motion.img
            src={product.image || product.thumbnail || 'https://via.placeholder.com/600'}
            alt={product.title}
            loading="lazy"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/600' }}
            className="w-full h-96 object-contain bg-[var(--bg-secondary)] p-6"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>
        <div className="bg-[var(--card-bg)] rounded-2xl p-6 shadow-sm border border-[var(--borders)]">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{product.title}</h1>
          <div className="mt-2 flex items-center gap-3">
            <div className="text-indigo-600 text-2xl font-semibold">{formatINR(discounted)}</div>
            {product.discountPercentage > 0 && (<div className="text-[var(--text-muted)] line-through">{formatINR(original)}</div>)}
            <div className="text-sm text-[var(--text-secondary)]">Category: <span className="capitalize text-[var(--text-primary)]">{product.category}</span></div>
          </div>
          <div className="mt-3 text-sm text-[var(--text-secondary)]">{product.description || ''}</div>

          <div className="mt-4 flex items-center gap-3">
            <div className="text-sm text-[var(--text-secondary)]">Rating:</div>
            <div className="text-sm text-[var(--text-secondary)]">⭐ {product.rating?.rate ?? product.rating ?? 0} ({product.rating?.count ?? 0})</div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button onClick={() => { addToCart({ id: product.id, name: product.title, price: product.price, image: (product.image || product.thumbnail || 'https://via.placeholder.com/600') }); toast.success('Added to cart') }} className="flex-1 px-4 py-3 rounded-md btn-primary btn-glow">Add to cart</button>
            <button onClick={() => { addToWishlist({ id: product.id, name: product.title, price: product.price, image: (product.image || product.thumbnail || 'https://via.placeholder.com/600') }); toast.success('Added to wishlist') }} className="px-4 py-3 rounded-md border text-[var(--text-primary)]">Add to wishlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}
