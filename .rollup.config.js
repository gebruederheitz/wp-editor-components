import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
    external: ['wp'],
    input: 'index.mjs',
    output: {
        file: 'dist/index.mjs',
        format: 'esm',
        sourcemap: true,
        globals: {
            wp: 'wp',
        },
    },
    plugins: [
        resolve(),
        babel({
            babelrc: true,
            exclude: 'node_modules/**',
            sourceMaps: true,
            inputSourceMap: true,
            babelHelpers: 'bundled',
        }),
        commonjs(),
    ],
};
