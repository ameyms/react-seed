jest.dontMock('../GreeterXhrApi');


describe('GreeterXhrApi', function() {

    const URL_GREETING_LIST = 'fubar/greeting/list';

    var makeApiRequest, greeterList, $;

    beforeEach(function() {
        greeterList = require('../GreeterXhrApi').list;
        makeApiRequest = require('../../commons/ApiUrls').default;
        $ = require('jquery');

    });

    describe('Listing API', function() {

        beforeEach(function() {
            makeApiRequest.mockReturnValue(URL_GREETING_LIST);
            greeterList();
        });
        it('should call correct API', function() {
            expect(makeApiRequest).lastCalledWith('greeting.list');
        });

        it('should pass correct params to XHR', function() {
            expect($.ajax).lastCalledWith({
                url: URL_GREETING_LIST
            });
        });
    });
});
