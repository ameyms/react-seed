var App = require('./App');
var React = require('react');
var AppRouter = require('./commons/Router');

AppRouter.init();
React.render(<App/>, document.getElementById('appRoot'));
