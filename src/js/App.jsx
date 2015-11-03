import React, {Component} from 'react';
import Greeter from './components/Greeter';
import NavBar from './components/NavBar';
import GreetingStore from './stores/GreetingStore';

import 'styles/index';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            viewReady: false,
            dataReady: false,
            heading: GreetingStore.getCurrentGreeting()
        };

        this._onNewGreeting = this._onNewGreeting.bind(this);
    }


    componentDidMount() {
        this.removeListener = GreetingStore.addListener(this._onNewGreeting.bind(this));
    }

    componentWillUnmount() {
        this.removeListener();
    }


    _onNewGreeting() {
        this.setState({
            heading: GreetingStore.getCurrentGreeting()
        });
    }
    render() {

        const heading = `${this.state.heading}, React`;

        return (
            <div>
                <NavBar />
                <div className="container">
                    <div className="jumbotron">
                        <h1 ref="heroText">{heading}</h1>
                    </div>
                    <div className="col-lg-12">
                        <Greeter/>
                    </div>
                </div>
            </div>
        );
    }
}

App.displayName = 'App';
