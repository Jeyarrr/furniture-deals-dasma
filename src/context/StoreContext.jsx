import { createContext, useContext, useEffect, useState } from 'react'
import { products } from '../data/catalog'

const StoreContext = createContext(null)
const read = (key, fallback) => {
  try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : fallback } catch { return fallback }
}
const knownId = id => products.some(product => product.id === id)
const persist = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* Browsing still works when storage is unavailable. */ } }

export function StoreProvider({ children }) {
  const [inquiry, setInquiry] = useState(() => read('fdd-inquiry', []).filter(item => item && knownId(item.id) && Number.isInteger(item.quantity) && item.quantity > 0))
  const [favorites, setFavorites] = useState(() => read('fdd-favorites', []).filter(knownId))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toast, setToast] = useState('')
  useEffect(() => { persist('fdd-inquiry', inquiry) }, [inquiry])
  useEffect(() => { persist('fdd-favorites', favorites) }, [favorites])
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 3500); return () => clearTimeout(t) }, [toast])
  const addInquiry = (product, quantity = 1) => {
    setInquiry(items => {
      const existing = items.find(item => item.id === product.id)
      return existing ? items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { id: product.id, quantity }]
    })
    setToast(`${product.name} added to your inquiry list`)
    setDrawerOpen(true)
  }
  const updateQuantity = (id, quantity) => setInquiry(items => quantity < 1 ? items.filter(item => item.id !== id) : items.map(item => item.id === id ? { ...item, quantity } : item))
  const removeInquiry = id => setInquiry(items => items.filter(item => item.id !== id))
  const toggleFavorite = id => setFavorites(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id])
  return <StoreContext.Provider value={{ inquiry, favorites, toast, setToast, drawerOpen, setDrawerOpen, addInquiry, updateQuantity, removeInquiry, clearInquiry: () => setInquiry([]), toggleFavorite }}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
