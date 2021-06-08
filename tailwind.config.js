module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#F14259',
        'primary-dark': '#d3162f',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};