var AppDispatcher = require('../commons/AppDispatcher');
var GreetingConstants = require('../constants/GreetingConstants');

var GreetingActions = {

    greet: function(greetingText) {
        AppDispatcher.dispatch({
            actionType: GreetingConstants.GREET,
            greetingText: greetingText
        });
    }
};

module.exports = GreetingActions;
