/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'qunit']
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: "src",
                    src: [
                        "**/*",
                        "!css/**/*",
                        "!js/**/*"
                    ],
                    dest: "build"
                }]
            },
            apiKey: {
                files: [{
                    expand: true,
                    src: [
                        "api_key.json"
                    ],
                    dest: "build/data"
                }]
            }
        },
        clean: {
            build: {
                src: ['build']
            }
        },
        shell: {
            delete: {
                command: "rm -rf C:/Users/Terz/apache-tomcat-9.0.0.M1/webapps/livesugarless.com"
            },
            copy: {
                command: "cp build/. C:/Users/Terz/apache-tomcat-9.0.0.M1/webapps/livesugarless.com -R"
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "build/css/main.css": "src/css/main.scss"
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ["es2015"]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: "src/js",
                    src: ["**/*.js"],
                    dest: "build/js",
                    ext: ".js"
                }]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-shell');

    // Default task.
    grunt.registerTask('default', ['jshint', 'qunit']);
    
    grunt.registerTask('copyToTomcat', ['shell:delete', 'shell:copy']);
    grunt.registerTask('deploy', ['clean:build', 'copy', 'copy:apiKey', 'sass', 'babel', 'copyToTomcat']);

};
