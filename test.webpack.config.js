const nodeExternals = require('webpack-node-externals');
const path = require('path');

const alias = {
    '@': path.resolve(__dirname, 'src'),
};

module.exports = {
    mode: 'development',
    target: 'node', // webpack should compile node compatible code
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    resolve: {
        alias,
    },
    devtool: 'inline-cheap-module-source-map',
    output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    },
}

