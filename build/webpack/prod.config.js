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
                        test: /\.scss$/,
                        loaders: ['style', 'css?minimize', 'sass']
                    },
                    {
                        test: /\.css$/,
                        loaders: ['style', 'css?minimize']
                    },
                    {
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
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
                extensions: ['', '.js', '.json', '.jsx', '.scss', '.css'],
                alias: {styles: 'src/styles'}
            },

            plugins: [commonsPlugin]
        };
    }
};
