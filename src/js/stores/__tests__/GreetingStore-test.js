jest.dontMock('../GreetingStore');

describe('GreetingStore', function() {

    var GreetingStore;

    beforeEach(function() {
        GreetingStore = require('../GreetingStore');

    });

    describe('pre conditions', function() {
        it('should have initial greeting `Hello`', function() {
            expect(GreetingStore.getCurrentGreeting()).toBe('Hello');
        });
    });

});
