var ReactTools = require('react-tools');

module.exports = {

    process: function(src, filename) {

        var dummyLessModule = 'module.exports = {dummy: true};';

        if (/\.jsx$/.test(filename)) {
            src = src.replace(/^.*require\(\s*'styles\/\w+\/\w+\.less'\s*\);/g, '');
            return ReactTools.transform(src);
        } else if (/\.less$/.test(filename)) {
            return dummyLessModule;
        } else {
            return src;
        }
    }
};
