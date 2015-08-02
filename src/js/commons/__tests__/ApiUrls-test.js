jest.dontMock('../ApiUrls');


describe('ApiUrls', function() {

    var makeApiRequest;

    beforeEach(function() {
        makeApiRequest = require('../ApiUrls');
    });

    describe('Greeting APIs', function() {
        it('should construct correct endpoint for listing greetings', function() {

            let url = makeApiRequest('greeting.list');

            expect(url).toBe('/api/v1/greetings');
        });
    });


});
