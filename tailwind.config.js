/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], //<-- This was missing
  theme: {
    extend: {
      fontFamily: {
        luckiest: ['"Luckiest Guy"', "cursive"],
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        redriot: "#D72638",
        limepunk: "#AFFF00",
        crust: "#FFF1C1",
        blackout: "#121212",
      },
    },
  },
  plugins: [],
};
