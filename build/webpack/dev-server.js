var opn = require('opn');

module.exports = {

    start: function() {
        process.env.DEV_SERVER = 1;
        process.env.BABEL_ENV = 'dev';

        var webpack = require('webpack'),
            WebpackDevServer = require('webpack-dev-server'),
            chalk = require('chalk'),
            config = require('./dev.config');

        new WebpackDevServer(webpack(config), {
            publicPath: config.output.publicPath,
            hot: true,
            historyApiFallback: true,
            quiet: false,
            noInfo: false,
            watchOptions: {
                aggregateTimeout: 300
            },
            contentBase: 'dist/bundle',
            headers: {'X-React-Auth': 'yes'},
            stats: {colors: true}
        }).
        listen(config.devserver.port, 'localhost', function(err) {

            if (err) {
                console.log(chalk.bgRed.bold(err));
                return;
            }

            opn('http://localhost:' + config.devserver.port, function() {
                console.log(chalk.white('Listening at',
                    chalk.black.bgWhite('localhost:' + config.devserver.port)));
            });

        });
    }
};
