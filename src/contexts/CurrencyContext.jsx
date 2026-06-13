import { createContext, useContext, useState } from 'react'
import { CURRENCIES, formatCurrency, DEFAULT_CURRENCY } from '../utils/currency'

const CurrencyContext = createContext(null)

export function useCurrency() {
  return useContext(CurrencyContext)
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(
    () => localStorage.getItem('mea_currency') || DEFAULT_CURRENCY
  )

  function changeCurrency(code) {
    if (CURRENCIES[code]) {
      setCurrency(code)
      localStorage.setItem('mea_currency', code)
    }
  }

  function fmt(usdAmount) {
    return formatCurrency(usdAmount ?? 0, currency)
  }

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, fmt, currencies: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  )
}
