var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  inject = require('gulp-inject'),
  sass = require('gulp-sass'),
  sassLint = require('gulp-sass-lint'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer');

gulp.task('default', [
  'lint-client',
  'inject',
  'watch-js',
  'sass',
  'sass-watch',
  'sass-lint',
  'autoprefixer'
]);

gulp.task('lint-client', function() {
  return gulp.src([
      __dirname + '/client/**/*.js',
      '!' + __dirname + '/client/public/**'
    ])
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
    'lint-client'
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

gulp.task('sass', function() {
  return gulp.src([
      __dirname + '/**/*.scss',
      '!' + __dirname + '/node_modules/**',
      '!**/variables.scss',
      '!**/mixins.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.'));
});

gulp.task('sass-watch', function() {
  return gulp.watch([
    __dirname + '/**/*.scss'
  ], [
    'sass',
    'sass-lint'
  ]);
});

gulp.task('sass-lint', function() {
  return gulp.src([
      __dirname + '/**/*.scss',
      '!' + __dirname + '/node_modules/**',
      '!**/mixins.scss'
    ])
    .pipe(sassLint())
    .pipe(sassLint.format());
});

gulp.task('autoprefixer', function() {
  return gulp.src('**/*.css')
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('.'));
});
