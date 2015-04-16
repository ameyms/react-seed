/* @flow */

var Backbone = require('backbone'),
    AppRouter, routerInstance;

AppRouter = Backbone.Router.extend({

    routes: {
        '': 'index',
        'pool/new': 'addPool'
    },

    index: function() {
        console.log('index');
    },

    addPool: function() {

    }
});

module.exports = {
    init: function () {
        routerInstance = new AppRouter();
        Backbone.history.start();

        return routerInstance;
    }
};
