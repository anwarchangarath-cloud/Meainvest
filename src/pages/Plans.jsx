import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, Clock, TrendingUp, DollarSign, Info } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import { useCurrency } from '../contexts/CurrencyContext'

const monthlyPlans = [
  {
    id: 'monthly_starter',
    name: 'Monthly Starter',
    min: 1000,
    max: 9999,
    duration: '1–3 Months',
    returnRate: '3–5%',
    period: 'per month',
    features: ['Monthly projected return', 'Standard support', 'Basic dashboard access', 'Monthly statement'],
    popular: false,
  },
  {
    id: 'monthly_growth',
    name: 'Monthly Growth',
    min: 10000,
    max: 49999,
    duration: '3–6 Months',
    returnRate: '5–8%',
    period: 'per month',
    features: ['Monthly projected return', 'Priority support', 'Full dashboard access', 'Monthly statement', 'Dedicated account manager'],
    popular: true,
  },
  {
    id: 'monthly_elite',
    name: 'Monthly Elite',
    min: 50000,
    max: null,
    duration: '6–12 Months',
    returnRate: '8–12%',
    period: 'per month',
    features: ['Monthly projected return', 'VIP support 24/7', 'Premium dashboard', 'Monthly statement', 'Dedicated account manager', 'Custom investment terms'],
    popular: false,
  },
]

const yearlyPlans = [
  {
    id: 'yearly_standard',
    name: 'Yearly Standard',
    min: 5000,
    max: 24999,
    duration: '12 Months',
    returnRate: '40–55%',
    period: 'per year',
    features: ['Annual projected return', 'Quarterly statements', 'Standard support', 'Portfolio tracking'],
    popular: false,
  },
  {
    id: 'yearly_premium',
    name: 'Yearly Premium',
    min: 25000,
    max: 99999,
    duration: '12–24 Months',
    returnRate: '55–75%',
    period: 'per year',
    features: ['Annual projected return', 'Monthly statements', 'Priority support', 'Portfolio tracking', 'Reinvestment option'],
    popular: true,
  },
  {
    id: 'yearly_platinum',
    name: 'Yearly Platinum',
    min: 100000,
    max: null,
    duration: '12–36 Months',
    returnRate: '75–100%',
    period: 'per year',
    features: ['Annual projected return', 'Monthly statements', 'VIP support 24/7', 'Premium analytics', 'Reinvestment option', 'Bespoke investment terms'],
    popular: false,
  },
]

export default function Plans() {
  const [tab, setTab] = useState('monthly')
  const plans = tab === 'monthly' ? monthlyPlans : yearlyPlans
  const { fmt, currency } = useCurrency()

  return (
    <div className="min-h-screen bg-mea-black pt-20">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mea-red/5 blur-[120px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="section-label mb-4 block">Investment Plans</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Choose Your Investment Path
          </h1>
          <p className="text-white/50 max-w-xl mx-auto mb-10">
            Monthly and yearly investment cycles with structured projected returns.
            All returns are subject to investment agreement and approval.
          </p>

          {/* Tab */}
          <div className="inline-flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
            {['monthly', 'yearly'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer capitalize ${
                  tab === t ? 'bg-mea-red text-white shadow-lg shadow-mea-red/25' : 'text-white/50 hover:text-white'
                }`}
              >
                {t} Plans
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className="relative">
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 rounded-full bg-mea-red text-white text-xs font-bold tracking-wide">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <GlassCard
                  className={`p-7 h-full flex flex-col ${plan.popular ? 'border-mea-red/40 bg-mea-red/5' : ''}`}
                  hover
                >
                  <div className="mb-6">
                    <h3 className="text-white font-bold text-lg mb-3">{plan.name}</h3>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-3xl font-bold text-transparent bg-clip-text bg-red-gradient">
                        {plan.returnRate}
                      </span>
                      <span className="text-white/40 text-sm">{plan.period}</span>
                    </div>
                    <p className="text-white/30 text-xs">Projected return – subject to investment agreement</p>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <DollarSign size={14} className="text-mea-red flex-shrink-0" />
                      Min: {fmt(plan.min)}{plan.max ? ` – ${fmt(plan.max)}` : '+'}
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Clock size={14} className="text-mea-red flex-shrink-0" />
                      Duration: {plan.duration}
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                        <Check size={14} className="text-mea-red mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/register"
                    className={`w-full py-3 rounded-lg font-semibold text-sm text-center transition-all duration-200 cursor-pointer ${
                      plan.popular
                        ? 'bg-red-gradient text-white hover:opacity-90 hover:shadow-lg hover:shadow-mea-red/30'
                        : 'border border-white/15 text-white hover:border-mea-red hover:text-mea-red hover:bg-mea-red/5'
                    }`}
                  >
                    Get Started
                  </Link>
                </GlassCard>
              </div>
            ))}
          </div>

          {/* Notice */}
          <div className="mt-10">
            <GlassCard className="p-5">
              <div className="flex items-start gap-3">
                <Info size={16} className="text-mea-red mt-0.5 flex-shrink-0" />
                <p className="text-white/40 text-xs leading-relaxed">
                  <span className="text-mea-red font-semibold">Important: </span>
                  All return rates shown are projected estimates and are not guaranteed. Actual returns depend on investment performance and are subject to the terms of an approved investment agreement. Investment amounts, durations, and return rates may be adjusted by the admin at any time. Registration and identity verification are required before investing.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Invest?
          </h2>
          <p className="text-white/40 mb-8">Create your account and submit your investment request today.</p>
          <Link to="/register" className="btn-primary px-8 py-4">
            Start Investing <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
