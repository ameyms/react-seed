import AppDispatcher from '../commons/AppDispatcher';
import {SEND_GREET} from '../constants/GreetingConstants';

export function greet(greetingText) {
    AppDispatcher.dispatch({
        actionType: SEND_GREET,
        greetingText
    });
}
