/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F5F0E8', // Warm Ivory canonical from Bloom reference
          50: '#FAF8F4',
          100: '#F5F0E8',
          200: '#EFE8DC',
          300: '#E5DBCB',
          400: '#D9C9B7', // Soft beige
        },
        primary: {
          DEFAULT: '#174B79', // Deep Blue canonical
          light: '#24699A',   // Secondary Blue
          dark: '#0F3354',
        },
        editorial: {
          DEFAULT: '#174B79',
          50: '#F0F6FA',
          100: '#DDEAF4',
          200: '#B6D3E7',
          300: '#7EAFD3',
          400: '#24699A',
          500: '#174B79',
          600: '#123D63',
          700: '#0E2F4D',
          800: '#0A2137',
        },
        coral: {
          DEFAULT: '#E9784F', // Coral Orange canonical accent
          50: '#FFF5F0',
          100: '#FFE8DF',
          200: '#FFCEBE',
          300: '#FFAF94',
          400: '#E9784F',
          500: '#D86438',
          600: '#BA4E25',
          700: '#943B17',
        },
        beige: {
          DEFAULT: '#D9C9B7', // Soft beige rule & card divider
          light: '#E6DCCE',
          dark: '#C7B49F',
        }
      },
      fontFamily: {
        headline: ['Syne', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        'tracked': '0.18em',
        'widest-editorial': '0.25em'
      }
    },
  },
  plugins: [],
}
