const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["Baloo", "sans-serif"], //title font as Baloo
      },
      colors: {
        ultLightGreen: "#D4DFD4",
        dullGreen: "#7F9F80",
        lightGreen: "#DFEFCD",
        mediumGreen: "#9ABD71",
        midDarkGreen: "#C9D7C9",
        darkGreen: "#476948",
        lightBlue: "#C7DBE8",
        skyBlue: "#DAEEFB",
        navyBlue: "#174978",
        darkNavy: "#2F5F8A",
        grayBorder: "#D4DFD4",
      },
      lineHeight: {
        "extra-loose": "25px",
      },
      screens: {
        'mobile': {'max': '640px'},
        'tablet': {'max': '1024px'},
      },
    },
  },
  plugins: [],
});
