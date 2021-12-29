/**
 * @type {import('rollup').RollupOptions}
 */
import postcss from 'rollup-plugin-postcss';
import packageJson from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import visualizer from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';

const devDependencies = {
  ...packageJson.devDependencies,
};
const peerDependencies = {
  ...packageJson.peerDependencies,
};
const dependencies = {
  ...packageJson.dependencies,
};

const config = {
  input: 'src/index.ts',
  output: [
    // {
    //   file: packageJson.main,
    //   format: 'cjs', // commonJS
    //   sourcemap: process.env.NODE_ENV !== 'production',
    //   exports: 'named',
    // },
    {
      dir: 'dist',
      format: 'esm', // ES Modules
      // preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: process.env.NODE_ENV !== 'production',
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve(),
    commonjs({
      exclude: 'node_modules',
      ignoreGlobal: true,
    }),
    typescript({
      tsconfig: './tsconfig.build.json',
    }),
    postcss(),
    terser(),
    visualizer({
      open: true,
    }),
  ],
};

export default config;
