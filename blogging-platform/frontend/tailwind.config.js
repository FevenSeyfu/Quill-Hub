/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif',]
     }
    },
    colors: {
      "purple-telemagnet": '#C53678',
      "mint-green": '#98FB98',
      "soft-white": '#F8F8FF',
      "soft-orange": '#FF6F61',
      "white" : '#fff',
      'gray-dark': '#374151',
      'gray': '#475569',
      'gray-light': '#94a3b8',
      'blue': '#0d6efd',
      'red' : '#dc3545',
      'green' : '#198754'
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
  plugins: [],
}

