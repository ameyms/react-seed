import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {TOGGLE_TODO, DELETE_TODO} from '../commons/actions';
import store from '../commons/store';

const Todo = ({
    item
}) => (
    <li className={classNames({completed: item.completed})}>
        <div className="view">
            <input className="toggle" type="checkbox"
                onClick={() => {
                    store.dispatch({
                        type: TOGGLE_TODO,
                        data: {id: item.id}
                    });
                }}/>
            <label>{item.title}</label>
            <button className="destroy" onClick={() => {
                store.dispatch({
                    type: DELETE_TODO,
                    data: {id: item.id}
                });
            }}/>
        </div>
        <input className="edit" value="Create a TodoMVC template" />
    </li>
);
Todo.contextTypes = {
    store: PropTypes.object
};

Todo.displayName = 'Todo';
export default Todo;
