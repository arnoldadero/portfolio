module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 8s ease-in-out infinite',
        'title-sequence': 'typing 2s steps(5) 3, untype 1.5s steps(5) 2 2s, wave 0.5s ease-in-out 7s, typing-final 2s steps(5) 7.5s forwards',
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
          'from': {
            width: '0',
            opacity: '1',
            transform: 'translateY(0)',
          },
          'to': {
            width: '5ch',
            opacity: '1',
            transform: 'translateY(0)',
          }
        },
        'untype': {
          'from': {
            width: '5ch',
            opacity: '1',
            transform: 'translateY(0)',
          },
          'to': {
            width: '0',
            opacity: '0.7',
            transform: 'translateY(0)',
          }
        },
        'wave': {
          '0%': {
            transform: 'translateY(0) rotate(0deg)',
            opacity: '1',
          },
          '50%': {
            transform: 'translateY(10px) rotate(3deg)',
            opacity: '0.5',
          },
          '100%': {
            transform: 'translateY(20px) rotate(-3deg)',
            opacity: '0',
          }
        },
        'typing-final': {
          '0%': {
            width: '0',
            opacity: '0',
            transform: 'translateY(0)',
          },
          '20%': {
            opacity: '1',
          },
          '100%': {
            width: '5ch',
            opacity: '1',
            transform: 'translateY(0)',
          }
        }
      },
    },
  },
  plugins: [],
}