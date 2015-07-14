import 'styles/components/Greeter.less';

import React, {Component} from 'react';
import GreetingActions from '../actions/GreetingActions';
import GreetingXhrApi from '../xhr/GreeterXhrApi';

class Greeter extends Component {

    constructor() {
        super();
        this.state = {
            greeting: 'Hello'
        };

        this.render = this.render.bind(this);
        this.handleGreetingFetch = this.handleGreetingFetch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        GreetingXhrApi.list().then(this.handleGreetingFetch);
    }

    handleGreetingFetch(data) {
        this.setState({list: data.data.list});
    }

    handleChange(event) {
        this.setState({greeting: event.target.value});
    }

    handleClick() {
        event.preventDefault();
        GreetingActions.greet(this.state.greeting);
    }

    render() {

        let greetingUl = [];
        if (this.state.list) {
            greetingUl = this.state.list.map((d, i) => {
                return (
                    <li key={i}>{d}</li>
                );
            });
        }

        return (
            <form className="greeter">
                <div className="form-group">

                    <input type="text" ref="greetText"
                        className="form-control greeter-text input input-lg"
                        onChange={this.handleChange} value={this.state.greeting} />
                </div>
                <div className="form-group clear-fix">
                    <label ref="greetLabel" className="text-success greeter-lbl">
                        {this.state.greeting}
                    </label>
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
}

Greeter.displayName = 'Greeter';
export default Greeter;
