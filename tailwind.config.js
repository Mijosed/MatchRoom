/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,vue,tsx}"],
  theme: {
    extend: {
      fontFaamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
      container: {
        center: true,
        padding: "2rem",
        
      },
    },
  },
  plugins: [],
}

