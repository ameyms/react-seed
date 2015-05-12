var fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    execSync = require('exec-sync'),
    md5 = require('MD5'),
    deltaCollector = require('../scripts/delta-collector'),
    getDeltas;

getDeltas = function(grunt, opts) {
    var cacheDir = opts.cacheDir,
        useCache = opts.useCache,
        deltas, gitStatusHash,
        cachedGitStatusHashPath, cachedDeltaPath,
        cachedGitStatusHash, cachedDelta;

    cachedGitStatusHashPath = path.join(process.cwd(), cacheDir + '/gitstatus.md5');
    cachedDeltaPath = path.join(process.cwd(), cacheDir + '/deltas.json');

    if (useCache) {
        gitStatusHash = md5(execSync('git status --porcelain'));

        if (fs.existsSync(cachedGitStatusHashPath) && fs.existsSync(cachedDeltaPath)) {

            cachedGitStatusHash = grunt.file.read(cachedGitStatusHashPath);
            cachedDelta = grunt.file.readJSON(cachedDeltaPath);


            if (cachedGitStatusHash && cachedDelta) {


                if (gitStatusHash === cachedGitStatusHash) {

                    grunt.log.writeln(chalk.bgBlue.bold(' INFO ') + ' ' +
                        'Jester has determined the change set via cache lookup');

                    return cachedDelta;
                }}
        }
    }

    deltas = deltaCollector();

    if (useCache) {
        grunt.file.write(cachedGitStatusHashPath, gitStatusHash);
        grunt.file.write(cachedDeltaPath, JSON.stringify(deltas));
    }
    return deltas;
};


module.exports = function(grunt) {

    grunt.registerMultiTask('jester', 'Run tests with Jest.', function() {

        var opts = this.options(),
            isQuick = opts.smoke,
            startTime = Date.now(),
            foundTests = true,
            totalRuns = 'all',
            done = this.async(),
            deltas,
            ignorePatterns, midTime, changeSet, config, fastTestConfigPath;

        grunt.log.write('\n');

        if (isQuick) {

            process.env.SMOKE_TEST = 'yes';
            config = grunt.file.readJSON(path.join(process.cwd(), opts.config));

            deltas = getDeltas(grunt, opts);
            fastTestConfigPath = opts.cacheDir + '/fast-tests.json';

            changeSet = deltas.changed;
            ignorePatterns = deltas.unchangedPathMatchers;

            if (!changeSet || !changeSet.length) {
                foundTests = false;

            } else {
                // XXX Hack: Jest breaks if there is only one test file
                if (changeSet.length === 1) {
                    totalRuns = 2;
                    grunt.log.writeln('\n' + chalk.bgBlue.bold(' INFO ') + '  ' +
                        chalk.gray('Jest breaks if there is only one test file. ') +
                        chalk.white.bold('Executing 2 tests...\n'));
                    config.testPathIgnorePatterns = ignorePatterns.slice(0, ignorePatterns.length -1);
                } else {

                    totalRuns = changeSet.length;
                    config.testPathIgnorePatterns = ignorePatterns;
                }
                config.cacheDirectory = config.cacheDirectory + '/smoke';
                grunt.file.write(fastTestConfigPath, JSON.stringify(config));
                opts.config = fastTestConfigPath;

            }}

        if (foundTests) {

            midTime = Date.now();
            require('jest-cli').runCLI(opts, process.cwd(), function() {

                done();
                var endTime = Date.now();

                grunt.log.writeln(chalk.bgCyan.bold(' PERF ') + ' ' +
                    'Jester took ' +
                    chalk.bgWhite.black.bold(((endTime - startTime) / 1000) + 'secs') +
                    ' to run ' + totalRuns + ' tests');

                if (isQuick) {
                    grunt.log.writeln(chalk.bgCyan.bold(' PERF ') + ' ' +
                        'Jester took ' +
                        chalk.bgWhite.black.bold(((midTime - startTime) / 1000) + 'secs') +
                        ' for collecting tests ');
                }

                grunt.log.writeln(chalk.bgCyan.bold(' PERF ') + ' ' +
                    'Jester took ' +
                    chalk.bgWhite.black.bold(((endTime - midTime) / 1000) + 'secs') +
                    ' for code instrumentation and test runs');
            });
        } else {

            done();
            grunt.log.writeln('\n' + chalk.bgYellow.bold.black(' NOTE ') + ' ' +
                chalk.yellow('Jester did not find any changed tests or ' +
                'modified source files with tests'));
        }
    });

};
