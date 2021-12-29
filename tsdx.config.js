const postcss = require('rollup-plugin-postcss');
const replace = require('@rollup/plugin-replace');
const { visualizer } = require('rollup-plugin-visualizer');

module.exports = {
  rollup(config, options) {
    config.plugins = config.plugins.map(plugin =>
      plugin.name === 'replace'
        ? replace({
            'process.env.NODE_ENV': JSON.stringify(options.env),
            'preventAssignment': true,
          })
        : plugin
    );
    config.plugins.push(postcss());
    // config.plugins.push(visualizer());
    // if (options.format === 'esm') {
    //   config = { ...config, preserveModules: true }
    //   config.output = { ...config.output, dir: 'dist/', entryFileNames: '[name].esm.js' }
    //   delete config.output.file
    // }
    return config;
  },
};
