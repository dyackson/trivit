const nodeExternals = require('webpack-node-externals');
const path = require('path');
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];

const alias = {
    '@': path.resolve(__dirname, 'src'),
};

module.exports = {
    mode: 'development',
    target: 'node', // webpack should compile node compatible code
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    resolve: {
        alias,
        extensions,
        mainFields,
    },
        module: {
            rules: [
                {
                    test: /\.(svelte|html)$/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            dev: true,
                            hydratable: true,
                            hotReload: false // pending https://github.com/sveltejs/svelte/issues/2377
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                }
            ]
        },
    devtool: 'inline-cheap-module-source-map',
    output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    },
}

