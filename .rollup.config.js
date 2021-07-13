import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
    external: ['wp'],
    input: 'index.js',
    output: {
        // file: 'dist/index.mjs',
        dir: 'dist/',
        preserveModules: true,
        format: 'esm',
        sourcemap: true,
        globals: {
            wp: 'wp',
        },
    },
    plugins: [
        resolve(),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            sourceMaps: true,
            inputSourceMap: true,
            babelHelpers: 'bundled',
            presets: [
                ["@babel/preset-env"],
            ],
            plugins: [
                "@babel/plugin-transform-react-jsx",
            ]
        }),
        commonjs(),
    ],
};
