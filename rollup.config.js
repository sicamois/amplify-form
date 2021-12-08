// import path from 'path'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      // sourcemap: true,
      strict: true
    }
  ],
  plugins: [
    nodeResolve(), 
    commonjs(), 
    typescript(), 
    postcss(),
  ],
  external: ['react', 'react-dom', 'aws-amplify']
}
