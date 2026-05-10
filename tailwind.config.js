/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#060e1e', 900: '#0a1628', 800: '#0d1f3c', 700: '#1a2f50', 600: '#1e3a5f', 500: '#2a4a7f' },
        ivory: { 50: '#fdfbf7', 100: '#f8f4ee', 200: '#f0e8d8' },
        gold: { 300: '#e8c96a', 400: '#d4a843', 500: '#c9a84c', 600: '#b8952a' },
        charcoal: { 800: '#1a1a1a', 700: '#2d2d2d', 600: '#4a4a4a', 400: '#7a7a7a' },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #060e1e 0%, #0d1f3c 40%, #1a2f50 70%, #0a1628 100%)',
        'gold-gradient': 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8952a 100%)',
        'card-gradient-1': 'linear-gradient(135deg, #1e3a5f 0%, #0a1628 100%)',
        'card-gradient-2': 'linear-gradient(135deg, #2a4a7f 0%, #1a2f50 100%)',
        'card-gradient-3': 'linear-gradient(135deg, #1a3a2a 0%, #0a1e14 100%)',
      },
    },
  },
  plugins: [],
}

