jest.dontMock('../App');


xdescribe('App', function() {

    var React, TestUtils,
        GreetingStore, App,
        appEl, heroText, dummyChangeHandler;

    beforeEach(function() {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;


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
            let headingNode = React.findDOMNode(heroText);
            expect(headingNode.textContent).toMatch('nuqneH');
        });

    });
});
