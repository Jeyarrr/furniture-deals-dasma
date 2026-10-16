import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = file => fs.readFileSync(path.join(root, file), 'utf8')
const walk = dir => fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap(entry => {
  const file = path.posix.join(dir, entry.name)
  return entry.isDirectory() ? walk(file) : [file]
})
const products = JSON.parse(read('src/data/imported-products.json'))
assert(products.length > 0, 'The catalog must contain products')
for (const key of ['id', 'slug']) {
  assert(products.every(product => typeof product[key] === 'string' && product[key].length), 'Missing product ' + key)
  assert.equal(new Set(products.map(product => product[key])).size, products.length, 'Duplicate product ' + key)
}
const categorySlugs = [...read('src/data/catalog.js').matchAll(/\['[^']+', '([^']+)'\]/g)].map(match => match[1])
assert(categorySlugs.length > 0, 'Category definitions are missing')
for (const product of products) {
  assert(product.name && product.description, 'Missing product copy: ' + product.slug)
  assert(categorySlugs.includes(product.category), 'Unknown category: ' + product.slug)
  assert(Array.isArray(product.images) && product.images.length, 'Missing product images: ' + product.slug)
  for (const key of ['price', 'salePrice']) assert(product[key] === null || (Number.isFinite(product[key]) && product[key] >= 0), 'Invalid ' + key + ': ' + product.slug)
  assert(Array.isArray(product.colors), 'Invalid colors: ' + product.slug)
}
for (const category of categorySlugs) assert(products.some(product => product.category === category), 'Empty category: ' + category)
const sources = [...walk('src').filter(file => /\.(jsx?|json|css)$/.test(file)), 'index.html']
const referenced = new Set()
for (const file of sources) {
  const source = read(file)
  assert(!/\/images\/(demo|page)\//.test(source), 'Obsolete image reference: ' + file)
  for (const match of source.matchAll(/\/images\/[a-zA-Z0-9_./-]+\.(?:jpg|jpeg|png|webp|avif|svg)/g)) {
    const asset = 'public' + match[0]
    assert(fs.existsSync(path.join(root, asset)), 'Missing image: ' + asset + ' in ' + file)
    referenced.add(asset)
  }
}
const images = walk('public/images').filter(file => /\.(jpg|jpeg|png|webp|avif|svg)$/i.test(file))
for (const file of images) assert(referenced.has(file), 'Unused public image: ' + file)
console.log('Catalog and asset checks passed: ' + products.length + ' products, ' + categorySlugs.length + ' categories, ' + images.length + ' images.')
