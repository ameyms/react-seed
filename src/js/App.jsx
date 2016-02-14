import React, {Component} from 'react';

import store from './commons/store';
import Header from './components/Header';
import Todo from './components/Todo';


import 'styles/index';
import 'todomvc-app-css/index';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            heading: 'Hello'
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this._onStoreChange();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    _onStoreChange() {
        this.setState({});
    }


    render() {

        return (
            <section className="todoapp">
                <Header/>
                <section className="main">
    				<input className="toggle-all" type="checkbox" />
    				<label htmlFor="toggle-all">
                        {'Mark all as complete'}
                    </label>
    				<ul className="todo-list">
                        {store.getState().todos.map(t => (
                            <Todo item={t} />
                        ))}
    				</ul>
                </section>
                <footer className="footer">
                    <span className="todo-count">
                        <strong>{store.getState().todos.reduce((count, t) => {
                            if (!t.completed) {
                                return count + 1;
                            } else {
                                return count;
                            }
                        }, 0)}</strong>
                        {' items left'}</span>
                    <ul className="filters">
                        <li>
                        	<a className="selected" href="#/">{'All'}</a>
                        </li>
                        <li>
                        	<a href="#/active">{'Active'}</a>
                        </li>
                        <li>
                        	<a href="#/completed">{'Completed'}</a>
                        </li>
                    </ul>
                    <button className="clear-completed">
                        {'Clear completed'}
                    </button>
                </footer>
            </section>
        );
    }
}

App.displayName = 'App';
