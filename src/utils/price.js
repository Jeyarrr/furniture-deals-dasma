export const effectivePrice = product => product.salePrice ?? product.price
export const displayPrice = product => effectivePrice(product) == null ? 'Ask for Price' : `₱${effectivePrice(product).toLocaleString('en-PH')}`
