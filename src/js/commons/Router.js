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

routerInstance = new AppRouter();
Backbone.history.start();

// Export it as a singleton
module.exports = routerInstance;
