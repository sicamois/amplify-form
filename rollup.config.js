import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import packageJson from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';

const devDependencies = {
  ...packageJson.devDependencies,
};
const dependencies = {
  ...packageJson.dependencies,
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs', // commonJS
      sourcemap: process.env.NODE_ENV !== 'production',
      exports: 'named',
    },
    {
      file: packageJson.module,
      format: 'esm', // ES Modules
      sourcemap: process.env.NODE_ENV !== 'production',
    },
  ],
  plugins: [
    peerDepsExternal(),
    postcss(),
    nodeResolve(),
    commonjs({
      exclude: 'node_modules',
      ignoreGlobal: true,
    }),
    esbuild({
      tsconfig: 'tsconfig.build.json',
      minify: process.env.NODE_ENV === 'production',
      target: 'ESNext',
      optimizeDeps: {
        include: Object.keys(dependencies),
      },
    }),
    visualizer(),
  ],
  external: Object.keys(devDependencies),
};
