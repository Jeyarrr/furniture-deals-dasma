import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { categories, categoryName, products } from '../data/catalog'
import { ProductGrid } from '../components/ProductCard'
import { SectionHeading } from '../components/Shared'
import { useStore } from '../context/StoreContext'
import { effectivePrice } from '../utils/price'

export function Shop() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const setParams = next => navigate({ pathname: '/', search: new URLSearchParams(next).toString(), hash: '#shop' }, { replace: true })
  const [visible, setVisible] = useState(8)
  const { favorites } = useStore()
  const query = params.get('q') || ''
  const category = params.get('category') || ''
  const featured = params.get('featured') === '1'
  const favoritesOnly = params.get('favorites') === '1'
  const sort = params.get('sort') || 'name-asc'
  const min = params.get('min') || ''
  const max = params.get('max') || ''
  useEffect(() => setVisible(8), [query, category, featured, favoritesOnly, sort, min, max])
  const hasPricedProducts = products.some(p => effectivePrice(p) != null)
  const setParam = (key, value) => { const next = new URLSearchParams(params); value ? next.set(key, value) : next.delete(key); setParams(next); setVisible(8) }
  const filtered = useMemo(() => {
    const result = products.filter(p => {
      if (query && !`${p.name} ${p.description} ${categoryName(p.category)}`.toLowerCase().includes(query.toLowerCase())) return false
      if (category && p.category !== category) return false
      if (featured && !p.featured) return false
      if (favoritesOnly && !favorites.includes(p.id)) return false
      if ((min || max) && effectivePrice(p) == null) return false
      if (min && effectivePrice(p) < Number(min)) return false
      if (max && effectivePrice(p) > Number(max)) return false
      return true
    })
    result.sort((a, b) => {
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'price-asc') return (effectivePrice(a) ?? Infinity) - (effectivePrice(b) ?? Infinity) || a.name.localeCompare(b.name)
      if (sort === 'price-desc') return (effectivePrice(b) ?? -Infinity) - (effectivePrice(a) ?? -Infinity) || a.name.localeCompare(b.name)
      return a.name.localeCompare(b.name)
    })
    return result
  }, [query, category, featured, favoritesOnly, favorites, sort, min, max])
  return <><section id="shop" className="section shop-section"><div className="container"><SectionHeading eyebrow="EXPLORE THE SHOWROOM" title="Find your kind of furniture." description="Search, save, and take a closer look. Tap any piece to open its details without leaving this page." /><div className="shop-toolbar"><div className="shop-search"><Search size={19} /><input type="search" value={query} onChange={e => setParam('q', e.target.value)} placeholder="Search furniture" aria-label="Search furniture" /></div><div className="sort-wrap"><label htmlFor="sort">Sort by</label><select id="sort" value={sort} onChange={e => setParam('sort', e.target.value)}><option value="name-asc">Name A–Z</option><option value="name-desc">Name Z–A</option>{hasPricedProducts && <><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></>}</select></div></div><div className="shop-body"><aside className="filters"><div className="filter-title"><SlidersHorizontal size={19} /><h2>Filters</h2></div><div className="filter-group"><h3>Category</h3><button className={!category ? 'selected' : ''} onClick={() => setParam('category', '')}>All furniture <span>{products.length}</span></button>{categories.map(c => <button key={c.slug} className={category === c.slug ? 'selected' : ''} onClick={() => setParam('category', c.slug)}>{c.name}<span>{products.filter(p => p.category === c.slug).length}</span></button>)}</div><div className="filter-group"><h3>Show</h3><label className="check-row"><input type="checkbox" checked={featured} onChange={e => setParam('featured', e.target.checked ? '1' : '')} /> Featured furniture</label><label className="check-row"><input type="checkbox" checked={favoritesOnly} onChange={e => setParam('favorites', e.target.checked ? '1' : '')} /> My favorites</label></div><div className="filter-group"><h3>Photo price range</h3>{hasPricedProducts ? <div className="price-range"><input type="number" min="0" placeholder="Min ₱" aria-label="Minimum price" value={min} onChange={e => setParam('min', e.target.value)} /><input type="number" min="0" placeholder="Max ₱" aria-label="Maximum price" value={max} onChange={e => setParam('max', e.target.value)} /></div> : <p className="filter-explainer">Ask the showroom for prices.</p>}</div><button className="clear-filters" onClick={() => { setParams({}); setVisible(8) }}><X size={16} /> Clear filters</button></aside><div className="shop-results"><div className="results-heading"><p><strong>{filtered.length}</strong> {filtered.length === 1 ? 'piece' : 'pieces'}{category && <> in {categoryName(category)}</>}</p><span>FURNITURE COLLECTION</span></div>{filtered.length ? <><ProductGrid products={filtered.slice(0, visible)} />{visible < filtered.length && <button className="button button-outline load-more" onClick={() => setVisible(v => v + 8)}>LOAD MORE</button>}</> : <div className="empty-state"><Search size={34} /><h2>No furniture found</h2><p>Try another search or clear the filters to see all furniture.</p><button className="button button-dark" onClick={() => { setParams({}); setVisible(8) }}>CLEAR FILTERS</button></div>}</div></div></div></section></>
}
