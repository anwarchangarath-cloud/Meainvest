import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { Menu, X, TrendingUp, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { currentUser, userProfile, logout, isAdmin } = useAuth()
  const { currency, changeCurrency, currencies } = useCurrency()
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/plans', label: 'Plans' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-mea-black/95 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="MEA Investment Home">
            <div className="w-8 h-8 rounded-lg bg-red-gradient flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <TrendingUp size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              MEA <span className="text-mea-red">Investment</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive ? 'text-white bg-white/5' : ''
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Desktop auth + currency */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/20 text-xs font-semibold transition-all duration-200 cursor-pointer"
                aria-label="Select currency"
              >
                {currency}
                <ChevronDown size={12} className={`transition-transform duration-200 ${currencyOpen ? 'rotate-180' : ''}`} />
              </button>
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-40 rounded-xl border border-white/10 bg-mea-deep/95 backdrop-blur-md shadow-xl shadow-black/50 overflow-hidden z-50">
                  {Object.values(currencies).map((cur) => (
                    <button
                      key={cur.code}
                      onClick={() => { changeCurrency(cur.code); setCurrencyOpen(false) }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors duration-150 cursor-pointer ${
                        currency === cur.code
                          ? 'bg-mea-red/15 text-mea-red font-semibold'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{cur.name}</span>
                      <span className="font-bold">{cur.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {currentUser ? (
              <>
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  className="btn-ghost text-sm flex items-center gap-1.5"
                >
                  <LayoutDashboard size={15} />
                  {isAdmin ? 'Admin' : 'Dashboard'}
                </Link>
                <button onClick={handleLogout} className="btn-ghost text-sm flex items-center gap-1.5 text-white/50 hover:text-white">
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm">Login</Link>
                <Link to="/register" className="btn-primary text-sm px-5 py-2.5">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden btn-ghost p-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-mea-deep/98 backdrop-blur-md border-b border-white/5 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-white bg-mea-red/15 text-mea-red' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-white/5 mt-3 space-y-2">
              {currentUser ? (
                <>
                  <Link
                    to={isAdmin ? '/admin' : '/dashboard'}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5"
                  >
                    <LayoutDashboard size={15} />
                    {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setOpen(false) }}
                    className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-sm text-center text-white bg-mea-red rounded-xl font-semibold hover:bg-mea-darkred transition-colors">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
