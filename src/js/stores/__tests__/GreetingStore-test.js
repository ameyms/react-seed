jest.dontMock('../GreetingStore');

describe('GreetingStore', function() {

    var GreetingStore, AppDispatcher, SEND_GREET,
        registrationFn, changeHandlerFn;

    beforeEach(function() {
        SEND_GREET = require('../../constants/GreetingConstants').SEND_GREET;
        changeHandlerFn = jest.genMockFunction();

        AppDispatcher = require('../../commons/AppDispatcher');
        GreetingStore = require('../GreetingStore');

    });

    describe('pre conditions', function() {
        it('should have initial greeting `Hello`', function() {
            expect(GreetingStore.getCurrentGreeting()).toBe('Hello');
        });

        it('should register with the dispatcher', function() {
            expect(AppDispatcher.register).toBeCalled();
        });
    });

    describe('functionality', function() {

        beforeEach(function() {
            GreetingStore.addChangeListener(changeHandlerFn);
            registrationFn = AppDispatcher.register.mock.calls[0][0];

            registrationFn({
                actionType: SEND_GREET,
                greetingText: 'Namaste'
            });
        });

        it('should emit change event', function() {
            expect(changeHandlerFn).toBeCalled();
        });

        it('should correctly store new greeting', function() {
            expect(GreetingStore.getCurrentGreeting()).toBe('Namaste');
        });
    });


});
