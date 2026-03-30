import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:bg-gradient-to-r dark:from-[#0B1220] dark:via-[#0F172A] dark:to-[#111827] fade-in-up">
        {/* subtle overlay for readability (dark mode) */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none dark:bg-black/20" />

        {/* subtle purple glow for premium accent */}
        <div className="absolute right-8 top-8 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl pointer-events-none" aria-hidden />

        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 px-2 py-1 rounded">New season</span>
              <h1 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white max-w-xl">Thoughtful gear for everyday life.</h1>
              <p className="mb-6 text-gray-600 dark:text-gray-300 max-w-xl">Minimal hardware, soft materials, and detail you notice in hand — curated like your favorite storefront.</p>

              <div className="mt-6 flex items-center gap-4">
                <Link to="/products" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-lg">Shop all →</Link>
                <Link to="/products" className="inline-flex items-center gap-2 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg border border-[var(--borders)]">Browse</Link>
              </div>
            </div>

            {/* kept for layout balance — simple decorative illustration, not an empty box */}
            <div className="hidden md:flex items-center justify-center">
              <svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect x="0" y="0" width="240" height="160" rx="12" fill="url(#g)" />
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#7C3AED" stopOpacity="0.12" />
                    <stop offset="1" stopColor="#6366F1" stopOpacity="0.06" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
