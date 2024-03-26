/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        "purple-telemagnet": "#C53678",
        "mint-green": "#98FB98",
        "soft-white": "#F8F8FF",
        "soft-orange": "#FF6F61",
        "gray-dark": "#374151",
        "gray-light": "#94a3b8",
      },
    },
  },
  plugins: [],
};
