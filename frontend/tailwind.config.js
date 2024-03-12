/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Baloo", "sans-serif"], //title font as Baloo
      },
      colors: {
        "dullGreen": "#7F9F80",
        "lightGreen": "#DFEFCD",
        "mediumGreen": "#9ABD71",
        "midDarkGreen": "#C9D7C9",
        "darkGreen": "#476948",
        "lightBlue": "#C7DBE8",
        "navyBlue": "#174978"
      }, 
      lineHeight: {
        'extra-loose': '25px',
      }
    },
  },
  plugins: [],
};
