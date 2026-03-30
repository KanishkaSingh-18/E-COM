import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiSearch, FiMoon, FiSun } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useCartContext } from '../context/CartContext'
import { useSearch } from '../context/SearchContext'
import useDebounce from '../hooks/useDebounce'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { cart, wishlist } = useCartContext()
  const { query, setQuery } = useSearch()
  const [localQ, setLocalQ] = useState(query || '')
  const debounced = useDebounce(localQ, 300)
  const { currentTheme, toggleTheme } = useTheme()

  useEffect(() => {
    // update global search only when debounced value changes
    setQuery(debounced)
  }, [debounced, setQuery])

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg)] border-b border-[var(--borders)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-indigo-600 grid place-items-center text-white font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                  <path fill="currentColor" d="M7 4h10l1.2 6H5.8L7 4zm1.5 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 6h2l1.5 9a2 2 0 002 1.7h6a2 2 0 002-1.7L18 6H4z" />
                </svg>
              </div>
              <div className="hidden sm:block text-lg font-semibold text-[var(--text-primary)]">E-COM</div>
            </Link>
          </div>

          {/* Center: search bar */}
          <div className="flex-1 px-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <input
                  value={localQ}
                  onChange={(e) => setLocalQ(e.target.value)}
                  className="flex-1 border border-[var(--borders)] rounded-full px-4 py-2 text-sm shadow-sm bg-[var(--card-bg)] text-[var(--text-primary)] focus:outline-none"
                  placeholder="Search"
                />
                <button onClick={() => setQuery(localQ)} className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm">Search</button>
              </div>
            </div>
          </div>

          {/* Right: nav links, icons, theme toggle */}
          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-4">
              <Link to="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Home</Link>
              <Link to="/products" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Products</Link>
            </nav>

            <Link to="/wishlist" className="relative p-2 rounded-md hover:bg-[rgba(0,0,0,0.04)]">
              <FiHeart size={18} className="text-[var(--text-secondary)]" />
              {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 grid place-items-center">{wishlist.length}</span>}
            </Link>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.12 }}
              title={currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-full bg-[var(--card-bg)] text-[var(--text-secondary)] hover:scale-105 border border-[var(--borders)]"
            >
              {currentTheme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
            </motion.button>

            <Link to="/cart" className="relative p-2 rounded-md hover:bg-[rgba(0,0,0,0.04)]">
              <FiShoppingCart size={18} className="text-[var(--text-secondary)]" />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 grid place-items-center">{cart.reduce((s, p) => s + p.qty, 0)}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
