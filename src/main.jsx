import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'
import ToastProvider from './components/ToastProvider'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { SearchProvider } from './context/SearchContext'
import { FilterProvider } from './context/FilterContext'
import { ThemeProvider } from './context/ThemeContext'

// Ensure the saved theme is applied immediately to avoid a flash of incorrect theme.
try {
  const saved = localStorage.getItem('ecom_theme_v1')
  if (saved === 'dark' || saved === 'darkAdventure') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
} catch (e) {
  // ignore
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SearchProvider>
          <FilterProvider>
            <CartProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </CartProvider>
          </FilterProvider>
        </SearchProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
