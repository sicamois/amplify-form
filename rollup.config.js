import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve';

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [nodeResolve(), postcss(), typescript()],
  external: ['react', 'react-dom', 'aws-amplify']
}
