export default function GlassCard({ children, className = '', hover = false, red = false }) {
  return (
    <div
      className={`
        rounded-2xl border backdrop-blur-md transition-all duration-300
        ${red
          ? 'border-mea-red/30 bg-mea-red/5 hover:bg-mea-red/10'
          : 'border-white/10 bg-white/5 hover:border-white/15 hover:bg-white/8'}
        ${hover ? 'cursor-pointer hover:shadow-xl hover:shadow-black/50 hover:-translate-y-0.5' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
