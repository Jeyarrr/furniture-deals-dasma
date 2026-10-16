import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { StoreLink as Link, scrollToSection, storeDestination } from './StoreLink'
import { ProductModal } from './ProductModal'
import { ArrowUpRight, Clock3, Facebook, Heart, MapPin, Menu, MessageCircle, Phone, Search, ShoppingBag, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { business } from '../data/business'
import { useStore } from '../context/StoreContext'
import { InquiryDrawer } from './InquiryDrawer'

const links = [['Home', '/'], ['Shop Furniture', '/shop'], ['Collections', '/collections'], ['Promotions', '/promotions'], ['About Us', '/about'], ['Contact', '/contact']]

function Brand({ footer = false }) {
  return <Link to="/" className={'brand-lockup ' + (footer ? 'footer-brand' : '')} aria-label={business.name + ' home'}><img src={business.logoMark} alt="" /><span>Furniture <strong>Deals</strong><small>DASMA · MAKE YOURSELF AT HOME</small></span></Link>
}

function Header() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { inquiry, favorites, setDrawerOpen } = useStore()
  const count = inquiry.reduce((n, item) => n + item.quantity, 0)
  useEffect(() => { setMenuOpen(false) }, [location.pathname, location.search, location.hash])
  useEffect(() => {
    const update = () => {
      const edge = (document.querySelector('.site-header')?.getBoundingClientRect().height || 140) + 100
      let current = 'home'
      for (const id of ['home', 'shop', 'collections', 'promotions', 'about', 'contact']) { if (document.getElementById(id)?.getBoundingClientRect().top <= edge) current = id }
      setActiveSection(current)
    }
    window.addEventListener('scroll', update, { passive: true }); update()
    return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => { if (!menuOpen) return; const onKey = e => { if (e.key === 'Escape') setMenuOpen(false) }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [menuOpen])
  const submitSearch = e => { e.preventDefault(); navigate('/?q=' + encodeURIComponent(search.trim()) + '#shop'); requestAnimationFrame(() => scrollToSection('shop')); setMenuOpen(false) }
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="announcement-bar"><span>Make yourself at home. Visit Furniture Deals Dasma.</span><a href={business.phoneHref}>Let's talk furniture <ArrowUpRight size={13} /></a></div>
    <header className={'site-header ' + (scrolled ? 'is-scrolled' : '')}>
      <div className="header-main container"><div className="header-local"><MapPin size={17} /><Link to="/contact">Dasmariñas, Cavite<small>Your local furniture destination</small></Link></div><Brand /><div className="header-actions"><Link className="icon-button favorites-link" to="/shop?favorites=1" aria-label={'View ' + favorites.length + ' favorites'}><Heart size={21} />{favorites.length > 0 && <small>{favorites.length}</small>}</Link><button className="inquiry-link" onClick={() => setDrawerOpen(true)} aria-label={'Open inquiry list with ' + count + ' items'}><ShoppingBag size={19} /><span>My inquiry</span><b>{count}</b></button><button className="icon-button menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button></div></div>
      <div className="header-navigation container"><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, to]) => <Link key={to} to={to} className={activeSection === storeDestination(to).hash.slice(1) ? 'active' : ''} aria-current={activeSection === storeDestination(to).hash.slice(1) ? 'location' : undefined}>{label}</Link>)}</nav><form className="header-search" role="search" onSubmit={submitSearch}><input type="search" placeholder="Find something for your home" value={search} onChange={e => setSearch(e.target.value)} aria-label="Search furniture" /><button type="submit" aria-label="Submit furniture search"><Search size={18} /></button></form></div>
      <AnimatePresence>{menuOpen && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{links.map(([label, to]) => <Link key={to} to={to} className={activeSection === storeDestination(to).hash.slice(1) ? 'active' : ''} aria-current={activeSection === storeDestination(to).hash.slice(1) ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={17} /></Link>)}<Link to="/shop?favorites=1">Saved favorites <Heart size={17} /></Link><a href={business.phoneHref}>Call {business.phone} <Phone size={17} /></a></motion.nav>}</AnimatePresence>
    </header>
  </>
}

function Footer() {
  return <footer className="footer"><div className="container footer-top"><div><Brand footer /><p>A home you love starts with a little inspiration. Find your next favorite piece with Furniture Deals Dasma.</p><a className="footer-social" href={business.facebookUrl} target="_blank" rel="noreferrer"><Facebook size={17} /> Find us on Facebook <ArrowUpRight size={15} /></a></div><div><h3>Find your furniture</h3>{links.slice(1, 4).map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}<Link to="/shop?favorites=1">Saved favorites</Link></div><div><h3>Here to help</h3>{links.slice(4).map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}<Link to="/inquiry">My inquiry list</Link><a href={business.mapUrl} target="_blank" rel="noreferrer">Get directions</a></div><div><h3>Come say hello</h3><p>{business.address}</p><a href={business.phoneHref}><Phone size={15} /> {business.phone}</a><p className="footer-hours"><Clock3 size={15} /> {business.hours}</p><a href={business.facebookUrl} target="_blank" rel="noreferrer">Message the showroom <ArrowUpRight size={15} /></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Furniture DEALS Dasma</span><span>Furniture photo collection. Confirm prices and availability with the showroom.</span><a href="#main-content">Back to top ↑</a></div></footer>
}

export function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { toast, setDrawerOpen } = useStore()
  useEffect(() => {
    if (location.pathname === '/inquiry') { navigate('/#shop', { replace: true }); setDrawerOpen(true) }
    else if (location.pathname !== '/') navigate(storeDestination(location.pathname + location.search, location), { replace: true })
  }, [location.pathname, location.search, navigate, setDrawerOpen])
  useEffect(() => { if (location.hash && !new URLSearchParams(location.search).has('product')) requestAnimationFrame(() => scrollToSection(location.hash.slice(1))) }, [location.hash])
  return <><Header /><main id="main-content" tabIndex={-1}>{children}</main><Footer /><ProductModal /><InquiryDrawer /><a className={'messenger-float ' + (location.pathname.startsWith('/products/') ? 'above-product-cta' : '')} href={business.messengerUrl} target="_blank" rel="noreferrer" aria-label="Message Furniture Deals on Facebook"><MessageCircle size={21} /><span>Let's talk</span></a><AnimatePresence>{toast && <motion.div role="status" className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>{toast}</motion.div>}</AnimatePresence></>
}
