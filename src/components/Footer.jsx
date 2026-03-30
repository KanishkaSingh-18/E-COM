import React from 'react'
import { Link } from 'react-router-dom'
import { FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--borders)] bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-[var(--text-secondary)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-indigo-600 grid place-items-center text-white font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                <path fill="currentColor" d="M7 4h10l1.2 6H5.8L7 4zm1.5 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 6h2l1.5 9a2 2 0 002 1.7h6a2 2 0 002-1.7L18 6H4z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-[var(--text-primary)]">E-COM</div>
              <div className="text-xs text-[var(--text-secondary)]">Thoughtful gear for everyday life.</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="text-sm font-medium text-[var(--text-label)]">Follow us</div>
            <div className="flex gap-4 justify-center">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="x" className="p-2 rounded-md text-[var(--text-secondary)] hover:text-indigo-500 hover:scale-110 transition-transform">
                {/* use X / modern branding - FiX is close */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18.364 5.636a1 1 0 10-1.414-1.414L12 9.172 7.05 4.222A1 1 0 105.636 5.636L10.586 10.586 5.636 15.536a1 1 0 001.414 1.414L12 12.414l4.95 4.536a1 1 0 001.414-1.414L13.414 11.172 18.364 6.222z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="instagram" className="p-2 rounded-md text-[var(--text-secondary)] hover:text-pink-500 hover:scale-110 transition-transform">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-xs text-[var(--text-secondary)] mt-4 text-center">© {new Date().getFullYear()} E-COM. All rights reserved.</div>
      </div>
    </footer>
  )
}
