module.exports = {
  constent: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '20': '5.25rem',
        '100': '30rem',
        '200': '50rem',
        'screen': '90vw'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
