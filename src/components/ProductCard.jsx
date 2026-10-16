import { useState } from 'react'
import { StoreLink as Link } from './StoreLink'
import { ArrowUpRight, Heart, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { categoryName } from '../data/catalog'
import { useStore } from '../context/StoreContext'
import { displayPrice } from '../utils/price'

export function ProductCard({ product, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addInquiry, favorites, toggleFavorite } = useStore()
  const saved = favorites.includes(product.id)
  return <motion.article className="product-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .45, delay: Math.min(index * .06, .3) }}>
    <div className="product-image-wrap"><Link to={`/products/${product.slug}`} className="product-image-link" aria-label={`View ${product.name}`}>{!imageLoaded && <span className="image-skeleton" aria-hidden="true" />}<img src={product.images[0]} alt={product.name} loading="lazy" onLoad={() => setImageLoaded(true)} onError={e => { e.currentTarget.onerror = null; if (!e.currentTarget.src.endsWith('/images/confirmed/logo-facebook.jpg')) e.currentTarget.src = '/images/confirmed/logo-facebook.jpg'; setImageLoaded(true) }} /></Link><button className={`favorite-button ${saved ? 'saved' : ''}`} onClick={() => toggleFavorite(product.id)} aria-label={saved ? `Remove ${product.name} from favorites` : `Save ${product.name} to favorites`} aria-pressed={saved}><Heart size={19} fill={saved ? 'currentColor' : 'none'} /></button></div>
    <div className="product-card-info"><div><p className="product-category">{categoryName(product.category)}</p><Link className="product-name" to={`/products/${product.slug}`}>{product.name}</Link><p className="product-price">{displayPrice(product)}</p>{product.priceSource === "photo" && <small className="photo-price-note">Photo price · Confirm with store</small>}</div></div>
    <div className="product-card-actions"><Link className="card-detail-link" to={`/products/${product.slug}`}>View details <ArrowUpRight size={15} /></Link><button className="quick-add" onClick={() => addInquiry(product)} aria-label={`Inquire now about ${product.name}`}>Inquire now <Plus size={15} /></button></div>
  </motion.article>
}

export function ProductGrid({ products: items }) { return <div className="product-grid">{items.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> }
