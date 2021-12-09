const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, opts) {
    config.plugins.push(
      postcss()
    );
    // if (opts.format === 'esm') {
    //   config = { ...config, preserveModules: true }
    //   config.output = { ...config.output, dir: 'dist/', entryFileNames: '[name].esm.js' }
    //   delete config.output.file
    // }
    return config
  },
}
