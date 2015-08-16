var webpack = require('webpack'),
    path = require('path'),
    vendors = require('./vendors'),

    devServerOpts = {
        host: 'localhost',
        port: 9000
    },
    rootDir = path.resolve(__dirname, '../../'),

    // Plugins:
    normalReplacePlugin, commonsPlugin, hotReplacePlugin, noErrorsPlugin;

normalReplacePlugin = new webpack.NormalModuleReplacementPlugin(/ApiUrls\.js/,
       path.join(rootDir, 'mock/MockApiUrls.js'));
commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
hotReplacePlugin = new webpack.HotModuleReplacementPlugin();
noErrorsPlugin = new webpack.NoErrorsPlugin();

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
                loaders: ['style', 'css', 'less']
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                exclude: /(node_modules|bower_components)/
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

    plugins: [normalReplacePlugin, commonsPlugin, hotReplacePlugin, noErrorsPlugin]
};
