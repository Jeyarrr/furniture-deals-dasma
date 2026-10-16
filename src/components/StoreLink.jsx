import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
}

export function storeDestination(to, location = { search: '', hash: '' }) {
  const url = new URL(to, window.location.origin)
  if (url.pathname.startsWith('/products/')) {
    const params = new URLSearchParams(location.search)
    params.set('product', decodeURIComponent(url.pathname.split('/')[2]))
    return { pathname: '/', search: '?' + params.toString(), hash: location.hash || '#shop' }
  }
  const section = { '/': 'home', '/shop': 'shop', '/collections': 'collections', '/promotions': 'promotions', '/about': 'about', '/contact': 'contact' }[url.pathname] || 'home'
  const retained = new URLSearchParams(location.search)
  retained.delete('product')
  return { pathname: '/', search: url.search || (url.pathname === '/shop' ? '' : retained.toString()), hash: '#' + section }
}

export function StoreLink({ to, children, onClick, ...props }) {
  const location = useLocation()
  const { setDrawerOpen } = useStore()
  if (to === '/inquiry') return <button type="button" {...props} onClick={event => { onClick?.(event); setDrawerOpen(true) }}>{children}</button>
  const destination = storeDestination(to, location)
  const isProduct = to.startsWith('/products/')
  const replacingProduct = isProduct && new URLSearchParams(location.search).has('product')
  return <Link {...props} to={destination} replace={replacingProduct} state={isProduct ? (replacingProduct ? location.state : { productModal: true }) : undefined} onClick={event => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (!isProduct) requestAnimationFrame(() => scrollToSection(destination.hash.slice(1)))
  }}>{children}</Link>
}
