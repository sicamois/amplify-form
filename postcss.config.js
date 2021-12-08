import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

module.exports = {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
  sourceMap: true,
  extract: true,
  minimize: true
};