import globalDispatcher from '../commons/AppDispatcher';
import {SEND_GREET} from '../constants/GreetingConstants';

export function greet(greetingText) {
    globalDispatcher.dispatch({
        actionType: SEND_GREET,
        greetingText
    });
}
