var webpack = require('webpack'),
    path = require('path'),
    chalk = require('chalk'),

    definePlugin = require('./defs'),
    commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js'),
    hotReplacePlugin = new webpack.HotModuleReplacementPlugin(),
    noErrorsPlugin = new webpack.NoErrorsPlugin(),

    vendors = require('./vendors'),
    devServerOpts = {
        host: 'localhost',
        port: 9000
    },
    rootDir = path.resolve(__dirname, '../../');

console.log(chalk.blue('Output path is now ' + rootDir + 'dist/bundle/js') );

module.exports = {devserver: devServerOpts,

    entry: {
        main: [
            'webpack-dev-server/client?http://0.0.0.0:' + devServerOpts.port,
            'webpack/hot/only-dev-server',
            'Main'
        ],
        vendor: vendors

    },

    output: {
        path: path.join(__dirname, '../../dist/bundle/js'),
        publicPath: '/js',
        filename: '[name].bundle.js',
        sourceMapFilename: '[file].map'
    },

    stats: {
        colors: true,
        modules: false,
        reasons: false
    },

    failOnError: true,
    storeStatsTo: 'webpackStats',

    module: {
        loaders: [
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'autoprefixer', 'less']
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'jsx?harmony']
            },
            {
                test: /\.js$/,
                loaders: ['react-hot']
            },
            {
                test: /\.svg$/,
                loaders: ['url-loader']
            },
            {
                test: /\.woff2?$/,
                loaders: ['url?limit=10000']
            },
            {
                test: /\.((eot)|(ttf))$/,
                loaders: ['file']
            }
        ]
    },

    resolve: {
        root: rootDir,
        modulesDirectories: ['src/js', 'node_modules'],
        extensions: ['', '.js', '.json', '.jsx', '.less'],
        alias: {styles: 'src/styles'}
    },

    plugins: [definePlugin, commonsPlugin, hotReplacePlugin, noErrorsPlugin]
};
