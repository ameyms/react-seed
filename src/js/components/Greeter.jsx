require('styles/components/Greeter.less');

var React = require('react');
var GreetingActions = require('../actions/GreetingActions');

var Greeter = React.createClass({

    displayName: 'Greeter',

    getInitialState: function() {
        return {
            greeting: 'Hello'
        };
    },

    handleChange: function(event) {
        this.setState({greeting: event.target.value});
    },

    handleClick: function() {
        GreetingActions.greet(this.state.greeting);
    },

    render: function() {
        return (
            <form className={'greeter'}>
                <div className="form-group">

                    <input type="text"
                        className="form-control greeter-text input input-lg"
                        onChange={this.handleChange} value={this.state.greeting} />
                </div>
                <div className="form-group clear-fix">
                    <label className="text-success greeter-lbl">{this.state.greeting}</label>
                    <button className="btn btn-success btn-lg pull-right greeter-btn"
                        onClick={this.handleClick}>
                        Say it
                    </button>
                </div>
            </form>
        );
    }

});

module.exports = Greeter;
