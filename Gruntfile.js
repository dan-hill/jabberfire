module.exports = function(grunt) {

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
                  { src: ['app/**', 'run.py', 'requirements.txt'], 'dest': '/' }
              ]
          }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s).
  grunt.registerTask('default', ['compress']);

};