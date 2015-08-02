jest.dontMock('../GreetingActions');


describe('GreetingActions', function() {

    var GreetingActions, SEND_GREET, AppDispatcher;

    beforeEach(function() {
        GreetingActions = require('../GreetingActions');
        SEND_GREET = require('../../constants/GreetingConstants').SEND_GREET;
        AppDispatcher = require('../../commons/AppDispatcher');

        GreetingActions.greet('Konichiwa');
    });

    it('calls dispatcher with correct params', function() {
        expect(AppDispatcher.dispatch).lastCalledWith({
            actionType: SEND_GREET,
            greetingText: 'Konichiwa'
        });
    });
});
