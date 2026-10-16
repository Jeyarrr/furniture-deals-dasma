import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Heart, MessageCircle, Minus, Plus, X } from 'lucide-react'
import { products, categoryName } from '../data/catalog'
import { business } from '../data/business'
import { useStore } from '../context/StoreContext'
import { useModal } from '../hooks/useModal'
import { displayPrice } from '../utils/price'

export function ProductModal() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const slug = params.get('product')
  const product = products.find(item => item.slug === slug)
  const dialog = useModal(Boolean(slug))
  const [imageIndex, setImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addInquiry, favorites, toggleFavorite } = useStore()
  useEffect(() => { setImageIndex(0); setQuantity(1) }, [slug])
  const close = () => {
    if (location.state?.productModal) navigate(-1)
    else { const next = new URLSearchParams(location.search); next.delete('product'); navigate({ pathname: '/', search: next.toString(), hash: location.hash }, { replace: true }) }
  }
  const saved = product && favorites.includes(product.id)
  return <dialog ref={dialog} className="product-modal" aria-labelledby="product-modal-title" onCancel={event => { event.preventDefault(); close() }} onClick={event => { if (event.target === event.currentTarget) close() }}>
    <div className="product-modal-shell"><div className="product-modal-bar"><span>FURNITURE DEALS DASMA</span><button className="round-button" autoFocus onClick={close} aria-label="Close product details"><X size={21} /></button></div>
      {product ? <div className="product-modal-grid"><div className="gallery"><div className="gallery-main"><img src={product.images[Math.min(imageIndex, product.images.length - 1)]} alt={product.name + ' — view ' + (imageIndex + 1)} /></div><div className="gallery-thumbs">{product.images.map((image, i) => <button key={image} className={i === imageIndex ? 'active' : ''} onClick={() => setImageIndex(i)} aria-label={'View image ' + (i + 1)} aria-pressed={i === imageIndex}><img src={image} alt="" /></button>)}</div></div><div className="detail-info"><p className="eyebrow">{categoryName(product.category)}</p><h2 id="product-modal-title">{product.name}</h2><p className="detail-price">{displayPrice(product)}</p>{product.priceSource === "photo" && <p className="photo-price-note">Price printed in the original photo. Confirm the current price with the showroom.</p>}<p className="detail-description">{product.description}</p>{product.imageEdited && <p className="photo-edit-note">Photo edited to remove advertising. Confirm finishes and included pieces with the showroom.</p>}<dl className="spec-list"><div><dt>Availability</dt><dd>{product.availability || 'Ask the showroom'}</dd></div><div><dt>Dimensions</dt><dd>{product.dimensions || 'Ask the showroom'}</dd></div><div><dt>Material</dt><dd>{product.materials || 'Ask the showroom'}</dd></div><div><dt>Colors</dt><dd>{product.colors.length ? product.colors.join(', ') : 'Ask the showroom'}</dd></div></dl><div className="quantity-row"><span>Quantity for inquiry</span><div><button disabled={quantity <= 1} onClick={() => setQuantity(value => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={16} /></button><strong>{quantity}</strong><button onClick={() => setQuantity(value => value + 1)} aria-label="Increase quantity"><Plus size={16} /></button></div></div><div className="detail-actions"><button className="button button-dark" onClick={() => addInquiry(product, quantity)}>Add to inquiry <ArrowRight size={18} /></button><button className={'detail-heart ' + (saved ? 'saved' : '')} onClick={() => toggleFavorite(product.id)} aria-pressed={saved} aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}><Heart size={20} fill={saved ? 'currentColor' : 'none'} /></button></div><a className="messenger-text-link" href={business.messengerUrl} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Ask the showroom on Facebook</a><p className="inquiry-hint">Mention “{product.name}” when you message the store.</p></div></div> : <div className="product-modal-missing"><h2 id="product-modal-title">This furniture could not be found.</h2><p>The saved product link may have changed.</p><button className="button button-dark" onClick={close}>Continue browsing</button></div>}
    </div>
  </dialog>
}
