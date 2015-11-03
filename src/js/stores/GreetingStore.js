/* @flow */

import globalDispatcher from '../commons/AppDispatcher';
import {Store} from 'flux/utils';
import {SEND_GREET} from '../constants/GreetingConstants';

let _currentGreeting = 'Hello';

class GreetingStore extends Store {

    constructor(dispatcher) {
        super(dispatcher);
    }

    getCurrentGreeting() {
        return _currentGreeting;
    }

    __onDispatch(action) {
        switch (action.actionType) {
            case SEND_GREET:
                _currentGreeting = action.greetingText;
                this.__emitChange();
                break;
        }
    }
}

const instance = new GreetingStore(globalDispatcher);
export default instance;
