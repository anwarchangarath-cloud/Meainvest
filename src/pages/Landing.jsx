import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Shield, Globe, ArrowUpRight, CheckCircle, BarChart3, Lock, Users } from 'lucide-react'

/* ── Ticker strip ── */
const TICKER_ITEMS = [
  'INDUSTRIAL INVESTMENT', 'MIDDLE EAST MARKETS', 'PROJECTED RETURNS',
  'VERIFIED PLATFORM', 'MONTHLY CYCLES', 'AFRICA GROWTH',
  'STRUCTURED CAPITAL', 'ADMIN APPROVED', 'SECURE PORTAL',
]

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="relative overflow-hidden border-y border-mea-red/20 bg-mea-red/5 py-3">
      <div className="flex gap-0 animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-8 text-[10px] font-black tracking-[0.3em] text-mea-red uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-mea-red flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Hero dashboard card visual ── */
function HeroCard() {
  const bars = [35, 55, 45, 70, 60, 85, 75, 95]
  return (
    <div className="relative w-[360px]">
      {/* Glow behind card */}
      <div className="absolute inset-0 bg-mea-red/15 blur-[60px] rounded-3xl scale-110" />

      {/* Main card */}
      <div className="relative rounded-2xl border border-white/10 bg-mea-deep/90 backdrop-blur-xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-white/40 text-xs font-medium">Portfolio Value</div>
            <div className="text-white text-2xl font-black tracking-tight mt-0.5">$84,200</div>
          </div>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-500/15 border border-green-500/20 text-green-400 text-xs font-bold">
            <TrendingUp size={11} />+12.4%
          </span>
        </div>

        {/* Chart */}
        <div className="mb-5">
          <svg viewBox="0 0 240 72" className="w-full" fill="none">
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C1121F" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#780000" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {bars.map((h, i) => (
              <rect
                key={i}
                x={i * 30 + 4}
                y={72 - h * 0.72}
                width="22"
                height={h * 0.72}
                rx="4"
                fill={i === bars.length - 1 ? 'url(#barGrad)' : 'rgba(193,18,31,0.2)'}
              />
            ))}
          </svg>
        </div>

        {/* Investments list */}
        <div className="space-y-2.5">
          {[
            { plan: 'Monthly Growth', amount: '$25,000', status: 'active', ret: '+6.2%' },
            { plan: 'Yearly Premium', amount: '$50,000', status: 'active', ret: '+68%' },
            { plan: 'Monthly Starter', amount: '$9,200', status: 'under_verification', ret: '—' },
          ].map((inv) => (
            <div key={inv.plan} className="flex items-center justify-between p-3 rounded-xl bg-white/4 border border-white/5">
              <div>
                <div className="text-white text-xs font-semibold">{inv.plan}</div>
                <div className="text-white/30 text-[10px] mt-0.5">{inv.amount}</div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-bold ${inv.ret === '—' ? 'text-white/20' : 'text-green-400'}`}>{inv.ret}</div>
                <div className={`text-[9px] mt-0.5 font-semibold uppercase tracking-wide ${inv.status === 'active' ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {inv.status === 'active' ? 'Active' : 'Verifying'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/25 text-[10px]">
            <Lock size={9} />
            Secured & encrypted
          </div>
          <div className="text-white/20 text-[10px]">MEA Investment</div>
        </div>
      </div>

      {/* Floating notification */}
      <div className="absolute -top-4 -right-4 rounded-2xl border border-white/10 bg-mea-deep/95 backdrop-blur-xl p-3 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center">
            <CheckCircle size={12} className="text-green-400" />
          </div>
          <div>
            <div className="text-white text-[10px] font-semibold">Investment Approved</div>
            <div className="text-white/30 text-[9px]">Yearly Premium · $50,000</div>
          </div>
        </div>
      </div>

      {/* Floating return badge */}
      <div className="absolute -bottom-4 -left-4 rounded-xl border border-mea-red/25 bg-mea-deep/95 backdrop-blur-xl px-4 py-2.5 shadow-xl">
        <div className="text-mea-red text-[10px] font-bold uppercase tracking-wide mb-0.5">Projected Return</div>
        <div className="text-white text-sm font-black">+$18,600</div>
      </div>
    </div>
  )
}

/* ── Markets data ── */
const MARKETS = [
  { code: 'AE', name: 'UAE', sub: 'Dubai & Abu Dhabi' },
  { code: 'SA', name: 'Saudi Arabia', sub: 'Riyadh Operations' },
  { code: 'IN', name: 'India', sub: 'Gateway Markets' },
  { code: 'NG', name: 'Nigeria', sub: 'West Africa Hub' },
  { code: 'KE', name: 'Kenya', sub: 'East Africa Base' },
  { code: 'EG', name: 'Egypt', sub: 'North Africa' },
]

/* ══════════════════════════════════════════
   MAIN LANDING PAGE
══════════════════════════════════════════ */
export default function Landing() {
  return (
    <div className="min-h-screen bg-mea-black overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Massive decorative letters */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none leading-none font-black text-white pointer-events-none"
            style={{ fontSize: 'clamp(120px, 22vw, 340px)', opacity: 0.018, letterSpacing: '-0.05em' }}
          >
            MEA
          </div>
          {/* Fine grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }} />
          {/* Glows */}
          <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-mea-red/8 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-mea-darkred/12 blur-[100px] rounded-full" />
          {/* Vertical accent line */}
          <div className="absolute top-0 right-[38%] w-px h-full bg-gradient-to-b from-transparent via-mea-red/15 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Left: copy */}
            <div className="flex-1 min-w-0">
              {/* Category label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-10 bg-mea-red" />
                <span className="text-mea-red text-[10px] font-black tracking-[0.3em] uppercase">
                  Middle East & Africa Investment Platform
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-black text-white leading-[0.92] tracking-tight mb-8"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)' }}>
                Where Capital<br />
                Meets{' '}
                <span className="text-transparent bg-clip-text bg-red-gradient">Industrial</span><br />
                Growth.
              </h1>

              <p className="text-white/45 text-lg leading-relaxed mb-10 max-w-lg">
                Structured monthly and yearly investment cycles focused on industrial business growth across the MEA region — transparent, admin-verified, and fully documented.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/register" className="btn-primary text-base px-8 py-4">
                  Start Investing <ArrowRight size={18} />
                </Link>
                <Link to="/plans" className="btn-secondary text-base px-8 py-4">
                  View Plans
                </Link>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap gap-x-7 gap-y-3 pt-8 border-t border-white/6">
                {[
                  'Admin-verified investments',
                  'Structured return cycles',
                  'Secure document upload',
                  'AED · INR · USD supported',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/35 text-xs">
                    <span className="w-1 h-1 rounded-full bg-mea-red flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: dashboard preview */}
            <div className="hidden lg:flex justify-center flex-shrink-0 pb-10 pr-6">
              <HeroCard />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <div className="w-px h-12 bg-gradient-to-b from-mea-red/60 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-mea-red/40" />
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── STATS ROW ── */}
      <section className="border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
            {[
              { value: '$200M+', label: 'Assets Managed', sub: 'across MEA region' },
              { value: '5,000+', label: 'Active Investors', sub: 'verified accounts' },
              { value: '12+', label: 'Countries Covered', sub: 'Middle East & Africa' },
              { value: '98%', label: 'Approval Rate', sub: 'verified investments' },
            ].map(({ value, label, sub }) => (
              <div key={label} className="py-12 px-8 lg:px-12 text-center hover:bg-white/[0.02] transition-colors duration-300">
                <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">{value}</div>
                <div className="text-white/60 text-sm font-semibold">{label}</div>
                <div className="text-white/20 text-xs mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES — editorial asymmetric layout ── */}
      <section className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[700px] h-[450px] bg-mea-red/4 blur-[130px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* Editorial header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-mea-red" />
                <span className="text-mea-red text-[10px] font-black tracking-[0.3em] uppercase">Why MEA Investment</span>
              </div>
              <h2 className="font-black text-white leading-tight tracking-tight"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
                Built for<br />
                <span className="text-transparent bg-clip-text bg-red-gradient">Serious</span> Investors.
              </h2>
            </div>
            <p className="text-white/35 max-w-xs lg:text-right text-sm leading-relaxed">
              Every feature delivers clarity, confidence, and direct control over your capital.
            </p>
          </div>

          {/* Feature grid — one large + three small */}
          <div className="grid lg:grid-cols-5 gap-4">
            {/* Large */}
            <div className="lg:col-span-3 relative rounded-3xl border border-white/8 bg-white/[0.03] p-8 lg:p-10 overflow-hidden group hover:border-mea-red/25 transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-mea-red/6 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-mea-red/0 via-mea-red/20 to-mea-red/0" />
              <div className="w-14 h-14 rounded-2xl bg-mea-red/15 border border-mea-red/25 flex items-center justify-center mb-7">
                <Shield size={24} className="text-mea-red" />
              </div>
              <h3 className="text-white font-black text-2xl lg:text-3xl mb-4 leading-snug">
                Verified & Fully<br />Transparent Process
              </h3>
              <p className="text-white/40 leading-relaxed mb-7 max-w-md">
                Every investment is reviewed, documented, and approved by the MEA admin team before activation. No black boxes — you see exactly what your capital is doing at every stage.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {['Receipt Upload', 'Admin Review', 'Live Tracking', 'Statements'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-white/45 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Small stack */}
            <div className="lg:col-span-2 space-y-4">
              {[
                {
                  icon: TrendingUp,
                  title: 'Monthly & Yearly Cycles',
                  desc: 'Choose the investment duration that fits your goals. Structured return cycles with clear projected percentages.',
                },
                {
                  icon: Globe,
                  title: 'Regional Industrial Focus',
                  desc: 'Capital deployed exclusively into industrial opportunities driving growth across the Middle East and Africa.',
                },
                {
                  icon: BarChart3,
                  title: 'Real-Time Dashboard',
                  desc: 'Track all investments, projected returns, receipts, and statements from one intuitive portal.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 hover:border-mea-red/20 hover:bg-white/[0.05] transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-mea-red/10 border border-mea-red/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-mea-red" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm mb-1.5">{title}</h3>
                      <p className="text-white/35 text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARKETS ── */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-mea-red/5 blur-[130px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-mea-red" />
                <span className="text-mea-red text-[10px] font-black tracking-[0.3em] uppercase">Our Markets</span>
              </div>
              <h2 className="font-black text-white leading-tight tracking-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>
                Focused on the<br />
                <span className="text-transparent bg-clip-text bg-red-gradient">Fastest-Growing</span><br />
                Economies.
              </h2>
              <p className="text-white/40 leading-relaxed mb-8 max-w-md">
                MEA Investment operates exclusively within the Middle East and Africa — regions experiencing unprecedented industrial expansion and rising capital demand.
              </p>
              <Link to="/about"
                className="inline-flex items-center gap-2 text-mea-red text-sm font-bold hover:gap-3 transition-all duration-200">
                Learn our approach <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {MARKETS.map(({ code, name, sub }) => (
                <div key={code}
                  className="flex items-center gap-3.5 p-4 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-mea-red/25 hover:bg-mea-red/5 transition-all duration-200 group cursor-default">
                  <div className="w-9 h-9 rounded-xl bg-mea-red/10 border border-mea-red/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-mea-red text-[10px] font-black">{code}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-semibold text-sm truncate">{name}</div>
                    <div className="text-white/30 text-xs truncate">{sub}</div>
                  </div>
                  <ArrowUpRight size={13} className="text-white/10 ml-auto flex-shrink-0 group-hover:text-mea-red/50 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-28 border-t border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-56 bg-mea-red/4 blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-mea-red" />
              <span className="text-mea-red text-[10px] font-black tracking-[0.3em] uppercase">The Process</span>
              <div className="h-px w-10 bg-mea-red" />
            </div>
            <h2 className="font-black text-white tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>
              Four Steps to Active Investment.
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line desktop */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(193,18,31,0.3) 20%, rgba(193,18,31,0.3) 80%, transparent 100%)' }} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '01', title: 'Register & Verify', desc: 'Create your account. Our team verifies and approves your investor profile before access.' },
                { num: '02', title: 'Choose a Plan', desc: 'Select a monthly or yearly investment cycle that matches your financial goals.' },
                { num: '03', title: 'Transfer & Upload', desc: 'Transfer funds to our bank account and upload your payment receipt for admin review.' },
                { num: '04', title: 'Earn Returns', desc: 'Investment activates after verification. Projected returns begin per your signed agreement.' },
              ].map(({ num, title, desc }) => (
                <div key={num} className="group">
                  {/* Step number box */}
                  <div className="relative w-20 h-20 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center mb-6 group-hover:border-mea-red/30 transition-colors duration-300">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-red-gradient">{num}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2.5">{title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-14">
            <Link to="/how-it-works" className="btn-secondary px-8 py-3.5">
              Full Process Details <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── REFERRAL CALLOUT ── */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-7 py-5 rounded-2xl border border-white/8 bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-mea-red/10 border border-mea-red/20 flex items-center justify-center flex-shrink-0">
                <Users size={16} className="text-mea-red" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Referral Program</div>
                <div className="text-white/30 text-xs mt-0.5">Invite investors and earn commission on every approved investment they make.</div>
              </div>
            </div>
            <Link to="/register" className="flex-shrink-0 flex items-center gap-2 text-mea-red text-sm font-bold hover:gap-3 transition-all">
              Join & Start Referring <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Layered backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-br from-mea-darkred/50 via-mea-red/15 to-transparent" />
            <div className="absolute inset-0 bg-mea-deep/75 backdrop-blur-sm" />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-mea-red/20 blur-[90px] rounded-full" />
              <div className="absolute -bottom-16 left-16 w-64 h-64 bg-mea-darkred/20 blur-[70px] rounded-full" />
            </div>
            <div className="absolute inset-0 rounded-3xl border border-mea-red/20" />

            {/* Diagonal accent */}
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-mea-red/20 via-mea-red/5 to-transparent" />

            <div className="relative grid lg:grid-cols-2 gap-10 items-center px-8 sm:px-14 lg:px-20 py-16 lg:py-20">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-mea-red" />
                  <span className="text-mea-red text-[10px] font-black tracking-[0.3em] uppercase">Get Started Today</span>
                </div>
                <h2 className="font-black text-white leading-tight tracking-tight mb-5"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  Ready to Build<br />
                  <span className="text-transparent bg-clip-text bg-red-gradient">Lasting Wealth?</span>
                </h2>
                <p className="text-white/45 leading-relaxed max-w-md">
                  Join investors across the Middle East and Africa building structured wealth through verified industrial capital cycles.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
                <Link to="/register" className="btn-primary text-base px-9 py-4">
                  Create Free Account <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-secondary text-base px-9 py-4">
                  Talk to an Advisor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <section className="py-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/18 text-xs leading-relaxed">
            <span className="text-mea-red/45 font-semibold">Disclaimer: </span>
            Investment opportunities are subject to verification, approval, and applicable regulatory requirements.
            Projected returns are not guaranteed unless officially documented in an approved investment agreement.
            All investments carry risk. Past performance does not indicate future results.
          </p>
        </div>
      </section>

    </div>
  )
}
