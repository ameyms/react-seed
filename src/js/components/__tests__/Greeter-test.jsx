jest.dontMock('../Greeter');
jest.dontMock('../../../../mock/responses/greetings/list.json');

describe('Greeter', function() {

    var Greeter, GreetingActions, GreetingXhrApi,
        React, TestUtils, Promise,
        greeterEl, btnEl, textBoxEl, spanEl, dummyPromise, mockResponse, resolveFn;

    beforeEach(function() {

        React = require('react/addons');
        GreetingXhrApi = require('../../xhr/GreeterXhrApi');
        GreetingActions = require('../../actions/GreetingActions');
        Promise = require('es6-promise').Promise;
        Greeter = require('../Greeter');
        TestUtils = React.addons.TestUtils;
        mockResponse = require('../../../../mock/responses/greetings/list.json');

        dummyPromise = new Promise(function(resolve) {
            resolveFn = resolve;
        });
        GreetingXhrApi.list.mockReturnValue(dummyPromise);

        greeterEl = TestUtils.renderIntoDocument(
            <Greeter/>
        );

        textBoxEl = greeterEl.refs.greetText;
        spanEl = greeterEl.refs.greetLabel;
        btnEl = greeterEl.refs.greetBtn;

    });

    describe('pre conditions', function() {
        it('initially says `Hello`', function() {
            let spanNode = React.findDOMNode(spanEl);
            expect(spanNode.textContent).toBe('Hello');
        });
    });

    describe('reactions to typing', function() {
        beforeEach(function() {
            let txtBoxNode = React.findDOMNode(textBoxEl);
            TestUtils.Simulate.change(txtBoxNode, {target: {value: 'Namaste'}});
        });

        it('changes greeting when its changed in textbox', function() {
            let spanNode = React.findDOMNode(spanEl);
            expect(spanNode.textContent).toBe('Namaste');
        });
    });


    describe('reactions to button click', function() {
        beforeEach(function() {
            let btnNode = React.findDOMNode(btnEl);
            TestUtils.Simulate.click(btnNode);
        });

        it('publishes greeting update when button is clicked', function() {
            expect(GreetingActions.greet).toBeCalled();
        });
    });

    describe('greeting list', function() {
        beforeEach(function() {
            resolveFn(mockResponse);
        });

        pit('should fetch a list of greetings', function() {

            return dummyPromise.then(function() {
                let ul = TestUtils.findRenderedDOMComponentWithTag(greeterEl, 'ul');
                let items = TestUtils.scryRenderedDOMComponentsWithTag(ul, 'li');
                expect(items.length).toBe(mockResponse.data.list.length);

            });

        });
    });

});
