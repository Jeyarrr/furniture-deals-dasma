import importedProducts from './imported-products.json'

export const products = importedProducts
const categoryDefinitions = [
  ['Signature Sofas', 'signature-sofas'],
  ['Sofa Sets', 'sofa-sets'],
  ['Sofa Beds', 'sofa-beds'],
  ['Dining Sets', 'dining-sets'],
  ['Bed Frames', 'bed-frames'],
  ['Bunk Beds', 'bunk-beds'],
  ['Recliners', 'recliners'],
  ['Wardrobes', 'wardrobes'],
]
export const categories = categoryDefinitions.map(([name, slug]) => ({
  name, slug, image: products.find(p => p.category === slug).images[0],
  count: products.filter(p => p.category === slug).length + ' styles',
}))
const collection = (title, description, category, image) => ({
  title, description, categories: [category],
  image: image || categories.find(c => c.slug === category).image,
})
export const collections = [
  collection('Signature Sofa Collection', 'Meet Sephora, Monaco, Lexumburg, and more distinctive sofas for your favorite room.', 'signature-sofas', '/images/products/monaco-sofa.jpg'),
  collection('Living Room Essentials', 'Settle in with corner sofas, generous seating, and everyday comfort.', 'sofa-sets'),
  collection('Bedroom Collection', 'Find a bed frame that makes your room feel like your own.', 'bed-frames'),
  collection('Dining Room Collection', 'Bring everyone together around a table you love.', 'dining-sets'),
  collection('Space-Saving Furniture', 'Discover bunk beds and pull-out designs for shared rooms.', 'bunk-beds'),
]
export const promotions = []
export const activePromotions = (now = new Date()) => promotions.filter(p => p.status === 'active' && new Date(p.startDate) <= now && new Date(p.endDate) >= now)
export const categoryName = slug => categories.find(c => c.slug === slug)?.name || slug
