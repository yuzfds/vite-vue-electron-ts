const path = require('path');
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const esbuild = require('rollup-plugin-esbuild');
const json = require('@rollup/plugin-json')
const externals = require('rollup-plugin-node-externals')

module.exports = (env = 'production') =>{
    const options = {
        input: path.join(__dirname, '../src/main/index.ts'),
        output: {
            file: path.join(__dirname, '../dist/bundle.js'),
            format: 'cjs',
            name: 'ElectronMainBundle',
            sourcemap: false
        },
        plugins: [
            nodeResolve.nodeResolve({
                extensions: ['.ts', '.js']
            }),
            commonjs(),
            json(),
            esbuild({
                include: /\.[jt]sx?$/,
                exclude: /node_modules/,
                sourceMap: false,
                minify: false,
                target: 'esnext',
                define: {
                    __VERSION__: '"x.y.z"'
                },
                tsconfig: 'tsconfig.json',
                loaders: {
                    ".json": 'json',
                    ".js": 'jsx',
                    ".ts": 'tsx'
                }
            }),
            externals(),
        ],
        external:['electron']

    }
    return options
}