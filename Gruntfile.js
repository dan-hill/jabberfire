module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        secret: grunt.file.readJSON('secret.json'),
        compress: {
            main: {
                options: {
                    archive: 'deploy.tar.gz',
                    mode: 'tgz'
                },
                files: [
                    {src: ['app/**', 'run.py', 'requirements.txt', 'supervisord.conf'], 'dest': '/'}
                ]
            }
        },
        sftp: {
            main: {
                files: {
                    './': 'deploy.tar.gz'
                },
                options: {
                    path: '/home/dan/temp',
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>'
                }
            }
        },
        sshexec: {
            main: {
                command: 'cd /home/dan/www && source /home/dan/.virtualenv/capstone/bin/activate && supervisorctl stop server'
                ,
                options: {
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>'
                }
            },
            teardown_database: {
                command: [
                    'mysqladmin -u root -pspring2015capstone -f drop ccmh'
                ],
                options: {
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>'
                }
            },
            extract: {
                command: 'tar xvfz /home/dan/temp/deploy.tar.gz -C /home/dan/www/server',
                options: {
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>'
                }
            },
            requirements: {
                command: [
                    'cd /home/dan/www/server && source /home/dan/.virtualenv/capstone/bin/activate && pip install -r requirements.txt'
                ],
                options: {
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>'
                }
            },
            create_database: {
                command: [
                    'mysqladmin -u root -pspring2015capstone create ccmh'
                ],
                options: {
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>'
                }
            },
            start: {
                command: [
                    'cd /home/dan/www && source /home/dan/.virtualenv/capstone/bin/activate && supervisorctl start server'
                ],
                options: {
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>'
                }
            },
            build_database: {
                command: [
                    'curl http://aw3so.me/api/insert-test-data'
                ],
                options: {
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>'
                }
            },
            clean: {
                command: 'rm -rf /home/dan/temp/deploy.tar.gz',
                options: {
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>'
                }
            }
        },
        clean: ['deploy.tar.gz'],
        exec: {
            deploy: {
                cmd: function () {
                     /* I like to know when things finish :) */
                    return 'echo \'Deployment complete.\'';
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-ssh');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    // Default task(s).
    grunt.registerTask('deploy', ['compress', 'sftp', 'sshexec', 'clean', 'exec:deploy']);

};