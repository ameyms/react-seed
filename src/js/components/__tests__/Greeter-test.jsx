jest.dontMock('../Greeter');
jest.dontMock('../../../../mock/responses/greetings/list.json');

describe('Greeter', function() {

    var Greeter, GreetingActions, GreetingXhrApi,
        React, ReactDOM, TestUtils, Promise,
        greeterEl, greeterDom, btnEl, textBoxEl, spanEl, dummyPromise, mockResponse, resolveFn;

    beforeEach(function() {

        React = require('react');
        ReactDOM = require('react-dom');
        GreetingXhrApi = require('../../xhr/GreeterXhrApi');
        GreetingActions = require('../../actions/GreetingActions');
        Promise = require('es6-promise').Promise;
        Greeter = require('../Greeter');
        TestUtils = require('react-addons-test-utils');
        mockResponse = require('../../../../mock/responses/greetings/list.json');

        dummyPromise = new Promise(function(resolve) {
            resolveFn = resolve;
        });
        GreetingXhrApi.list.mockReturnValue(dummyPromise);


        greeterEl = <Greeter/>;

        greeterDom = TestUtils.renderIntoDocument(
            greeterEl
        );

        textBoxEl = greeterDom.refs.greetText;
        spanEl = greeterDom.refs.greetLabel;
        btnEl = greeterDom.refs.greetBtn;

    });

    describe('pre conditions', function() {
        it('initially says `Hello`', function() {
            const spanNode = ReactDOM.findDOMNode(spanEl);
            expect(spanNode.textContent).toBe('Hello');
        });
    });

    describe('reactions to typing', function() {
        beforeEach(function() {
            const txtBoxNode = ReactDOM.findDOMNode(textBoxEl);
            TestUtils.Simulate.change(txtBoxNode, {target: {value: 'Namaste'}});
        });

        it('changes greeting when its changed in textbox', function() {
            const spanNode = ReactDOM.findDOMNode(spanEl);
            expect(spanNode.textContent).toBe('Namaste');
        });
    });


    describe('reactions to button click', function() {
        beforeEach(function() {
            const btnNode = ReactDOM.findDOMNode(btnEl);
            TestUtils.Simulate.click(btnNode);
        });

        it('publishes greeting update when button is clicked', function() {
            expect(GreetingActions.greet).toBeCalled();
        });
    });

    xdescribe('greeting list', function() {
        beforeEach(function() {
            resolveFn(mockResponse);
        });

        pit('should fetch a list of greetings', function() {

            return dummyPromise.then(function() {
                const ul = TestUtils.findRenderedDOMComponentWithTag(greeterEl, ReactDOM.ul);
                const items = TestUtils.scryRenderedDOMComponentsWithTag(ul, ReactDOM.li);
                expect(items.length).toBe(mockResponse.data.list.length);

            });

        });
    });

});
