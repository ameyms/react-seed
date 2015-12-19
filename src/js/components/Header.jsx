import React from 'react';
import store from '../commons/store';
import {ADD_TODO} from '../commons/actions';

const Header = () => {

    let todoText = null;

    return (
        <header className="header">
            <h1>{'todos'}</h1>
            <input className="new-todo" ref={node => {todoText = node;}}
                onKeyPress={e => {
                    if (e.charCode !== 13) {
                        return;
                    }
                    e.preventDefault();
                    store.dispatch({
                        type: ADD_TODO,
                        data: {
                            title: todoText.value
                        }
                    });
                    todoText.value = '';
                }}
                placeholder="What needs to be done?" autoFocus/>
         </header>
     );
};

Header.displayName = 'Header';
export default Header;
