var path = require('path'),
    fs = require('fs'),
    chalk = require('chalk');


module.exports = function(grunt) {


    var listSrcPaths = function() {
        var jsDir = path.join(process.cwd(), 'src/js'),
            srcJsFileMatcher = /(.*)src\/js\/([a-z]+)\/([a-zA-Z]+)\.(jsx?)$/,
            created = 0;

        grunt.file.recurse(jsDir, function(fPath) {
            var eslintrcFile = path.join(process.cwd(), 'build/jest/.eslintrc'),
                tp, tdir, mdir, srcModule, dummyCode;
            if (srcJsFileMatcher.test(fPath)) {

                tp = fPath.replace(srcJsFileMatcher, '$1src/js/$2/__tests__/$3-test.$4');
                mdir = fPath.replace(srcJsFileMatcher, '$2');
                tdir = fPath.replace(srcJsFileMatcher, '$1src/js/$2/__tests__');

                grunt.file.copy(eslintrcFile, tdir + '/.eslintrc');
                srcModule = fPath.replace(srcJsFileMatcher, '$3');
                dummyCode = grunt.file.read(path.join(process.cwd(), 'build/jest/Sample-test.jsx'));


                if (!fs.existsSync(tp)) {

                    if (!created) {
                        grunt.log.writeln('\n' + chalk.bgBlue.bold(' INFO ') + '  ' +
                            'GenTest will create new tests\n');
                    }

                    grunt.log.writeln(chalk.gray.inverse.bold(' TEST ') + '  ' +
                        chalk.gray('GenTest created new test module for ') +
                        chalk.white.bold(mdir + '.' + srcModule));

                    grunt.file.write(tp, dummyCode.replace(/Dummy/g, srcModule), {encoding: 'utf8'});
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

        // opts = this.options();
        listSrcPaths();

    });

};
