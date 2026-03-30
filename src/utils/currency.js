export function toINR(usd) {
  // convert USD to INR approximate
  const inr = Number(usd) * 80
  return Math.round(inr)
}

export function formatINR(usd) {
  const inr = toINR(usd)
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(inr)
}

export function discountedPrice(usd, discountPercent) {
  if (!discountPercent) return usd
  return usd * (1 - (discountPercent / 100))
}
