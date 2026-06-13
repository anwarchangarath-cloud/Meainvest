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
        'fade-in': 'fadeIn 0.7s ease-out',
        'slide-up': 'slideUp 0.7s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'pulse-red': 'pulseRed 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        pulseRed: { '0%,100%': { boxShadow: '0 0 0 0 rgba(193,18,31,0.35)' }, '50%': { boxShadow: '0 0 0 10px rgba(193,18,31,0)' } },
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

