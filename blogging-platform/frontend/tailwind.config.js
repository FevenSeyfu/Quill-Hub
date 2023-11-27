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
      "mint-green": '#C53678',
      "soft-white": '#C53678',
      "soft-orange": '#C53678',
      "white" : '#fff'
    },
    fontFamily: {

    }
  },
  plugins: [],
}

