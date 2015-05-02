var AppDispatcher = require('../commons/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var GreetingConstants = require('../constants/GreetingConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'CHANGE_EVENT';
var _currentGreeting = 'Hello';

var GreetingStore = assign({}, EventEmitter.prototype, {

    getCurrentGreeting: function() {
        return _currentGreeting;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {

    switch (action.actionType) {
        case GreetingConstants.GREET:
            _currentGreeting = action.greetingText;
            GreetingStore.emitChange();
            break;
    }
});

module.exports = GreetingStore;
