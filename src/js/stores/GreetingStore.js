/* @flow */

import AppDispatcher from '../commons/AppDispatcher';
import {EventEmitter} from 'events';
import {SEND_GREET} from '../constants/GreetingConstants';

let CHANGE_EVENT = 'CHANGE_EVENT';
let _currentGreeting = 'Hello';

class GreetingStore extends EventEmitter {

    getCurrentGreeting() {
        return _currentGreeting;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

const instance = new GreetingStore();
export default instance;

AppDispatcher.register(action => {

    switch (action.actionType) {
    case SEND_GREET:
        _currentGreeting = action.greetingText;
        instance.emitChange();
        break;
    }
});
