/* jshint camelcase: false */

module.exports = function(grunt) {

    var devServer = require('./build/webpack/dev-server');

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),

            clean: {
                dist: {
                    src: ['dist/*']
                }
            },

            copy: {
                html: {
                    files: [
                        {
                            cwd: 'src',
                            expand: true,
                            src: ['index.html'],
                            dest: 'dist/bundle/'
                        }
                    ]
                },

                jsbundle: {
                    files: [
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

            jscs: {
                source: {
                    src: ['src/{,*/}*.{js,jsx}', '!src/{,*/}__tests__/*.js']
                },

                tests: {
                    src: ['src/{,*/}__tests__/*.js']
                },

                scripts: {
                    src: ['Gruntfile.js']
                }
            },

            eslint: {
                source: {
                    src: ['src/{,*/}*.{js,jsx}', '!src/{,*/}__tests__/*.js']
                },

                tests: {
                    src: ['src/js/{,*/}__tests__/*.{js,jsx}'],
                    options: {
                        globals: ['jest', 'd3'],
                        envs: ['jasmine', 'amd', 'node', 'browser']
                    }
                },

                scripts: {
                    src: ['Gruntfile.js']
                }
            },

            jsonlint: {
                cfgfiles: {
                    src: [
                        '.jscsrc',
                        '.eslintrc',
                        'src/{,*/}__tests__/.eslintrc',
                        'build/**/*.json'
                    ]
                }
            },

            jest: {
                options: {
                    coverage: true,
                    config: 'build/jest/config.json',
                    testPathPattern: /.*-test\.jsx?/
                }
            },

            shell: {
                options: {
                    failOnError: true
                },
                build: {
                    command: 'npm run build'
                },

                release: {
                    command: 'npm run release'
                },

                test: {
                    command: 'npm test'
                }
            },

            watch: {
                html: {
                    files: ['src/*.html'],
                    tasks: ['copy:html']
                }
            }

        }
    );

    grunt.registerTask('lint', [
        'jsonlint',
        'jscs',
        'eslint'
    ]);

    grunt.registerTask('test', [
        'jsonlint',
        'jscs',
        'eslint',
        'jest'
    ]);

    grunt.registerTask('serve', 'Compile then start a connect web server',
        function() {
            grunt.task.run([
                'lint',
                'clean:dist',
                'copy:html',
                'watch:html'
            ]);

            devServer.start();
        }

    );

    grunt.registerTask('build', [
        'test',
        'clean:dist',
        'shell:build',
        'copy:html'
    ]);

    grunt.registerTask('release', [
        'test',
        'clean:dist',
        'shell:release',
        'copy',
        'htmlmin'
    ]);

};
