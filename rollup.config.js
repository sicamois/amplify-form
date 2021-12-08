// import path from 'path'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import pkg from './package.json'

export default {
  preserveModules: true,
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
  plugins: [
    nodeResolve(), 
    commonjs(), 
    typescript(), 
    postcss({
      extract: 'src/styles/index.css'
    }),
  ],
  external: ['react', 'react-dom', 'aws-amplify']
}
