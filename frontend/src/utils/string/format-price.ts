export function formatPrice(price: number) {
  const formatted = price.toLocaleString("uk-UA", {
    minimumFractionDigits: 0,
  })
  return `${formatted} ₴`
}
