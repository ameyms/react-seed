jest.dontMock('../Greeter');
jest.dontMock('../../../../mock/responses/greetings/list.json');

describe('Greeter', function() {

    var React, Greeter, TestUtils, GreetingXhrApi, Promise,
        greeterEl, textBoxEl, spanEl, dummyPromise, mockResponse;

    beforeEach(function() {

        React = require('react/addons');
        GreetingXhrApi = require('../../xhr/GreeterXhrApi');
        Promise = require('es6-promise').Promise;
        Greeter = require('../Greeter');
        TestUtils = React.addons.TestUtils;
        mockResponse = require('../../../../mock/responses/greetings/list.json');

        dummyPromise = new Promise(function(resolve) {
            resolve(mockResponse);
        });
        GreetingXhrApi.list.mockImplementation(() => {
            return dummyPromise;
        });

        greeterEl = TestUtils.renderIntoDocument(
            <Greeter/>
        );

        textBoxEl = greeterEl.refs.greetText;
        spanEl = greeterEl.refs.greetLabel;
    });

    it('initially says `Hello`', function() {
        let spanNode = React.findDOMNode(spanEl);
        expect(spanNode.textContent).toMatch('Hello');
    });

    it('changes greeting when its changed in textbox', function() {
        TestUtils.Simulate.change(textBoxEl, {target: {value: 'Namaste'}});
        expect(React.findDOMNode(spanEl)).toBeDefined();
    });

});
