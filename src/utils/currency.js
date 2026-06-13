export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$',    name: 'US Dollar',       rate: 1,      locale: 'en-US' },
  AED: { code: 'AED', symbol: 'AED ', name: 'UAE Dirham',      rate: 3.6725, locale: 'en-AE' },
  INR: { code: 'INR', symbol: '₹',   name: 'Indian Rupee',    rate: 83.5,   locale: 'en-IN' },
}

export function convertAmount(usdAmount, toCurrency) {
  return usdAmount * (CURRENCIES[toCurrency]?.rate ?? 1)
}

export function formatCurrency(usdAmount, currencyCode) {
  const cur = CURRENCIES[currencyCode] ?? CURRENCIES.USD
  const converted = usdAmount * cur.rate
  return `${cur.symbol}${converted.toLocaleString(cur.locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}

export const DEFAULT_CURRENCY = 'USD'
