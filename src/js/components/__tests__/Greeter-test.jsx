jest.dontMock('../Greeter');

describe('Greeter', function() {

    var React, Greeter, TestUtils,
        greeterEl, textBoxEl, spanEl;

    beforeEach(function() {

        React = require('react/addons');
        Greeter = require('../Greeter');
        TestUtils = React.addons.TestUtils;

        greeterEl = TestUtils.renderIntoDocument(
            <Greeter/>
        );

        textBoxEl = TestUtils.findRenderedDOMComponentWithClass(greeterEl, 'greeter-text');
        spanEl = TestUtils.findRenderedDOMComponentWithClass(greeterEl, 'greeter-lbl');
    } );

    it('initially says `Hello`', function() {
        expect(spanEl.getDOMNode().textContent).toEqual('Hello');
    });

    it('changes greeting when its changed in textbox', function() {
        TestUtils.Simulate.change(textBoxEl, {target: {value: 'Namaste'}});
        expect(spanEl.getDOMNode().textContent).toEqual('Namaste');
    } );
} );
