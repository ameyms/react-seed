/* @flow */

import AppDispatcher from '../commons/AppDispatcher';
import {EventEmitter} from 'events';
import {SEND_GREET} from '../constants/GreetingConstants';

const CHANGE_EVENT = 'CHANGE_EVENT';
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

AppDispatcher.register(function(action) {

    switch (action.actionType) {
        case SEND_GREET:
            _currentGreeting = action.greetingText;
            instance.emitChange();
            break;
    }
});


export default instance;
