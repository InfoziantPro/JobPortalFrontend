/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Jost', 'sans-serif'], 
        jost: ['Jost', 'sans-serif'], 
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        reveal: {
          '100%': {
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
          },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        reveal: 'reveal 2s ease-out forwards',
      },
      maskImage: {
        gradient: 'linear-gradient(to bottom, transparent 0%, white 50%, transparent 100%)',
      },
      maskSize: {
        full: '100% 200%',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.mask-reveal': {
          WebkitMaskImage: 'linear-gradient(to bottom, black 100%)',
          maskImage: 'linear-gradient(to bottom, black 100%)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'top',
          maskPosition: 'top',
          WebkitMaskSize: '100% 0%',
          maskSize: '100% 0%',
        },
      });
    },
  ],
}
