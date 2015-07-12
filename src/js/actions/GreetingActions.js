import AppDispatcher from '../commons/AppDispatcher';
import * as GreetingConstants from '../constants/GreetingConstants';

export default {

    greet(greetingText) {
        AppDispatcher.dispatch({
            actionType: GreetingConstants.GREET,
            greetingText
        });
    }
};
