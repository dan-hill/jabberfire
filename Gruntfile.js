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
          {src: ['dist/**'], 'dest': '/'}
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
      extract: {
        command: [
          'tar xvfz /home/dan/temp/deploy.tar.gz -C /home/dan/temp',
          'rm -r /home/dan/www/client',
          'mv /home/dan/temp/dist /home/dan/www/client'
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
      },
      build_production: {
        cmd: function () {
          /* I like to know when things finish :) */
          return 'ember build --environment="production"';
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
  grunt.registerTask('deploy', ['exec:build_production', 'compress', 'sftp', 'sshexec', 'clean', 'exec:deploy']);

};
