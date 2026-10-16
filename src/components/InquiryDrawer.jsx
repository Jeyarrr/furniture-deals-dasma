import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Copy, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { StoreLink as Link } from './StoreLink'
import { products } from '../data/catalog'
import { business } from '../data/business'
import { useDrawerOpen, useStore } from '../context/StoreContext'
import { useModal } from '../hooks/useModal'
import { displayPrice } from '../utils/price'

export function InquiryDrawer() {
  const { inquiry, setDrawerOpen, updateQuantity, removeInquiry, clearInquiry } = useStore()
  const drawerOpen = useDrawerOpen()
  const dialog = useModal(drawerOpen)
  const [review, setReview] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  const items = inquiry.map(item => ({ ...item, product: products.find(p => p.id === item.id) })).filter(item => item.product)
  const total = items.reduce((n, item) => n + item.quantity, 0)
  const message = 'Hello Furniture DEALS Dasma! I would like to inquire about:\n\n' + items.map(({ product, quantity }, i) => (i + 1) + '. ' + product.name + ' — Qty ' + quantity + '\n' + window.location.origin + '/?product=' + encodeURIComponent(product.slug) + '#shop').join('\n\n') + '\n\nPlease confirm current availability, prices, dimensions, and finishes. Thank you!'
  useEffect(() => { if (!drawerOpen) { setReview(false); setCopyStatus('') } }, [drawerOpen])
  useEffect(() => { setCopyStatus('') }, [message])
  const close = () => setDrawerOpen(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(message); setCopyStatus('Copied! Open Facebook, choose Message, and paste your inquiry.') }
    catch { setCopyStatus('Automatic copy is unavailable. Select and copy the message below.') }
  }
  return <dialog ref={dialog} className="inquiry-drawer" aria-labelledby="drawer-title" onCancel={event => { event.preventDefault(); close() }} onClick={event => { if (event.target === event.currentTarget) close() }}>
    <div className="drawer-shell"><div className="drawer-heading"><div><p className="eyebrow">YOUR HOME, COMING TOGETHER</p><h2 id="drawer-title">{review && items.length ? 'Ready to ask?' : 'My inquiry list'} <span>({total})</span></h2></div><button className="round-button" onClick={close} aria-label="Close inquiry list" autoFocus><X size={21} /></button></div>
      {items.length ? <>{review ? <div className="drawer-review"><button className="text-link" onClick={() => setReview(false)}><ArrowLeft size={16} /> Edit your list</button><h3>Your furniture shortlist</h3><div className="summary-lines">{items.map(({ product, quantity }) => <div key={product.id}><span>{product.name}</span><strong>× {quantity}</strong></div>)}</div><label className="inquiry-message-label" htmlFor="drawer-message">Your message</label><textarea id="drawer-message" className="drawer-message" value={message} readOnly rows={12} onFocus={event => event.target.select()} /><p className="form-note">Copy this message, open our Facebook page, and paste it into a message to the showroom. Nothing is sent automatically.</p></div> : <div className="drawer-items">{items.map(({ product, quantity }) => <article className="drawer-item" key={product.id}><Link to={'/products/' + product.slug} onClick={close}><img src={product.images[0]} alt={product.name} /></Link><div><Link to={'/products/' + product.slug} onClick={close}>{product.name}</Link><p>{displayPrice(product)}{product.priceSource === 'photo' ? ' · Photo price' : ''}</p><div className="inquiry-qty"><button aria-label={'Decrease ' + product.name + ' quantity'} onClick={() => updateQuantity(product.id, quantity - 1)}><Minus size={14} /></button><span>{quantity}</span><button aria-label={'Increase ' + product.name + ' quantity'} onClick={() => updateQuantity(product.id, quantity + 1)}><Plus size={14} /></button></div></div><button className="remove-item" aria-label={'Remove ' + product.name} onClick={() => removeInquiry(product.id)}><Trash2 size={17} /></button></article>)}<button className="drawer-clear" onClick={clearInquiry}>Clear inquiry list</button></div>}<div className="drawer-bottom"><div><span>{review ? 'Send your inquiry in two steps' : 'Ready to find out more?'}</span><strong>{total} {total === 1 ? 'item' : 'items'}</strong></div>{review ? <><button className="button button-dark" onClick={copy}>1. Copy inquiry message <Copy size={17} /></button><a className="button button-outline" href={business.messengerUrl} target="_blank" rel="noreferrer">2. Open Facebook <MessageCircle size={17} /></a>{copyStatus && <p className="drawer-copy-status" role="status">{copyStatus}</p>}</> : <><p>Review your list, copy your message, and ask the showroom about prices and availability.</p><button className="button button-dark" onClick={() => setReview(true)}>Review & prepare inquiry <ArrowRight size={18} /></button></>}<button className="drawer-continue" onClick={close}>Keep exploring</button></div></> : <div className="drawer-empty"><ShoppingBag size={38} strokeWidth={1.3} /><h3>A little inspiration<br />goes a long way.</h3><p>Save the furniture you like here and ask the showroom about it when you're ready.</p><Link to="/shop" onClick={close} className="button button-dark">Explore furniture <ArrowRight size={18} /></Link></div>}
    </div>
  </dialog>
}
