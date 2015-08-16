var webpack = require('webpack'),
    path = require('path'),
    commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js'),
    vendors = require('./vendors'),
    rootDir = path.resolve(__dirname, '../../');

// console.log(chalk.blue('Output path is now ' + rootDir + 'dist/bundle/js'));

module.exports = {

    entry: {
        main: ['Main'],
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
        modules: true,
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
                loader: 'babel',
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

    plugins: [commonsPlugin]
};
