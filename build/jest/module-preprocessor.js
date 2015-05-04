var ReactTools = require('react-tools'),
    jsPath = /.*\/react\-seed\/src\/js\/[a-z]+(?:\/__tests__)?\/[a-zA-Z]+(?:\-test)?\.jsx$/,
    lessPath = /.*\/react\-seed\/src\/less\/[a-z]+\/[a-zA-Z]+\.less$/;

module.exports = {

    process: function(src, filename) {

        var dummyLessModule = 'module.exports = {dummy: true};';

        if (jsPath.test(filename)) {

            src = src.replace(/^.*require\(\s*'styles\/\w+\/\w+\.less'\s*\);/g, '');
            return ReactTools.transform(src);
        } else if (lessPath.test(filename)) {
            return dummyLessModule;
        } else {
            return src;
        }
    }
};
