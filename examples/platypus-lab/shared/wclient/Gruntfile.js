module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/app/**/*.js'],
            options: {
                globals: {
                    angular: true
                }
            }
        },
        ngtemplates: {
            build: {
                cwd: 'src/',
                src: [
                    'templates/**.html',
                    'app/components/**/*.html',
                    ],
                dest: 'tmp/templates.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    },
                    module: 'PlatypusLab'
                }
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: false
                },
                src: 'build/app.js',
                dest: 'build/app.js'
            }
        },
        clean: {
            build: {
                src: ['tmp']
            },
            pre: {
                src: 'build'
            }
        },
        copy: {
            build: {
                files: [{
                    cwd: 'src/',
                    expand: true,
                    src: ['img/**', 'sw.js', 'manifest.json'],
                    dest: 'build/'
                }]
            }
        },
        autoprefixer: {
            build: {
                expand: true,
                cwd: 'build',
                src: ['style.css'],
                dest: 'build'
            }
        },
        processhtml: {
            build: {
                src: 'src/index.html',
                dest: 'build/index.html'
            }
        },
        cssmin: {
            options: {
                relativeTo: './'
            },
            build: {
                src: 'build/style.css',
                dest: 'build/style.css'
            }
        },
        watch: {
            dist: {
                files: ['src/app/**/*', 'src/stylesheets/**/*.css', 'src/templates/**/*', 'src/index.html']
            },
            options: {
                livereload: true
            }
        },
        autoconcat: {
            build: {
                src: 'src/index.html',
                dest: 'build/',
                more: {
                    js: ['<%= ngtemplates.build.dest %>']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['jshint', 'clean:pre', 'ngtemplates', 'autoconcat', 'cssmin', 'uglify', 'clean:build', 'copy', 'autoprefixer', 'processhtml']);
};