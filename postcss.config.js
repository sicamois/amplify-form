// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors
module.exports = {
  plugins: [
    // require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    // require('cssnano')({
    //   preset: 'default',
    // }),
  ],
}
