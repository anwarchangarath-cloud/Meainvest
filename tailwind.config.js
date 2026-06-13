/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mea: {
          black: '#050505',
          deep: '#111111',
          red: '#C1121F',
          darkred: '#780000',
          white: '#FFFFFF',
          gray: '#F5F5F5',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
      animation: {
        'fade-in':      'fadeIn 0.7s ease-out both',
        'slide-up':     'slideUp 0.7s ease-out both',
        'slide-in':     'slideIn 0.5s ease-out both',
        'pulse-red':    'pulseRed 2.5s ease-in-out infinite',
        'marquee':      'marquee 30s linear infinite',
        'marquee-slow': 'marquee 50s linear infinite',
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out infinite',
        'glow-pulse':   'glowPulse 3s ease-in-out infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'scan':         'scan 6s linear infinite',
        'border-glow':  'borderGlow 3s ease-in-out infinite',
        'count-in':     'countIn 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'reveal-up':    'revealUp 0.8s cubic-bezier(0.22,1,0.36,1) both',
        'reveal-left':  'revealLeft 0.8s cubic-bezier(0.22,1,0.36,1) both',
        'flicker':      'flicker 4s linear infinite',
      },
      keyframes: {
        fadeIn:     { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:    { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn:    { from: { opacity: '0', transform: 'translateX(-16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        pulseRed:   { '0%,100%': { boxShadow: '0 0 0 0 rgba(193,18,31,0.35)' }, '50%': { boxShadow: '0 0 0 10px rgba(193,18,31,0)' } },
        marquee:    { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float:      { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-14px)' } },
        glowPulse:  { '0%,100%': { opacity: '0.4' }, '50%': { opacity: '1' } },
        shimmer:    { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
        scan:       { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
        borderGlow: { '0%,100%': { boxShadow: '0 0 8px rgba(193,18,31,0.3), inset 0 0 8px rgba(193,18,31,0.05)' }, '50%': { boxShadow: '0 0 24px rgba(193,18,31,0.6), inset 0 0 16px rgba(193,18,31,0.1)' } },
        countIn:    { from: { opacity: '0', transform: 'translateY(30px) scale(0.8)' }, to: { opacity: '1', transform: 'translateY(0) scale(1)' } },
        revealUp:   { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        revealLeft: { from: { opacity: '0', transform: 'translateX(-40px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        flicker:    { '0%,95%,100%': { opacity: '1' }, '96%': { opacity: '0.7' }, '97%': { opacity: '1' }, '98%': { opacity: '0.5' }, '99%': { opacity: '1' } },
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #C1121F 0%, #780000 100%)',
        'dark-gradient': 'linear-gradient(180deg, #050505 0%, #111111 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      },
    },
  },
  plugins: [],
}

