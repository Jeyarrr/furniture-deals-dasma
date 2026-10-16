import { StoreLink as Link } from './StoreLink'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { business } from '../data/business'

export function SectionHeading({ eyebrow, title, description, link, linkLabel = 'Explore all' }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>{link && <Link className="text-link" to={link}>{linkLabel} <ArrowUpRight size={17} /></Link>}</div>
}

export function ContactBanner() {
  return <section className="contact-banner"><div className="container contact-banner-inner"><div><p className="eyebrow">YOUR NEXT CHAPTER STARTS AT HOME</p><h2>Let's find your next favorite.</h2><p>Have a space in mind? Talk furniture with our Dasma showroom.</p></div><a className="button button-white" href={business.messengerUrl} target="_blank" rel="noreferrer">Message us on Facebook <MessageCircle size={18} /></a></div></section>
}
