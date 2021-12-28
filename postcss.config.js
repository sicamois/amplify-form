module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
};
