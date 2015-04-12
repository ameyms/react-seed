var React = require('react');
var Greeter = require('./components/Greeter');
var NavBar = require('./components/NavBar');
var GreetingStore = require('./stores/GreetingStore');
var App;

require('styles/main.less');

App = React.createClass({

    displayName: 'App',

    getInitialState: function() {
        return {
            viewReady: false,
            dataReady: false,
            heading: GreetingStore.getCurrentGreeting()
        };
    },

    _onNewGreeting: function() {
        this.setState({
            heading: GreetingStore.getCurrentGreeting()
        });
    },

    componentDidMount: function() {
        GreetingStore.addChangeListener(this._onNewGreeting);
    },

    componentDidUnmount: function() {
        GreetingStore.removeChangeListener(this._onNewGreeting);
    },

    render: function() {
        return (
            <div>
                <div className="header">
                    <NavBar />
                </div>
                <div className="container">
                    <div className="jumbotron">
                        <h1>{this.state.heading}, React</h1>
                    </div>
                    <div className="col-lg-12">
                        <Greeter/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
