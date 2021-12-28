import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'esm'
    },
    plugins: [
        esbuild({ tsconfig: 'tsconfig.build.json' }),
        postcss({
            plugins: []
          }),
    ]
};
