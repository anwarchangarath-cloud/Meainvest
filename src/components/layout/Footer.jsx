import { Link } from 'react-router-dom'
import { TrendingUp, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-mea-deep border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-gradient flex items-center justify-center">
                <TrendingUp size={16} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                MEA <span className="text-mea-red">Investment</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Structured investment opportunities focused on industrial business growth across the Middle East and Africa.
            </p>
            <div className="space-y-2.5">
              <a href="mailto:info@meainvestment.com" className="flex items-center gap-2.5 text-white/40 hover:text-white/70 text-sm transition-colors cursor-pointer">
                <Mail size={14} className="text-mea-red flex-shrink-0" />
                info@meainvestment.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2.5 text-white/40 hover:text-white/70 text-sm transition-colors cursor-pointer">
                <Phone size={14} className="text-mea-red flex-shrink-0" />
                +1 (234) 567-890
              </a>
              <span className="flex items-center gap-2.5 text-white/40 text-sm">
                <MapPin size={14} className="text-mea-red flex-shrink-0" />
                Middle East & Africa Region
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Navigation</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/plans', label: 'Investment Plans' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-white/40 hover:text-white/70 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Account</h4>
            <ul className="space-y-3">
              {[
                { to: '/login', label: 'Investor Login' },
                { to: '/register', label: 'Create Account' },
                { to: '/dashboard', label: 'My Dashboard' },
                { to: '/admin/login', label: 'Admin Portal' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-white/40 hover:text-white/70 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Investment Agreement', 'Risk Disclosure'].map((item) => (
                <li key={item}>
                  <span className="text-white/40 text-sm cursor-pointer hover:text-white/70 transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="glass-card p-5 mb-8">
            <p className="text-white/40 text-xs leading-relaxed text-center">
              <span className="text-mea-red font-semibold">Disclaimer: </span>
              Investment opportunities are subject to verification, approval, and applicable regulatory requirements.
              Projected returns are not guaranteed unless officially documented in an approved investment agreement.
              Past performance does not indicate future results. All investments carry risk.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} MEA Investment. All rights reserved.
            </p>
            <p className="text-white/20 text-xs">
              Regulated investment platform · Subject to approval
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
