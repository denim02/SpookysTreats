/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans JP', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'header-color': '#7f2607',
        'cart-button-color': '#451602',
        'cart-count-color': '#aa3d1b',
        'hero-card-color': '#323132',
        'page-background-color': '#262526',
        'price-color': '#b24e23'
      },
      backgroundImage: {
        'hero-image': "url('./assets/hero-section-img.jpg')",
      }
    },
  },
  plugins: [],
}