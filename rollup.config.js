/**
 * @type {import('rollup').RollupOptions}
 */

import packageJson from './package.json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        exports: 'default',
      },
      {
        file: packageJson.module,
        format: 'esm',
      },
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: 'tsconfig.build.json' }),
      postcss(),
      terser(),
      visualizer({ open: true }),
    ],
    external: [
      ...Object.keys(packageJson.dependencies),
      'lodash/set',
      'lodash/get',
      'lodash/capitalize',
      'lodash/camelCase',
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/types.d.ts', format: 'esm' }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];

export default config;
