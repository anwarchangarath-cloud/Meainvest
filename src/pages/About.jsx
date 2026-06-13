import { Shield, Target, Globe, Award, Users, TrendingUp } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'

const values = [
  { icon: Shield, title: 'Integrity', desc: 'Every decision guided by transparency, honesty, and regulatory compliance.' },
  { icon: Target, title: 'Precision', desc: 'Carefully vetted industrial opportunities with structured return frameworks.' },
  { icon: Globe, title: 'Regional Impact', desc: 'Driving growth across the Middle East and Africa through purposeful capital deployment.' },
  { icon: Award, title: 'Excellence', desc: 'Premium investor experience from onboarding through returns.' },
]

const team = [
  { name: 'Executive Director', role: 'MEA Operations', initials: 'ED' },
  { name: 'Head of Investments', role: 'Portfolio Management', initials: 'HI' },
  { name: 'Risk & Compliance', role: 'Regulatory Affairs', initials: 'RC' },
  { name: 'Investor Relations', role: 'Client Services', initials: 'IR' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-mea-black pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-mea-red/5 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="section-label mb-4 block">About Us</span>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Empowering Industrial
            <span className="block text-transparent bg-clip-text bg-red-gradient">Growth Across MEA</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            MEA Investment is a regulated investment platform connecting capital to high-impact industrial opportunities across the Middle East and Africa region.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label mb-3 block">Our Mission</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Structured Capital for Industrial Development
              </h2>
              <p className="text-white/50 leading-relaxed mb-6">
                We bridge the gap between investors and the industrial backbone of the MEA region — providing structured, transparent, and compliant investment pathways that generate real economic value.
              </p>
              <p className="text-white/40 leading-relaxed">
                Our platform is built on principles of rigorous due diligence, transparent reporting, and investor-first communication. Every investment undergoes thorough verification before activation, ensuring the integrity of each portfolio.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2019', label: 'Founded' },
                { value: '12+', label: 'Countries' },
                { value: '$200M+', label: 'Deployed Capital' },
                { value: '5,000+', label: 'Investors' },
              ].map(({ value, label }) => (
                <GlassCard key={label} className="p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">{value}</div>
                  <div className="text-white/40 text-sm">{label}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label mb-3 block">Core Values</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">What Drives Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <GlassCard key={title} hover className="p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-mea-red/15 border border-mea-red/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-mea-red" />
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label mb-3 block">Leadership</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Our Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map(({ name, role, initials }) => (
              <GlassCard key={name} hover className="p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-red-gradient flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{initials}</span>
                </div>
                <h3 className="text-white font-semibold mb-1">{name}</h3>
                <p className="text-mea-red text-xs font-medium">{role}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance notice */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard red className="p-8 text-center">
            <Shield size={28} className="text-mea-red mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-3">Regulatory Commitment</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              MEA Investment operates under applicable financial regulations across our operating jurisdictions.
              All investment activities are subject to verification, approval, and compliance review.
              Projected returns are not guaranteed unless documented in an approved investment agreement.
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
