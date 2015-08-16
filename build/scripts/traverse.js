var fs = require('fs'),
    path = require('path'),
    iconv = require('iconv-lite'),
    isWin32 = process.platform === 'win32',
    defaultEncoding = 'utf8',
    preserveBOM = false,
    recurse, unixifyPath, read;

// Normalize \\ paths to / paths.
unixifyPath = function(filepath) {
    if (isWin32) {
        return filepath.replace(/\\/g, '/');
    } else {
        return filepath;
    }
};

recurse = function recurse(rootdir, callback, subdir) {
    var abspath = subdir ? path.join(rootdir, subdir) : rootdir;
    fs.readdirSync(abspath).forEach(function(filename) {
        var filepath = path.join(abspath, filename);
        if (fs.statSync(filepath).isDirectory()) {
            recurse(rootdir, callback, unixifyPath(path.join(subdir || '', filename || '')));
        } else {
            callback(unixifyPath(filepath), rootdir, subdir, filename);
        }
    });
};

// Read a file, return its contents.
read = function read(filepath, options) {
    if (!options) {
        options = {};
    }

    var contents;

    try {
        contents = fs.readFileSync(String(filepath));
        if (options.encoding !== null) {
            contents = iconv.decode(contents, options.encoding || defaultEncoding);
            // Strip any BOM that might exist.
            if (!preserveBOM && contents.charCodeAt(0) === 0xFEFF) {
                contents = contents.substring(1);
            }
        }
        return contents;
    } catch (e) {

        throw e;
    }
};

module.exports = {
    recurse: recurse,
    readFile: read
};
