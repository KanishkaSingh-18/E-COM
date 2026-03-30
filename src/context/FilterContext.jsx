import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

const FilterContext = createContext()

export function FilterProvider({ children }) {
  const [categories, setCategories] = useState([])
  // single selection: 'all' means no category filter
  const [selectedCategory, setSelectedCategory] = useState('all')
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

  // select a single category. if same category is clicked again, reset to 'all'
  const selectCategory = (cat) => {
    setSelectedCategory(prev => (prev === cat ? 'all' : cat))
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setPriceRange(null)
    setSort('')
  }

  return (
    <FilterContext.Provider value={{ categories, selectedCategory, selectCategory, priceRange, setPriceRange, sort, setSort, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
