import { useEffect, useRef, useState } from 'react'
import { StoreLink as Link } from '../components/StoreLink'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Heart, MapPin, MessageCircle, Plus, Sofa } from 'lucide-react'
import { motion } from 'motion/react'
import { categories, collections, products } from '../data/catalog'
import { business } from '../data/business'
import { ProductGrid } from '../components/ProductCard'
import { ContactBanner, SectionHeading } from '../components/Shared'
import { Shop } from './Shop'
import { Contact } from './Contact'
import { Promotions } from './Promotions'

const edits = [
  { name: 'All favorites', categories: null },
  { name: 'Living room', categories: ['signature-sofas', 'sofa-sets', 'sofa-beds', 'recliners'] },
  { name: 'Dining room', categories: ['dining-sets'] },
  { name: 'Bedroom', categories: ['bed-frames', 'bunk-beds', 'wardrobes'] },
]

export function Home() {
  const [edit, setEdit] = useState(0)
  const [room, setRoom] = useState(0)
  const rail = useRef(null)
  const collection = collections[room]
  const featured = products.filter(p => edits[edit].categories ? edits[edit].categories.includes(p.category) : p.featured).slice(0, 4)
  useEffect(() => {
    document.title = 'Furniture DEALS Dasma | Beautiful Furniture. Better Living.'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Explore furniture for every room and inquire with Furniture DEALS Dasma. Visit our showroom in Salawag, Dasmariñas, Cavite.')
  }, [])
  const scrollCategories = direction => rail.current?.scrollBy({ left: direction * rail.current.clientWidth * .75, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  return <>
    <section className="home-hero storefront-hero container" id="home">
      <img className="home-hero-image" src="/images/showroom.jpg" alt="Edited view of the Furniture Deals Dasma storefront with advertising removed" width="1448" height="1086" fetchPriority="high" />
      <motion.div className="home-hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
        <p className="eyebrow"><span className="accent-dot" /> WELCOME TO FURNITURE DEALS DASMA</p>
        <h1>Beautiful furniture.<br /><span>Better living.</span></h1>
        <p>A little comfort. A lot of character. Find inspiration for the home you love coming back to.</p>
        <div className="hero-actions"><Link className="button button-dark" to="/shop">Explore furniture <ArrowUpRight size={18} /></Link><Link className="button button-white" to="/contact">Visit our showroom</Link></div>
      </motion.div>
    </section>

    <section className="category-section section" id="categories"><div className="container"><div className="compact-heading"><div><p className="eyebrow">A PLACE FOR EVERYTHING</p><h2>What feels like home?</h2></div><div className="rail-controls"><button className="round-button" onClick={() => scrollCategories(-1)} aria-label="Previous furniture categories"><ArrowLeft size={18} /></button><button className="round-button" onClick={() => scrollCategories(1)} aria-label="Next furniture categories"><ArrowRight size={18} /></button></div></div><div className="category-rail" ref={rail}>{categories.map(category => <Link className="category-card" key={category.slug} to={'/shop?category=' + category.slug}><img src={category.image} alt={category.name + ' furniture collection'} loading="lazy" /><div className="category-overlay"><small>{category.count}</small><strong>{category.name}</strong></div><span className="category-arrow"><ArrowUpRight size={18} /></span></Link>)}</div></div></section>

    <div className="service-strip"><div className="container"><div><Sofa /><span>Ideas for every room<small>Find your style, at your pace</small></span></div><div><Heart /><span>Save what you love<small>Build your furniture shortlist</small></span></div><div><MessageCircle /><span>Talk to our showroom<small>Ask for prices and availability</small></span></div><div><MapPin /><span>Visit us in Dasma<small>Open daily, 10 AM–7 PM</small></span></div></div></div>

    <section className="section featured-section"><div className="container"><SectionHeading eyebrow="YOUR NEXT FAVORITE CORNER" title="Find a piece. Make it yours." link="/shop" linkLabel="View all furniture" /><div className="featured-tools"><div className="edit-tabs" role="group" aria-label="Filter featured furniture by room">{edits.map((item, i) => <button key={item.name} aria-pressed={edit === i} className={edit === i ? 'active' : ''} onClick={() => setEdit(i)}>{item.name}</button>)}</div><span className="catalog-disclosure">From our photo collection · Confirm current stock</span></div><ProductGrid products={featured} /><div className="facebook-gallery-link"><span>See more from our showroom.</span><a className="text-link" href={business.facebookPhotosUrl} target="_blank" rel="noreferrer">Browse our Facebook photos <ArrowUpRight size={16} /></a></div></div></section>

    <Shop />
    <section className="room-explorer" id="collections"><div className="container room-explorer-grid"><div className="room-explorer-intro"><p className="eyebrow">SIGNATURE COLLECTIONS</p><h2>A room that<br />feels like <span>you.</span></h2><p>Start with your space. Discover the pieces that bring it together.</p><Link className="button button-dark" to="/shop?category=signature-sofas">Explore signature sofas <ArrowUpRight size={18} /></Link></div><div className="room-explorer-image"><img key={collection.image} src={collection.image} alt={collection.title + ' furniture collection'} loading="lazy" /><span>EXPLORE THE COLLECTION</span></div><div className="room-selector"><div role="group" aria-label="Preview a room collection">{collections.map((item, i) => <button key={item.title} className={room === i ? 'active' : ''} aria-pressed={room === i} onClick={() => setRoom(i)}><span><small>0{i + 1}</small>{item.title.replace(' Collection', '').replace(' Essentials', '')}</span><ArrowUpRight size={20} /></button>)}</div><p>{collection.description}</p><Link className="text-link" to={'/shop?category=' + collection.categories[0]}>Discover this collection <ArrowRight size={17} /></Link></div></div></section>

    <section className="section"><div className="container"><SectionHeading eyebrow="LITTLE CHANGES. A WHOLE NEW FEEL." title="More room for living." description="From slow mornings to family dinners, make everyday spaces your favorite places." /><div className="lifestyle-grid"><Link className="lifestyle-card" to="/shop?category=sofa-sets"><img src="/images/products/cream-corner-sofa.jpg" alt="Cream corner sofa from our photo collection" loading="lazy" /><div><p className="eyebrow">SETTLE IN</p><h3>Your new<br />happy place.</h3><span className="button button-white">Explore sofas <ArrowUpRight size={17} /></span></div></Link><Link className="lifestyle-card" to="/shop?category=dining-sets"><img src="/images/products/upholstered-dining-set.jpg" alt="Dining table with upholstered chairs from our photo collection" loading="lazy" /><div><p className="eyebrow">PULL UP A CHAIR</p><h3>Good company.<br />Great spaces.</h3><span className="button button-white">Explore dining <ArrowUpRight size={17} /></span></div></Link></div></div></section>

    <Promotions />
    <section className="visit-section container" id="about"><div className="visit-brand"><img src={business.logo} alt="Furniture Deals Dasmariñas official logo" loading="lazy" /><span>YOUR LOCAL FURNITURE DESTINATION</span></div><div className="visit-copy"><p className="eyebrow">LET'S MAKE YOURSELF AT HOME</p><h2>See you in Dasma.</h2><p>Take your ideas from screen to showroom. Visit us to explore the available pieces and talk through what you have in mind.</p><div className="visit-details"><div><MapPin size={20} /><span>{business.address}</span></div><div><Clock3 size={20} /><span>{business.hours}</span></div></div><div className="hero-actions"><a className="button button-dark" href={business.wazeUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={18} /></a><a className="text-link" href={business.phoneHref}>Call {business.phone}</a></div></div></section>

    <section className="section faq-section"><div className="container faq-grid"><div><p className="eyebrow">A LITTLE HELP, BEFORE YOU VISIT</p><h2>Good questions.<br />Simple answers.</h2><Link className="text-link" to="/contact">Talk to our team <ArrowUpRight size={18} /></Link></div><div className="faq-list">{[
      ['How do I ask about a piece?', 'Add the furniture you like to your inquiry list. Copy your message, open our official Facebook page, then paste it into a message to the showroom.'],
      ['Are the items and prices confirmed?', 'These are furniture photos supplied from our Facebook collection. Prices shown were printed in the original photos; confirm current prices, availability, dimensions, and inclusions with the showroom.'],
      ['Can I visit the showroom?', 'Yes. Find us at ' + business.address + '. We are open ' + business.hours.toLowerCase() + '. Call ahead if there is a particular piece you would like to see.'],
      ['How do I check delivery or payment options?', 'Message or call the showroom with your location and the furniture you are interested in. Our team can confirm the available arrangements and any charges.'],
    ].map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18} /></summary><p>{answer}</p></details>)}</div></div></section>
    <Contact />
    <ContactBanner />
  </>
}
