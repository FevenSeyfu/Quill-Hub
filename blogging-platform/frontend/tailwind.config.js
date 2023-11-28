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
      "gray":'#111827'
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

