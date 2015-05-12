jest.dontMock('../Dummy');


describe('Dummy', function() {

    beforeEach(function() {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
    });

    it('dummy test', function() {
        expect(true).toBeTruthy();
    });
});
