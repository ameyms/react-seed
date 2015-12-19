import {combineReducers} from 'redux';
import {ADD_TODO, TOGGLE_TODO, DELETE_TODO} from './actions';

let todoCounter = 1;

const todo = (state = {}, action) => {

    switch (action.type) {
        case ADD_TODO:
            return {
                ...action.data,
                id: todoCounter++,
                completed: false
            };

        case TOGGLE_TODO:
            if (state.id === action.data.id || !action.data.id) {
                return {
                    ...state,
                    completed: !state.completed
                };
            } else {
                return state;
            }

        default:
            return state;
    }
};


const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                todo(null, action)
            ];

        case TOGGLE_TODO:
            return state.map(t =>
                todo(t, action)
            );

        case DELETE_TODO:
            return state.filter(t => (action.data.id !== t.id));

        default:
            return state;

    }
};

const appReducer = combineReducers({todos});
export default appReducer;
