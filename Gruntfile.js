/* eslint-disable babel/object-shorthand */

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('./build/tasks');
    require('time-grunt')(grunt);

    var devServer = require('./build/webpack/dev-server'),
        prodBuildConfig = require('./build/webpack/dev.config'),
        jestConfig = grunt.file.readJSON('./build/jest/config.json'),
        jestCacheDir = jestConfig.cacheDirectory.replace(/<rootDir>\//, '');

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: {
                src: [
                    'dist/*',
                    '.gen',
                    'coverage'
                ]
            }
        },

        copy: {

            build: {
                files: [
                    {
                        cwd: 'src',
                        expand: true,
                        src: ['index.html'],
                        dest: 'dist/bundle/'
                    }
                ]
            },

            release: {
                files: [
                    {
                        cwd: 'src',
                        expand: true,
                        src: ['index.html'],
                        dest: 'dist/bundle/'
                    },
                    {
                        cwd: 'dist/bundle/js',
                        expand: true,
                        src: ['*.js'],
                        dest: 'dist/bundle/js'
                    }
                ],
                options: {
                    process: function(content, srcpath) {

                        if (/\.js$/.test(srcpath)) {
                            return content.replace(
                            /(\w+)\.createClass\(\s*\{\s*displayName:\s*["'][A-Za-z]+["'],/g,
                            '$1.createClass({');
                        }
                    }
                }
            },

            server: {
                files: [
                    {
                        cwd: 'src',
                        expand: true,
                        src: ['index.html'],
                        dest: 'dist/bundle/'
                    },
                    {
                        cwd: '.',
                        expand: true,
                        src: ['mock/responses/**/*.json'],
                        dest: 'dist/bundle'
                    }
                ]
            }
        },

        htmlmin: {
            release: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/bundle/index.html': 'dist/bundle/index.html'
                }
            }
        },

        genTests: {
            all: {
                options: {
                    srcDir: 'src/js',
                    sampleTest: 'build/jest/Sample-test.jsx',
                    testEslintrc: 'build/jest/.eslintrc',
                    ignore: /.*src\/js\/((?:constants))\/[a-zA-Z]+\.jsx?/
                }
            }
        },

        flow: {
            options: {}
        },

        eslint: {
            source: {
                src: ['src/js/{,*/}*.{js,jsx}', '!src/js/{,*/}__tests__/*.js']
            },

            tests: {
                src: ['src/js/{,*/}__tests__/*.{js,jsx}', 'mock/{,*/}*.js'],
                options: {
                    globals: ['jest'],
                    envs: ['jasmine', 'amd', 'node', 'browser']
                }
            },

            scripts: {
                src: ['Gruntfile.js', 'build/{,*/}*.js'],
                options: {
                    configFile: 'build/.eslintrc'
                }
            }
        },

        jsonlint: {
            cfgfiles: {
                src: [
                    '.eslintrc',
                    'src/js/{,*/}__tests__/.eslintrc',
                    'build/**/*.json'
                ]
            }
        },

        jester: {
            all: {
                options: {
                    coverage: true,
                    config: 'build/jest/config.json',
                    testPathPattern: /.*-test\.jsx?/,
                    cacheDir: jestCacheDir
                }
            },

            smoke: {
                options: {
                    coverage: true,
                    config: 'build/jest/config.json',
                    testPathPattern: /.*-test\.jsx?/,
                    cacheDir: jestCacheDir,
                    smoke: true
                    // useCache: false
                }
            }
        },


        webpack: {
            build: prodBuildConfig
        },


        shell: {
            options: {
                failOnError: true
            },
            createGenDir: {
                command: 'mkdir -p ' + jestCacheDir
            }

        },

        watch: {
            html: {
                files: ['src/*.html'],
                tasks: ['copy:html']
            }
        }

    });

    grunt.registerTask('lint', [
        'jsonlint',
        'eslint'
    ]);

    grunt.registerTask('smoke', [
        'lint',
        'shell:createGenDir',
        'jester:smoke'
    ]);

    grunt.registerTask('test', [
        'lint',
        'shell:createGenDir',
        'jester:all'
    ]);

    grunt.registerTask('serve', 'Compile then start a connect web server',
        function() {
            grunt.task.run([
                'lint',
                'clean:dist',
                'copy:server',
                'watch:html'
            ]);

            devServer.start();
        }

    );

    grunt.registerTask('build', [
        // 'genTests',
        'clean:dist',
        'test',
        'webpack:build',
        'copy:build'
    ]);

    grunt.registerTask('release', [
        'clean:dist',
        'test',
        'webpack:build',
        'copy:release',
        'htmlmin'
    ]);

};
