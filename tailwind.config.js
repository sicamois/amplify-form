module.exports = {
  purge: ["src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        'sm': '5.25rem',
        '2xl': '30rem',
        '3xl': '50rem',
        'screen': '90vw'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
