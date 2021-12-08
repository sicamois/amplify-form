import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'

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
  plugins: [postcss({ extract: true }), typescript()],
  external: ['react', 'react-dom', 'aws-amplify']
}
