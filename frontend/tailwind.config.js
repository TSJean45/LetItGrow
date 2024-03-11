/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Baloo", "sans-serif"], //title font as Baloo
      },
      colors: {
        "mediumGreen": "#9ABD71",
        "darkGreen": "#476948",
        "lightBlue": "#C7DBE8"
      },
    },
  },
  plugins: [],
};
