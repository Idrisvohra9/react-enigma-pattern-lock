import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript'
export default [
    {
        input: 'src/index.tsx',
        output: [
            {
                file: "dist/index.js",
                format: 'cjs',
            },
            {
                file: "dist/index.es.js",
                format: 'es',
                exports: "named"
            }
        ],
        plugins: [
            resolve(),
            commonjs({
                include: /node_modules/,
                requireReturnsDefault: 'auto', // <---- this solves default issue
            }),
            babel({
                babelHelpers: 'runtime',
                presets: ['@babel/preset-react', '@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime'],
                exclude: 'node_modules/**',
            }),
            postcss({
                plugins: [],
                minimize: true,
                extract: true,
                extract: 'styles/bundle.css',
            }),
            terser(),
            typescript({ sourceMap: true }),
        ],
        external: ['react', 'react-dom', '@babel/runtime'], // Specify external dependencies
    }
];