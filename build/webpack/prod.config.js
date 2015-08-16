module.exports = {

    getConfig: function() {

        var webpack = require('webpack'),
            path = require('path'),
            commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js'),
            vendors = require('./vendors'),
            chalk = require('chalk'),
            rootDir = path.resolve(__dirname, '../../');

        console.log(chalk.blue('Webpack rootDir is' + rootDir));
        console.log(chalk.blue('Working directory is', __dirname));

        return {

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
                        exclude: /(node_modules|bower_components)/,
                        query: {
                            cacheDirectory: true,
                            optional: ['runtime'],
                            stage: 2
                        }
                    },
                    {
                        test: /\.svg$/,
                        loaders: ['url']
                    },
                    {
                        test: /\.woff\d?$/,
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
    }
};
