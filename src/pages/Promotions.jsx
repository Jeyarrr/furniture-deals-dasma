import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '../components/Shared'
import { activePromotions } from '../data/catalog'
import { business } from '../data/business'

export function Promotions() {
  const offers = activePromotions()
  return <><section id="promotions" className="section promotions-section"><div className="container"><SectionHeading eyebrow="FURNITURE DEALS DASMA" title="A little more to love." />{offers.length ? <div className="offers-grid">{offers.map(offer => <article className="offer-card" key={offer.id}><img src={offer.bannerImage} alt={offer.title} /><div><p className="eyebrow">CURRENT OFFER</p><h2>{offer.title}</h2><p>{offer.description}</p>{offer.terms && <p className="offer-terms">{offer.terms}</p>}{offer.permit && <p className="offer-terms">DTI permit: {offer.permit}</p>}<a className="text-link" href={business.messengerUrl} target="_blank" rel="noreferrer">Ask about this offer <ArrowUpRight size={17} /></a></div></article>)}</div> : <div className="no-promos compact-promos"><span>✳</span><p className="eyebrow">CHECK BACK SOON</p><h2>No confirmed promotions<br /><em>right now.</em></h2><p>For the latest deals and availability, get in touch through the official Furniture DEALS Dasma Facebook page.</p><a className="button button-dark" href={business.facebookUrl} target="_blank" rel="noreferrer">VISIT FACEBOOK PAGE <ArrowUpRight size={18} /></a></div>}</div></section></>
}
