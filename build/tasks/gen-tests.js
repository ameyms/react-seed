var path = require('path'),
    fs = require('fs'),
    chalk = require('chalk');

module.exports = function(grunt) {


    var srcJsFileMatcher = /(.*)src\/js\/(?:([a-z]+)\/)?([a-zA-Z]+)\.(jsx?)$/,
        generateTests, isPathMatch;

    isPathMatch = function(fpath, opts) {

        var ignoreTest = opts.ignore;

        if (srcJsFileMatcher.test(fpath)) {
            if (ignoreTest) {
                switch (grunt.util.kindOf(ignoreTest)) {
                    case 'regexp':
                        return !ignoreTest.test(fpath);

                    case 'function':
                        return !ignoreTest(fpath);
                    default:
                        return true;
                }
            } else {
                return true;
            }
        }

        return false;
    };

    generateTests = function() {

        var opts = this.options(),
            srcDir = opts.srcDir,
            sampleTest = opts.sampleTest,
            testEslintrc = opts.testEslintrc,
            jsDir = path.join(process.cwd(), srcDir),
            eslintrcFile = path.join(process.cwd(), testEslintrc),
            dummyTestCode = grunt.file.read(path.join(process.cwd(), sampleTest)),
            created = 0;


        grunt.file.recurse(jsDir, function(fPath) {
            var tp, tdir, mdir, srcModule;
            if (isPathMatch(fPath, opts)) {

                tp = fPath.replace(srcJsFileMatcher, '$1src/js/$2/__tests__/$3-test.$4');
                mdir = fPath.replace(srcJsFileMatcher, '$2');
                tdir = fPath.replace(srcJsFileMatcher, '$1src/js/$2/__tests__');

                grunt.file.copy(eslintrcFile, tdir + '/.eslintrc');
                srcModule = fPath.replace(srcJsFileMatcher, '$3');

                if (!fs.existsSync(tp)) {

                    if (!created) {
                        grunt.log.writeln('\n' + chalk.bgBlue.bold(' INFO ') + '  ' +
                            'GenTest will create new tests\n');
                    }

                    grunt.log.writeln(chalk.gray.inverse.bold(' TEST ') + '  ' +
                        chalk.gray('GenTest created new test module for ') +
                        chalk.white.bold(mdir + '.' + srcModule));

                    grunt.file.write(tp, dummyTestCode.replace(/Dummy/g, srcModule),
                                    {encoding: 'utf8'});
                    created++;

                }}
        });

        if (!created) {
            grunt.log.writeln('\n' + chalk.bgBlue.bold(' INFO ') + '  ' +
                'Did not generate any new test modules');
        } else {
            grunt.log.writeln('\n\n' + chalk.bgGreen.bold(' DONE ') + '  ' +
                'Generated ' + chalk.bold(created + ' new test modules'));
        }};


    grunt.registerMultiTask('genTests', 'Generate placeholder test files', function() {
        generateTests.call(this);

    });

};
