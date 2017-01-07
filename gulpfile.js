var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat');

gulp.task('default', function() {
  console.log('Gulp!');
});

gulp.task('lint-client', function () {
  return gulp.src(__dirname + '/client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
