import 'styles/components/Greeter.less';

import React, {Component} from 'react/addons';
import {greet} from '../actions/GreetingActions';
import {list} from '../xhr/GreeterXhrApi';

export default class Greeter extends Component {

    constructor() {
        super();
        this.state = {
            greeting: 'Hello'
        };

        this.handleGreetingFetch = this.handleGreetingFetch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateGreeting = this.updateGreeting.bind(this);
    }

    componentDidMount() {
        list().then(this.handleGreetingFetch);
    }

    handleGreetingFetch(data) {
        this.setState({list: data.data.list});
    }

    handleChange(event) {
        this.setState({greeting: event.target.value});
    }

    handleClick(event) {
        event.preventDefault();
        greet(this.state.greeting);
    }

    updateGreeting(greetText) {
        this.setState({greeting: greetText});
    }

    render() {

        let greetingUl = [];
        if (this.state.list) {
            greetingUl = this.state.list.map((d, i) =>
                <li className="greet-item" key={i}>
                    <a href="#" className="is-link"
                        onClick={this.updateGreeting.bind(this, d)}>
                        {d}
                    </a>
                </li>
            );
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
                        ref="greetBtn" onClick={this.handleClick}>
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
