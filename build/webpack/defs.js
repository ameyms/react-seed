var webpack = require('webpack');
var mockUrls = require('../../mock/mock-urls');

module.exports = new webpack.DefinePlugin({
    __DEV_SERVER__: process.env.DEV_SERVER || 'false',
    __MOCK_MANIFEST__: JSON.stringify(mockUrls)
});
