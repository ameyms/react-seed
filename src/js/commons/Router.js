import Backbone from 'backbone';

const AppRouter = Backbone.Router.extend({

    routes: {
        '': 'index',
        'pool/new': 'addPool'
    },

    index: () => {
        console.log('index');
    },

    addPool: () => {

    }
});

export function init() {
    const routerInstance = new AppRouter();
    Backbone.history.start();

    return routerInstance;
}
