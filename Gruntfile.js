module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var devServer = require('./build/webpack/dev-server'),
        devBuildConfig = require('./build/webpack/dev.config'),
        prodBuildConfig = require('./build/webpack/dev.config'),
        jestConfig = grunt.file.readJSON('./build/jest/config.json'),
        jestCacheDir = jestConfig.cacheDirectory.replace(/<rootDir>\//, '');

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

            eslint: {
                source: {
                    src: ['src/js/{,*/}*.{js,jsx}', '!src/{,*/}__tests__/*.js']
                },

                tests: {
                    src: ['src/js/{,*/}__tests__/*.{js,jsx}'],
                    options: {
                        globals: ['jest'],
                        envs: ['jasmine', 'amd', 'node', 'browser']
                    }
                },

                scripts: {
                    src: ['Gruntfile.js', 'build/{,*/}*.js']
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


            webpack: {
                dev: devBuildConfig,
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

        }
    );

    grunt.registerTask('lint', [
        'jsonlint',
        'eslint'
    ]);

    grunt.registerTask('test', [
        'lint',
        'shell:createGenDir',
        'jest'
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
        'test',
        'clean:dist',
        'webpack:build',
        'copy:build'
    ]);

    grunt.registerTask('release', [
        'test',
        'clean:dist',
        'webpack:build',
        'copy:release',
        'htmlmin'
    ]);

};
