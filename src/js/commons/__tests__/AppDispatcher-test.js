/*
Shamelessly copied from Facebook Flux's TodoMVC example
github.com/facebook/flux/blob/master/examples/flux-todomvc/js/dispatcher/__tests__/AppDispatcher-test.js
*/

jest.autoMockOff();

describe('AppDispatcher', function() {

    var AppDispatcher;

    beforeEach(function() {
        AppDispatcher = require('../AppDispatcher');
    });

    it('sends actions to subscribers', function() {

        var listener = jest.genMockFunction(),
        payload = {};

        AppDispatcher.register(listener);
        AppDispatcher.dispatch(payload);
        expect(listener.mock.calls.length).toBe(1);
        expect(listener.mock.calls[0][0]).toBe(payload);
    });

    it('waits with chained dependencies properly', function() {

        var payload = {},
        listener1Done = false,
        listener2Done = false,
        listener3Done = false,
        listener4Done = false,
        index2, index3, index4, listener1, listener2, listener3, listener4;

        listener1 = function() {
            AppDispatcher.waitFor([index2, index4]);
            expect(listener2Done).toBe(true);
            expect(listener3Done).toBe(true);
            expect(listener4Done).toBe(true);
            listener1Done = true;
        };

        AppDispatcher.register(listener1);


        listener2 = function() {
            AppDispatcher.waitFor([index3]);
            expect(listener3Done).toBe(true);
            listener2Done = true;
        };
        index2 = AppDispatcher.register(listener2);


        listener3 = function() {
            listener3Done = true;
        };

        index3 = AppDispatcher.register(listener3);

        listener4 = function() {
            AppDispatcher.waitFor([index3]);
            expect(listener3Done).toBe(true);
            listener4Done = true;
        };
        index4 = AppDispatcher.register(listener4);

        runs(function() {
            AppDispatcher.dispatch(payload);
        });

        waitsFor(function() {
            return listener1Done;
        }, 'Not all subscribers were properly called', 500);

        runs(function() {
            expect(listener1Done).toBe(true);
            expect(listener2Done).toBe(true);
            expect(listener3Done).toBe(true);
        });
    });
});
