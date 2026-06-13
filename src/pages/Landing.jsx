import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, TrendingUp, Shield, Globe, ArrowUpRight,
  CheckCircle, BarChart3, Lock, Users, Zap
} from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useCounter } from '../hooks/useCounter'

/* ════════════════════════════════════════════
   ANIMATED CYBER GRID CANVAS
════════════════════════════════════════════ */
function CyberGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let offset = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      offset = (offset + 0.25) % 80

      ctx.lineWidth = 0.5
      ctx.strokeStyle = 'rgba(193,18,31,0.07)'

      for (let x = (offset % 80) - 80; x < canvas.width + 80; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = (offset % 80) - 80; y < canvas.height + 80; y += 80) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      ctx.fillStyle = 'rgba(193,18,31,0.25)'
      for (let x = (offset % 80) - 80; x < canvas.width + 80; x += 80) {
        for (let y = (offset % 80) - 80; y < canvas.height + 80; y += 80) {
          ctx.beginPath(); ctx.arc(x, y, 1.2, 0, Math.PI * 2); ctx.fill()
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
}

/* ════════════════════════════════════════════
   FLOATING PARTICLES
════════════════════════════════════════════ */
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 8,
    duration: Math.random() * 8 + 6,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-mea-red/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `float ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}

/* ════════════════════════════════════════════
   CURSOR GLOW
════════════════════════════════════════════ */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 })

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-[9999] rounded-full"
      style={{
        width: 320,
        height: 320,
        left: pos.x - 160,
        top: pos.y - 160,
        background: 'radial-gradient(circle, rgba(193,18,31,0.07) 0%, transparent 70%)',
        transition: 'left 0.12s ease, top 0.12s ease',
      }}
    />
  )
}

/* ════════════════════════════════════════════
   TYPEWRITER TEXT
════════════════════════════════════════════ */
function Typewriter({ text, speed = 45, startDelay = 400 }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let timeout
    const start = () => {
      let i = 0
      const tick = () => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i < text.length) timeout = setTimeout(tick, speed)
        else setDone(true)
      }
      timeout = setTimeout(tick, startDelay)
    }
    start()
    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return (
    <span>
      {displayed}
      {!done && <span className="animate-pulse text-mea-red font-thin">|</span>}
    </span>
  )
}

/* ════════════════════════════════════════════
   GLITCH HEADING
════════════════════════════════════════════ */
function GlitchText({ children, className = '' }) {
  return (
    <span className={`glitch relative ${className}`} data-text={children}>
      {children}
    </span>
  )
}

/* ════════════════════════════════════════════
   3D TILT CARD
════════════════════════════════════════════ */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null)

  function onMove(e) {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateZ(6px)`
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  )
}

/* ════════════════════════════════════════════
   ANIMATED STAT
════════════════════════════════════════════ */
function AnimatedStat({ value, label, sub, index }) {
  const [ref, visible] = useReveal(0.3)
  const numMatch = value.match(/^([^0-9]*)(\d+)([^0-9]*)$/)
  const count = useCounter(numMatch ? parseInt(numMatch[2]) : 0, 2000, visible)

  return (
    <div
      ref={ref}
      className={`py-12 px-8 lg:px-12 text-center border-r border-b lg:border-b-0 border-white/5 last:border-r-0
        hover:bg-white/[0.02] transition-colors duration-300
        ${visible ? 'animate-count-in' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight glow-text-red">
        {numMatch
          ? `${numMatch[1]}${visible ? count.toLocaleString() : 0}${numMatch[3]}`
          : value}
      </div>
      <div className="text-white/60 text-sm font-semibold">{label}</div>
      <div className="text-white/25 text-xs mt-1">{sub}</div>
    </div>
  )
}

/* ════════════════════════════════════════════
   HERO DASHBOARD CARD
════════════════════════════════════════════ */
function HeroCard() {
  const [activeBar, setActiveBar] = useState(7)
  const bars = [35, 52, 44, 68, 57, 82, 71, 95]

  useEffect(() => {
    const id = setInterval(() => {
      setActiveBar((p) => (p + 1) % bars.length)
    }, 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-[360px] animate-float">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-mea-red/20 blur-[70px] rounded-3xl scale-110 animate-glow-pulse" />

      {/* Main card */}
      <div className="relative rounded-2xl border border-white/12 bg-mea-deep/90 backdrop-blur-xl p-6 shadow-2xl border-animate">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-white/35 text-[10px] font-bold tracking-widest uppercase mb-0.5">Portfolio Value</div>
            <div className="text-white text-2xl font-black tracking-tight shimmer-text">$84,200</div>
          </div>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-500/12 border border-green-500/20 text-green-400 text-xs font-bold animate-glow-pulse">
            <TrendingUp size={10} />+12.4%
          </span>
        </div>

        {/* Animated bar chart */}
        <div className="mb-5 relative">
          <svg viewBox="0 0 240 72" className="w-full" fill="none">
            <defs>
              <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C1121F" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#780000" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="dim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C1121F" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#780000" stopOpacity="0.08" />
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
                fill={i === activeBar ? 'url(#bg)' : 'url(#dim)'}
                style={{ transition: 'fill 0.4s ease' }}
              />
            ))}
          </svg>
          {/* Scan line over chart */}
          <div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mea-red/60 to-transparent opacity-50"
            style={{ animation: 'scan 3s linear infinite' }}
          />
        </div>

        {/* Investments */}
        <div className="space-y-2">
          {[
            { plan: 'Monthly Growth', amount: '$25,000', status: 'Active', ret: '+6.2%', color: 'text-green-400' },
            { plan: 'Yearly Premium', amount: '$50,000', status: 'Active', ret: '+68%', color: 'text-green-400' },
            { plan: 'Monthly Starter', amount: '$9,200', status: 'Verifying', ret: '—', color: 'text-orange-400' },
          ].map((inv) => (
            <div key={inv.plan} className="flex items-center justify-between p-3 rounded-xl bg-white/4 border border-white/5 hover:border-mea-red/20 transition-colors duration-200">
              <div>
                <div className="text-white text-xs font-semibold">{inv.plan}</div>
                <div className="text-white/30 text-[10px] mt-0.5">{inv.amount}</div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-bold ${inv.color}`}>{inv.ret}</div>
                <div className={`text-[9px] font-bold uppercase tracking-wide mt-0.5 ${inv.color}`}>{inv.status}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/20 text-[10px]">
            <Lock size={8} />Secured & encrypted
          </div>
          <div className="flex items-center gap-1 text-mea-red/40 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-mea-red/60 animate-pulse" />
            LIVE
          </div>
        </div>
      </div>

      {/* Floating: Approval notification */}
      <div className="absolute -top-5 -right-5 rounded-2xl border border-white/10 bg-mea-deep/95 backdrop-blur-xl p-3 shadow-xl animate-float-slow glow-red-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center flex-shrink-0">
            <CheckCircle size={12} className="text-green-400" />
          </div>
          <div>
            <div className="text-white text-[10px] font-bold">Investment Approved</div>
            <div className="text-white/30 text-[9px]">Yearly Premium · $50,000</div>
          </div>
        </div>
      </div>

      {/* Floating: Return badge */}
      <div className="absolute -bottom-5 -left-5 rounded-xl border border-mea-red/30 bg-mea-deep/95 backdrop-blur-xl px-4 py-2.5 shadow-xl glow-red-sm"
        style={{ animation: 'float 7s 1s ease-in-out infinite' }}>
        <div className="text-mea-red text-[9px] font-black uppercase tracking-widest mb-0.5">Projected Return</div>
        <div className="text-white text-sm font-black">+$18,600</div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
   TICKER
════════════════════════════════════════════ */
const TICKER_ITEMS = [
  'INDUSTRIAL INVESTMENT', 'MIDDLE EAST MARKETS', 'PROJECTED RETURNS',
  'VERIFIED PLATFORM', 'MONTHLY CYCLES', 'AFRICA GROWTH',
  'STRUCTURED CAPITAL', 'ADMIN APPROVED', 'SECURE PORTAL',
  'AED · INR · USD', 'REFERRAL COMMISSIONS',
]

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="relative overflow-hidden border-y border-mea-red/20 bg-gradient-to-r from-mea-red/8 via-mea-red/5 to-mea-red/8 py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-8 text-[10px] font-black tracking-[0.3em] text-mea-red uppercase flex-shrink-0">
            <Zap size={8} className="flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
   REVEAL SECTION WRAPPER
════════════════════════════════════════════ */
function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal(0.1)
  return (
    <div
      ref={ref}
      className={`${visible ? 'animate-reveal-up' : 'opacity-0'} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ════════════════════════════════════════════
   MARKETS
════════════════════════════════════════════ */
const MARKETS = [
  { code: 'AE', name: 'UAE', sub: 'Dubai & Abu Dhabi' },
  { code: 'SA', name: 'Saudi Arabia', sub: 'Riyadh Operations' },
  { code: 'IN', name: 'India', sub: 'Gateway Markets' },
  { code: 'NG', name: 'Nigeria', sub: 'West Africa Hub' },
  { code: 'KE', name: 'Kenya', sub: 'East Africa Base' },
  { code: 'EG', name: 'Egypt', sub: 'North Africa' },
]

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function Landing() {
  return (
    <div className="min-h-screen bg-mea-black overflow-x-hidden">
      <CursorGlow />

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden noise scanlines">
        {/* Canvas grid background */}
        <div className="absolute inset-0 pointer-events-none">
          <CyberGrid />
        </div>

        {/* Floating particles */}
        <Particles />

        {/* Glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-mea-red/6 blur-[160px] rounded-full animate-glow-pulse" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-mea-darkred/10 blur-[120px] rounded-full"
            style={{ animation: 'glowPulse 5s 1.5s ease-in-out infinite' }} />
        </div>

        {/* Massive ghost letters */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-black text-white leading-none"
          style={{ fontSize: 'clamp(160px, 25vw, 400px)', opacity: 0.016, letterSpacing: '-0.05em' }}>
          MEA
        </div>

        {/* Diagonal accent */}
        <div className="absolute top-0 right-[35%] w-px h-full bg-gradient-to-b from-transparent via-mea-red/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* Left copy */}
            <div className="flex-1 min-w-0">
              {/* Label */}
              <div className="flex items-center gap-3 mb-8 animate-slide-in">
                <div className="h-px w-10 bg-mea-red glow-red" />
                <span className="text-mea-red text-[10px] font-black tracking-[0.3em] uppercase animate-flicker">
                  Middle East & Africa Investment Platform
                </span>
              </div>

              {/* H1 with glitch */}
              <h1 className="font-black text-white leading-[0.9] tracking-tighter mb-8 animate-slide-up"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
                Where Capital<br />
                Meets{' '}
                <GlitchText className="text-transparent bg-clip-text bg-red-gradient glow-text-red">
                  Industrial
                </GlitchText><br />
                Growth.
              </h1>

              {/* Typewriter subheading */}
              <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-lg font-mono"
                style={{ minHeight: '3.5rem' }}>
                <Typewriter
                  text="Structured monthly & yearly investment cycles across MEA. Transparent, admin-verified, fully documented."
                  speed={30}
                  startDelay={800}
                />
              </p>

              <div className="flex flex-wrap gap-4 mb-12 animate-slide-up delay-300">
                <Link to="/register"
                  className="relative btn-primary text-base px-8 py-4 overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Investing <ArrowRight size={18} />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>
                <Link to="/plans" className="btn-secondary text-base px-8 py-4">
                  View Plans
                </Link>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3 animate-fade-in delay-500">
                {[
                  { icon: Shield, text: 'Admin-Verified' },
                  { icon: Lock, text: 'Encrypted Portal' },
                  { icon: BarChart3, text: 'Live Dashboard' },
                  { icon: Globe, text: 'MEA Focused' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/8 bg-white/3 text-white/40 text-xs font-medium hover:border-mea-red/30 hover:text-white/70 hover:bg-mea-red/5 transition-all duration-200">
                    <Icon size={11} className="text-mea-red" />{text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Dashboard preview */}
            <div className="hidden lg:flex justify-center flex-shrink-0 pb-12 pr-8">
              <HeroCard />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="text-white/20 text-[9px] tracking-widest uppercase mb-1">Scroll</div>
          <div className="w-px h-14 bg-gradient-to-b from-mea-red/70 to-transparent" />
        </div>
      </section>

      {/* ══════════ TICKER ══════════ */}
      <Ticker />

      {/* ══════════ STATS ══════════ */}
      <section className="border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
            {[
              { value: '$200M+', label: 'Assets Managed', sub: 'across MEA region' },
              { value: '5000+', label: 'Active Investors', sub: 'verified accounts' },
              { value: '12+', label: 'Countries Covered', sub: 'Middle East & Africa' },
              { value: '98+', label: 'Approval Rate %', sub: 'verified investments' },
            ].map(({ value, label, sub }, i) => (
              <AnimatedStat key={label} value={value} label={label} sub={sub} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[700px] h-[500px] bg-mea-red/4 blur-[140px] rounded-full animate-glow-pulse" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-mea-red" />
                <span className="text-mea-red text-[10px] font-black tracking-[0.3em] uppercase">Why MEA Investment</span>
              </div>
              <h2 className="font-black text-white leading-tight tracking-tighter"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
                Built for{' '}
                <span className="shimmer-text">Serious</span>{' '}
                Investors.
              </h2>
            </div>
            <p className="text-white/35 max-w-xs lg:text-right text-sm leading-relaxed">
              Every feature delivers clarity, confidence, and direct control over your capital.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-4">
            {/* Large feature */}
            <Reveal className="lg:col-span-3" delay={100}>
              <TiltCard className="h-full rounded-3xl border border-white/8 bg-white/[0.025] p-8 lg:p-10 overflow-hidden hover:border-mea-red/25 transition-colors duration-300 border-animate">
                <div className="absolute top-0 right-0 w-64 h-64 bg-mea-red/6 blur-[80px] rounded-full pointer-events-none" />
                <div className="w-14 h-14 rounded-2xl bg-mea-red/15 border border-mea-red/25 flex items-center justify-center mb-7 glow-red-sm">
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
                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-white/45 text-xs font-medium hover:border-mea-red/30 hover:text-mea-red/70 transition-colors duration-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>

            {/* Small features */}
            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: TrendingUp, title: 'Monthly & Yearly Cycles', desc: 'Choose the investment duration that fits your goals with clear projected return percentages.', delay: 200 },
                { icon: Globe, title: 'Regional Industrial Focus', desc: 'Capital deployed exclusively into industrial opportunities driving MEA growth.', delay: 300 },
                { icon: BarChart3, title: 'Real-Time Dashboard', desc: 'Track all investments, returns, receipts, and statements from one intuitive portal.', delay: 400 },
              ].map(({ icon: Icon, title, desc, delay }) => (
                <Reveal key={title} delay={delay}>
                  <TiltCard className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 hover:border-mea-red/20 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-mea-red/10 border border-mea-red/20 flex items-center justify-center flex-shrink-0 mt-0.5 glow-red-sm">
                        <Icon size={16} className="text-mea-red" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm mb-1.5">{title}</h3>
                        <p className="text-white/35 text-xs leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MARKETS ══════════ */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-mea-red/5 blur-[140px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-mea-red" />
                <span className="text-mea-red text-[10px] font-black tracking-[0.3em] uppercase">Our Markets</span>
              </div>
              <h2 className="font-black text-white leading-tight tracking-tighter mb-6"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>
                Focused on the<br />
                <GlitchText className="text-transparent bg-clip-text bg-red-gradient">
                  Fastest-Growing
                </GlitchText><br />
                Economies.
              </h2>
              <p className="text-white/40 leading-relaxed mb-8 max-w-md">
                MEA Investment operates exclusively within the Middle East and Africa — regions experiencing unprecedented industrial expansion and rising capital demand.
              </p>
              <Link to="/about"
                className="inline-flex items-center gap-2 text-mea-red text-sm font-bold hover:gap-3 transition-all duration-200 group">
                Learn our approach
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Reveal>

            <div className="grid grid-cols-2 gap-3">
              {MARKETS.map(({ code, name, sub }, i) => (
                <Reveal key={code} delay={i * 80}>
                  <TiltCard className="flex items-center gap-3.5 p-4 rounded-2xl border border-white/8 bg-white/[0.025] hover:border-mea-red/30 hover:bg-mea-red/5 transition-all duration-200 group cursor-default">
                    <div className="w-9 h-9 rounded-xl bg-mea-red/10 border border-mea-red/20 flex items-center justify-center flex-shrink-0 group-hover:glow-red-sm">
                      <span className="text-mea-red text-[10px] font-black">{code}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-sm truncate">{name}</div>
                      <div className="text-white/30 text-xs truncate">{sub}</div>
                    </div>
                    <ArrowUpRight size={12} className="text-white/10 ml-auto flex-shrink-0 group-hover:text-mea-red/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PROCESS ══════════ */}
      <section className="py-28 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-72 bg-mea-red/4 blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          <Reveal className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-mea-red" />
              <span className="text-mea-red text-[10px] font-black tracking-[0.3em] uppercase">The Process</span>
              <div className="h-px w-10 bg-mea-red" />
            </div>
            <h2 className="font-black text-white tracking-tighter"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>
              Four Steps to Active Investment.
            </h2>
          </Reveal>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(193,18,31,0.5) 20%, rgba(193,18,31,0.5) 80%, transparent)' }} />
            {/* Animated pulse along line */}
            <div className="hidden lg:block absolute top-[38px] left-[12.5%] w-8 h-0.5 bg-mea-red/80 rounded-full"
              style={{ animation: 'marquee 3s linear infinite', backgroundImage: 'linear-gradient(90deg, transparent, #C1121F, transparent)' }} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '01', title: 'Register & Verify', desc: 'Create your account. Our team verifies and approves your investor profile before full access.' },
                { num: '02', title: 'Choose a Plan', desc: 'Select a monthly or yearly investment cycle matching your financial goals and horizon.' },
                { num: '03', title: 'Transfer & Upload', desc: 'Transfer funds to our bank and upload your payment receipt for admin review.' },
                { num: '04', title: 'Earn Returns', desc: 'Investment activates after verification. Projected returns begin per your signed agreement.' },
              ].map(({ num, title, desc }, i) => (
                <Reveal key={num} delay={i * 120}>
                  <div className="group">
                    <div className="relative w-20 h-20 rounded-2xl border border-white/10 bg-white/[0.025] flex items-center justify-center mb-6
                      group-hover:border-mea-red/40 group-hover:bg-mea-red/5 transition-all duration-300">
                      <span className="text-2xl font-black text-transparent bg-clip-text bg-red-gradient">{num}</span>
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-red-sm" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2.5 group-hover:text-mea-red transition-colors duration-300">{title}</h3>
                    <p className="text-white/35 text-sm leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="text-center mt-14" delay={200}>
            <Link to="/how-it-works" className="btn-secondary px-8 py-3.5">
              Full Process Details <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════ REFERRAL STRIP ══════════ */}
      <Reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-7 py-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-mea-red/20 transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-mea-red/10 border border-mea-red/20 flex items-center justify-center flex-shrink-0 glow-red-sm">
                <Users size={16} className="text-mea-red" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Referral Program</div>
                <div className="text-white/30 text-xs mt-0.5">Invite investors — earn commission on every approved investment they make.</div>
              </div>
            </div>
            <Link to="/register"
              className="flex-shrink-0 flex items-center gap-2 text-mea-red text-sm font-bold hover:gap-3 transition-all duration-200">
              Join & Start Referring <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* ══════════ CTA ══════════ */}
      <section className="py-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border-animate">
              {/* Backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-br from-mea-darkred/50 via-mea-red/15 to-transparent" />
              <div className="absolute inset-0 bg-mea-deep/80" />
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-mea-red/20 blur-[100px] rounded-full animate-glow-pulse" />
                <div className="absolute -bottom-16 left-16 w-64 h-64 bg-mea-darkred/20 blur-[80px] rounded-full" />
                {/* Scan line effect */}
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-mea-red/30 to-transparent"
                  style={{ animation: 'scan 8s linear infinite' }} />
              </div>
              <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-mea-red/25 via-mea-red/8 to-transparent" />

              <div className="relative grid lg:grid-cols-2 gap-10 items-center px-8 sm:px-14 lg:px-20 py-16 lg:py-20">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-8 bg-mea-red" />
                    <span className="text-mea-red text-[10px] font-black tracking-[0.3em] uppercase animate-flicker">Get Started Today</span>
                  </div>
                  <h2 className="font-black text-white leading-tight tracking-tighter mb-5"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                    Ready to Build<br />
                    <GlitchText className="text-transparent bg-clip-text bg-red-gradient">
                      Lasting Wealth?
                    </GlitchText>
                  </h2>
                  <p className="text-white/45 leading-relaxed max-w-md">
                    Join investors across the Middle East and Africa building structured wealth through verified industrial capital cycles.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
                  <Link to="/register"
                    className="relative btn-primary text-base px-9 py-4 overflow-hidden group">
                    <span className="relative z-10 flex items-center gap-2">
                      Create Free Account <ArrowRight size={18} />
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  </Link>
                  <Link to="/contact" className="btn-secondary text-base px-9 py-4">
                    Talk to an Advisor
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ DISCLAIMER ══════════ */}
      <section className="py-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/15 text-xs leading-relaxed">
            <span className="text-mea-red/40 font-semibold">Disclaimer: </span>
            Investment opportunities are subject to verification, approval, and applicable regulatory requirements.
            Projected returns are not guaranteed unless officially documented in an approved investment agreement.
            All investments carry risk. Past performance does not indicate future results.
          </p>
        </div>
      </section>
    </div>
  )
}
