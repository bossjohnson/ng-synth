var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  inject = require('gulp-inject');

gulp.task('default', [
  'lint-client',
  'inject',
  'watch-js'
]);

gulp.task('lint-client', function() {
  return gulp.src(__dirname + '/client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('concat', function() {
  return gulp.src([
      __dirname + '/client/**/*.js',
      '!' + __dirname + '/client/dist/**'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest(__dirname + '/client/dist/'));
});

gulp.task('watch-js', function() {
  return gulp.watch([
    __dirname + '/client/**/*.js',
    '!' + __dirname + '/client/dist/**'
  ], [
    'lint-client',
  ]);
});

gulp.task('inject', function() {
  var target = gulp.src(__dirname + '/client/index.html'),
    sources = gulp.src([
      __dirname + '/client/**/*.js',
      __dirname + '/client/**/*.css'
    ], {
      read: false
    });
  return target.pipe(inject(sources, {
      ignorePath: '/client'
    }))
    .pipe(gulp.dest(__dirname + '/client'));
});
