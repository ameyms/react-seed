require('styles/components/Greeter.less');

var React = require('react');
var GreetingActions = require('../actions/GreetingActions');
var GreetingXhrApi = require('../xhr/GreeterXhrApi');

var Greeter = React.createClass({

    displayName: 'Greeter',

    getInitialState: function() {
        return {
            greeting: 'Hello'
        };
    },

    componentDidMount: function() {
        GreetingXhrApi.list().done(this.handleGreetingFetch.bind(this));
    },

    handleGreetingFetch: function (data) {
        this.setState({list: data.data.list});
    },

    handleChange: function(event) {
        this.setState({greeting: event.target.value});
    },

    handleClick: function() {
        GreetingActions.greet(this.state.greeting);
    },

    render: function() {

        var greetingUl = [],
            i, len;

        if (this.state.list) {
            len = this.state.list.length;
            for (i = 0; i < len; i++) {
                greetingUl.push(
                    <li>
                        {this.state.list[i]}
                    </li>
                );
            }
        }
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
                <ul>
                    {greetingUl}
                </ul>
            </form>
        );
    }

});

module.exports = Greeter;
