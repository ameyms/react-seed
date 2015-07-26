var path = require('path'),
    fs = require('fs'),
    execSync = require('exec-sync'),
    Immutable = require('immutable'),
    traverse = require('../scripts/traverse'),
    dependencyGraph = {},
    inverseDependencyGraph = {},

    filterTests, listChanged, getUnchangedPathMatchers, normalizeStrToRegexp,
    listChanged, listAllTests, listUnchanged, initDependencyGraph;



initDependencyGraph = function() {

    var srcJsFileMatcher = /(.*)src\/js\/([a-z]+\/)?([a-zA-Z]+)\.(jsx?)$/,
        srcJsDir = path.join(process.cwd(), 'src/js');

    traverse.recurse(srcJsDir, function(fpath, rootdir, subdir, filename) {

        var fname = filename,
            requireMatcher, shortName,
            d, j, fileContents, mx;

        if (subdir) {
            fname = path.join(subdir, filename);
        }

        shortName = fname.replace(/\.jsx?/g, '');

        inverseDependencyGraph[shortName] = [];

        if (srcJsFileMatcher.test(fpath)) {
            fileContents = traverse.readFile(fpath);

            requireMatcher = /import\s+.+\s+from\s+'(\.{1,2})\/([a-z]+\/)?([a-zA-Z]+)'/g;

            while ((mx = requireMatcher.exec(fileContents)) !== null) {

                d = '';

                if (mx[1] === '.' && subdir) {
                    // Same dir
                    d = subdir + '/';
                }

                for (j = 2; j < mx.length; j++) {
                    d = d + (mx[j] || '');
                }

                if (!dependencyGraph[d]) {
                    dependencyGraph[d] = [];
                }
                inverseDependencyGraph[shortName].push(d);
                dependencyGraph[d].push(shortName);
            }
        }
    });
};


normalizeStrToRegexp = function(str) {
    return str.replace(/\./g, '\\.').
            replace(/\//g, '\\/').
            replace(/\-/, '\\-');
};


listChanged = function(includeChangedSrc) {
    var modifiedFiles = [],
        mFilesOutput;

    mFilesOutput = execSync('git status --porcelain').trim();

    modifiedFiles = filterTests(mFilesOutput, includeChangedSrc);

    return modifiedFiles;
};


listAllTests = function() {
    var jsDir = path.join(process.cwd(), 'src/js'),
        allTests = [];

    traverse.recurse(jsDir, function(fpath) {
        if (/.*\-test\.jsx?/.test(fpath)) {
            fpath = fpath.replace(process.cwd() + '/', '');
            allTests.push(fpath);
        }
    });

    return allTests;
};


listUnchanged = function(changeSet) {
    var changed = Immutable.Set(changeSet),
        all = Immutable.Set(listAllTests()),
        assumeChanged, unchanged;

    unchanged = all.subtract(changed);
    assumeChanged = unchanged.intersect(changed);
    unchanged = unchanged.subtract(assumeChanged);

    return unchanged.toArray();
};

filterTests = function(filesStr, includeChangedSrc) {

    var result = [],
        srcJsFileMatcher = /(.*)src\/js\/([a-z]+\/)?([a-zA-Z]+)\.(jsx?)$/,
        testJsFileMatcher = /.*src\/js\/(?:[a-z]+\/)?__tests__\/[a-zA-Z]+\-test\.jsx?$/,
        tmpFiles, i, o, f, len, tp, testName, testDir, fileDeps, fd;

    tmpFiles = filesStr.trim().split('\n').filter(function(line) {
        return (/^(?:\s*)?(M|(?:\?\?)|A)/.test(line));

    }).map(function(line) {
        return line.replace(/^(?:\s*)?(M|(?:\?\?)|A)\s+(\S+)/, '$2');
    });

    len = tmpFiles.length;



    for (i = 0; i < len; i++) {
        f = tmpFiles[i];
        if (testJsFileMatcher.test(f)) {
            result.push(f);
        } else if (srcJsFileMatcher.test(f)) {

            if (includeChangedSrc) {
                result.push(f);
            }
            tp = f.replace(srcJsFileMatcher, '$1src/js/$2__tests__/$3-test.$4');

            testName = f.replace(srcJsFileMatcher, '$3');
            testDir = f.replace(srcJsFileMatcher, '$2');

            if (fs.existsSync(path.join(process.cwd(), tp))) {
                result.push(tp);
            }

            fileDeps = dependencyGraph[testDir + testName] || [];

            for (o = 0; o < fileDeps.length; o++) {
                fd = 'src/js/' + fileDeps[o];

                if (fs.existsSync(path.join(process.cwd(), fd + '.jsx'))) {
                    fd = fd + '.jsx';
                } else {
                    fd = fd + '.js';
                }

                if (includeChangedSrc) {
                    result.push(fd);
                }

                fd = fd.replace(srcJsFileMatcher, '$1src/js/$2__tests__/$3-test.$4');


                if (fs.existsSync(path.join(process.cwd(), fd))) {
                    result.push(fd);
                }
            }
        }
    }
    return result;
};

getUnchangedPathMatchers = function(includeChangedSrc) {

    var matchedPaths = [],
        tmp, changeSet;

    changeSet = listChanged(includeChangedSrc);
    tmp = listUnchanged(changeSet);

    matchedPaths = tmp.map(function(f) {
        return '<rootDir>/' + f;
    });


    return {
        unchangedPathMatchers: matchedPaths,
        changed: changeSet,
        dependencyGraph: dependencyGraph,
        inverseDependencyGraph: inverseDependencyGraph
    };
};


normalizeStrToRegexp.bind(null);

module.exports = function(includeChangedSrc) {

    initDependencyGraph();
    return getUnchangedPathMatchers(includeChangedSrc);

};
