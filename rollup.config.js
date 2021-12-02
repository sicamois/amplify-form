import postcss from "rollup-plugin-postcss";
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
      typescript(),
      nodeResolve(),
      commonjs({
        namedExports: {
          'node_modules/formik/node_modules/scheduler/index.js' : ['unstable_runWithPriority'],
        }
      }),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extensions: [".css"],
        minimize: true,
        inject: {
          insertAt: "top",
        },
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
    ],
    external: ["react", "react-dom", "aws-amplify"],
};