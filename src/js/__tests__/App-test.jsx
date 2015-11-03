jest.dontMock('../App');


xdescribe('App', function() {

    var React, ReactDOM, TestUtils,
        GreetingStore, App,
        appEl, heroText, dummyChangeHandler;

    beforeEach(function() {
        React = require('react');
        ReactDOM = require('react-dom');
        TestUtils = require('react-addons-test-utils');


        GreetingStore = require('../stores/GreetingStore');
        GreetingStore.addChangeListener.mockImpl(function(cb) {
            dummyChangeHandler = cb;
        });

        App = require('../App');

        appEl = TestUtils.renderIntoDocument(<App/>);
        heroText = appEl.refs.heroText;

    });

    describe('pre conditions', function() {
        it('adds a change handler on GreetingStore', function() {
            expect(GreetingStore.addChangeListener).toBeCalled();
        });
    });

    describe('reactions to store changes', function() {
        beforeEach(function() {
            GreetingStore.getCurrentGreeting.mockReturnValue('nuqneH');
            dummyChangeHandler();
        });

        it('should change hero text', function() {
            const headingNode = ReactDOM.findDOMNode(heroText);
            expect(headingNode.textContent).toMatch('nuqneH');
        });

    });
});
