module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 8s ease-in-out infinite',
        'title-sequence': 'typing 2s steps(5) 3, untype 1.5s steps(5) 2 2s, wave 0.5s ease-in-out 7s, typing-final 2s steps(5) 7.5s forwards',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'scale': 'scale 0.5s ease-out',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'typing': {
          'from': { width: '0', opacity: '1', transform: 'translateY(0)' },
          'to': { width: '5ch', opacity: '1', transform: 'translateY(0)' }
        },
        'untype': {
          'from': { width: '5ch', opacity: '1', transform: 'translateY(0)' },
          'to': { width: '0', opacity: '0.7', transform: 'translateY(0)' }
        },
        'wave': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'translateY(10px) rotate(3deg)', opacity: '0.5' },
          '100%': { transform: 'translateY(20px) rotate(-3deg)', opacity: '0' }
        },
        'typing-final': {
          '0%': { width: '0', opacity: '0', transform: 'translateY(0)' },
          '20%': { opacity: '1' },
          '100%': { width: '5ch', opacity: '1', transform: 'translateY(0)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'scale': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'hero': {
          'primary': '#4F46E5',
          'secondary': '#7C3AED',
          'accent': '#EC4899'
        }
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      }
    },
  },
  plugins: [],
}