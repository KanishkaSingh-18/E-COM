import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

const FilterContext = createContext()

export function FilterProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([]) // multi-select
  const [priceRange, setPriceRange] = useState(null) // e.g. '0-50'
  const [sort, setSort] = useState('') // 'price-asc' | 'price-desc' | 'rating'

  useEffect(() => {
    let mounted = true
    const fetchCategories = async () => {
      try {
        const res = await api.get('/products/categories')
        if (mounted) setCategories(res.data || [])
      } catch (err) {
        // fallback common categories
        if (mounted) setCategories(['electronics', 'jewelery', 'men clothing', 'women clothing'])
      }
    }
    fetchCategories()
    return () => { mounted = false }
  }, [])

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange(null)
    setSort('')
  }

  return (
    <FilterContext.Provider value={{ categories, selectedCategories, toggleCategory, priceRange, setPriceRange, sort, setSort, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
