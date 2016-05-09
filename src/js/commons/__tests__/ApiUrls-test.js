jest.dontMock('../ApiUrls');


describe('ApiUrls', function() {

    var makeApiRequest;

    beforeEach(function() {
        makeApiRequest = require('../ApiUrls').default;
    });

    describe('Greeting APIs', function() {
        it('should construct correct endpoint for listing greetings', function() {

            const url = makeApiRequest('greeting.list');

            expect(url).toBe('/api/v1/greetings');
        });
    });


});
