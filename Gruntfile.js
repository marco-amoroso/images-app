module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    css_dir: 'css',
    css_build: 'build/<%= css_dir %>',

    js_dir: 'js',
    js_build: 'build/<%= js_dir %>',

    bower_components: 'bower_components',

    jshint: {
      all: ['Gruntfile.js', 'test/**/*.js', 'js/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    sass: {
      dist: {
        files: {
          '<%= css_build %>/all.min.css': '<%= css_dir %>/main.scss'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      prod: {
        files: {
          '<%= js_build %>/all.min.js': [
            '<%= bower_components %>/jquery/dist/jquery.min.js',
            '<%= bower_components %>/handlebars/handlebars.min.js',
            '<%= js_dir %>/globals.js',
            '<%= js_dir %>/simpleInfiniteScrolling.js',
            '<%= js_dir %>/script.js'
          ]
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: 'js/**/*.js',
        tasks: ['js']
      },
      css: {
        files: 'css/**/*.scss',
        tasks: ['css']
      }
    },
  });
  
  // Default task(s).
  grunt.registerTask('default', ['css', 'js']);
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('js', ['jshint', 'uglify']);
};