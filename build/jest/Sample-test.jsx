jest.dontMock('../Dummy');


describe('Dummy', function() {

    beforeEach(function() {
        /*eslint-disable no-undef*/
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        /*eslint-enable no-undef*/
    });

    it('dummy test', function() {
        expect(true).toBeTruthy();
    });
});
