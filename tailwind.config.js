module.exports = {
  mode: 'jit',
  purge: [
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      
    },
  },
  variants: {
    
  },
  plugins: [require('@tailwindcss/forms')],
}
