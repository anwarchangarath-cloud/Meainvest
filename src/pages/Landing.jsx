import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Shield, Globe, ChevronRight, Building2, Users, BarChart3, Clock } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'

const stats = [
  { value: '12+', label: 'Countries Active' },
  { value: '$200M+', label: 'Assets Managed' },
  { value: '5,000+', label: 'Active Investors' },
  { value: '98%', label: 'Approval Rate' },
]

const features = [
  {
    icon: Shield,
    title: 'Verified & Transparent',
    desc: 'Every investment is reviewed, verified, and documented. Full transparency at every step.',
  },
  {
    icon: TrendingUp,
    title: 'Structured Returns',
    desc: 'Monthly and yearly investment cycles with clear projected return schedules.',
  },
  {
    icon: Globe,
    title: 'Regional Focus',
    desc: 'Exclusively focused on industrial opportunities across the Middle East and Africa.',
  },
  {
    icon: Building2,
    title: 'Industrial Backbone',
    desc: 'Investments channeled into real industrial businesses driving regional growth.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    desc: 'Personalized account management and support throughout your investment journey.',
  },
  {
    icon: BarChart3,
    title: 'Portfolio Tracking',
    desc: 'Real-time dashboard showing your investments, returns, and statements.',
  },
]

const steps = [
  { num: '01', title: 'Register & Verify', desc: 'Create your account. Our team verifies and approves your profile.' },
  { num: '02', title: 'Choose a Plan', desc: 'Select a monthly or yearly investment plan that matches your goals.' },
  { num: '03', title: 'Transfer & Upload', desc: 'Transfer funds to our bank account and upload your receipt.' },
  { num: '04', title: 'Earn Returns', desc: 'Admin verifies your payment. Your investment activates and starts generating projected returns.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-mea-black overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-mea-red/5 blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-mea-darkred/8 blur-[100px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-mea-red/30 bg-mea-red/10 text-mea-red text-xs font-semibold tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-mea-red animate-pulse" />
              MEA Investment Platform
            </span>
          </div>

          <h1 className="animate-slide-up text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            Industrial Growth.
            <span className="block text-transparent bg-clip-text bg-red-gradient mt-1">
              Structured Investment.
            </span>
            Regional Opportunity.
          </h1>

          <p className="animate-slide-up text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            MEA Investment provides monthly and yearly investment opportunities focused on industrial business growth across the Middle East and Africa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link to="/register" className="btn-primary text-base px-8 py-4 animate-pulse-red">
              Start Investing
              <ArrowRight size={18} />
            </Link>
            <Link to="/plans" className="btn-secondary text-base px-8 py-4">
              View Plans
              <ChevronRight size={18} />
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map(({ value, label }) => (
              <GlassCard key={label} className="p-5 text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-white/40 text-xs">{label}</div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-mea-red/50 to-transparent" />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label mb-3 block">Why MEA Investment</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Built for Serious Investors
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Every feature is designed to give you clarity, confidence, and control over your investment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <GlassCard key={title} hover className="p-6">
                <div className="w-10 h-10 rounded-xl bg-mea-red/15 border border-mea-red/20 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-mea-red" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Preview */}
      <section className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-mea-red/5 blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="section-label mb-3 block">The Process</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-white/40 max-w-xl mx-auto">A simple, transparent 4-step process from registration to returns.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="relative">
                <GlassCard className="p-6 h-full">
                  <div className="text-mea-red/30 text-5xl font-bold mb-4 leading-none">{num}</div>
                  <h3 className="text-white font-semibold mb-2">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </GlassCard>
                {num !== '04' && (
                  <div className="hidden lg:flex absolute top-1/2 -right-2.5 z-10 w-5 h-5 items-center justify-center">
                    <ChevronRight size={16} className="text-mea-red/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/how-it-works" className="btn-ghost text-mea-red hover:text-mea-red/80 hover:bg-mea-red/5">
              Learn more about the process <ArrowRight size={15} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-mea-red/20">
            <div className="absolute inset-0 bg-red-gradient opacity-10" />
            <div className="absolute inset-0 bg-dark-gradient" />
            <div className="relative px-8 py-16 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-white/50 mb-8 max-w-lg mx-auto">
                Join thousands of investors across the Middle East and Africa building wealth through structured industrial investments.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="btn-primary px-8 py-4 animate-pulse-red">
                  Create Free Account
                  <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-secondary px-8 py-4">
                  Talk to an Advisor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-6">
            <p className="text-white/30 text-xs text-center leading-relaxed">
              <span className="text-mea-red/60 font-semibold">Disclaimer: </span>
              Investment opportunities are subject to verification, approval, and applicable regulatory requirements.
              Projected returns are not guaranteed unless officially documented in an approved investment agreement.
              All investments carry risk. Past performance does not indicate future results.
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
