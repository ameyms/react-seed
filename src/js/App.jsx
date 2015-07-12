import React from 'react';
import Greeter from './components/Greeter';
import NavBar from './components/NavBar';
import GreetingStore from './stores/GreetingStore';

import 'styles/main.less';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            viewReady: false,
            dataReady: false,
            heading: GreetingStore.getCurrentGreeting()
        };

        this._onNewGreeting = this._onNewGreeting.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUnmount = this.componentDidUnmount.bind(this);
        this.render = this.render.bind(this);
    }

    _onNewGreeting() {
        this.setState({
            heading: GreetingStore.getCurrentGreeting()
        });
    }

    componentDidMount() {
        GreetingStore.addChangeListener(this._onNewGreeting);
    }

    componentDidUnmount() {
        GreetingStore.removeChangeListener(this._onNewGreeting);
    }

    render() {

        var heading = this.state.heading + ', React';

        return (
            <div>
                <NavBar />
                <div className="container">
                    <div className="jumbotron">
                        <h1>{heading}</h1>
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

export default App;
