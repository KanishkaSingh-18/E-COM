import React from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useCartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { AiFillHeart, AiFillStar } from 'react-icons/ai'
import { formatINR, discountedPrice } from '../utils/currency'

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist, cart } = useCartContext()

  const inWishlist = wishlist.some(i => i.id === product.id)

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.info('Removed from wishlist')
    } else {
      addToWishlist({ id: product.id, name: product.title, price: product.price, image: product.image })
      toast.success('Added to wishlist')
    }
  }

  const inCart = cart.some(i => i.id === product.id)

  const handleAddToCart = () => {
    addToCart({ id: product.id, title: product.title, price: product.price, image: product.image })
    toast.success('Added to cart')
  }

  const originalPrice = product.price
  const discounted = discountedPrice(originalPrice, product.discountPercentage)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260 }}
      className="relative bg-[var(--card-bg)] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <motion.button
        onClick={toggleWishlist}
        whileTap={{ scale: 0.95 }}
        className="absolute right-3 top-3 z-10 p-2 rounded-full bg-[var(--bg)]/80 shadow-sm text-[var(--text-secondary)]"
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {inWishlist ? <AiFillHeart className="text-red-400" /> : <FiHeart className="text-[var(--text-secondary)]" />}
      </motion.button>

      <Link to={`/products/${product.id}`} className="block group">
        <div className="w-full h-64 bg-[var(--card-bg)] flex items-center justify-center p-6">
          <img src={product.image} alt={product.title} loading="lazy" className="max-h-full w-full object-contain" />
        </div>
      </Link>

      <div className="p-4">
        <h4 className="font-semibold text-sm text-[var(--text-primary)] mb-2 line-clamp-2 h-12 overflow-hidden">{product.title}</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AiFillStar className="text-yellow-400" />
            <div className="text-sm text-[var(--text-secondary)]">{Number(product.rating || 0).toFixed(1)}</div>
          </div>
          <div className="text-indigo-600 font-semibold">{formatINR(originalPrice)}</div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button onClick={handleAddToCart} disabled={false} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-white ${inCart ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-500'} transition-all duration-300`}>
            <FiShoppingCart />
            <span className="text-sm">{inCart ? 'Add again' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
