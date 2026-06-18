/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        'core-orange': '#FF5722',
        'terminal-white': '#FFFFFF',
      },
      fontFamily: {
        mono: ['"Courier New"', 'Courier', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 10px rgba(255, 87, 34, 0.7)',
        'glow-strong': '0 0 20px rgba(255, 87, 34, 1)',
      },
      animation: {
        'blink': 'blink 1s step-start infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 10px rgba(255, 87, 34, 0.7)' },
          '50%': { opacity: '.8', boxShadow: '0 0 20px rgba(255, 87, 34, 1)' },
        }
      }
    },
  },
  plugins: [],
}
