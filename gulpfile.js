var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  inject = require('gulp-inject'),
  sass = require('gulp-sass'),
  sassLint = require('gulp-sass-lint'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  minify = require('gulp-minify'),
  cleanCSS = require('gulp-clean-css'),
  flatten = require('gulp-flatten'),
  fs = require('fs');

gulp.task('default', [
  'lint-client',
  'watch-js',
  'sass',
  'sass-watch',
  'sass-lint',
  'autoprefixer',
  'inject'
]);

gulp.task('lint-client', function() {
  return gulp.src([
      __dirname + '/client/**/*.js',
      '!' + __dirname + '/client/public/**',
      '!**/dist/**'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch-js', function() {
  return gulp.watch([
    __dirname + '/client/**/*.js',
    '!' + __dirname + '/client/dist/**'
  ], [
    'lint-client'
  ]);
});

gulp.task('inject', ['autoprefixer'], function() {
  var target = gulp.src(__dirname + '/client/index.html'),
    sources = gulp.src([
      __dirname + '/client/**/*.js',
      __dirname + '/client/**/*.css',
      '!**/dist/**'
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
      '!**/mixins.scss',
      '!**/dist/**'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.'));
});

gulp.task('sass-watch', function() {
  return gulp.watch([
    __dirname + '/**/*.scss'
  ], [
    'sass',
    'sass-lint',
    'autoprefixer'
  ]);
});

gulp.task('sass-lint', function() {
  return gulp.src([
      __dirname + '/**/*.scss',
      '!' + __dirname + '/node_modules/**',
      '!**/mixins.scss',
      '!**/dist/**'
    ])
    .pipe(sassLint())
    .pipe(sassLint.format());
});

gulp.task('autoprefixer', ['sass'], function() {
  return gulp.src([
      __dirname + '/**/*.css',
      '!**/dist/**'
    ])
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('.'));
});


// Production Tasks

gulp.task('production', [
  'css-production',
  'js-production',
  'inject-production'
]);

gulp.task('css-production', function() {
  return gulp.src([
      __dirname + '/**/*.scss',
      '!' + __dirname + '/node_modules/**',
      '!**/variables.scss',
      '!**/mixins.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(flatten())
    .pipe(postcss([autoprefixer()]))
    .pipe(concat('all.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(__dirname + '/client/dist'));
});

gulp.task('js-production', function() {
  return gulp.src([
      __dirname + '/client/**/*.js',
      '!' + __dirname + '/node_modules/**'
    ])
    .pipe(concat('all.js'))
    .pipe(minify())
    .pipe(gulp.dest(__dirname + '/client/dist'));
});

gulp.task('inject-production', ['js-production', 'css-production'], function() {
  fs.unlink(__dirname + '/client/dist/all.js');
  var target = gulp.src(__dirname + '/client/index.html'),
    sources = gulp.src([
      __dirname + '/dist/all-min.js',
      __dirname + '/dist/all.css'
    ], {
      read: false
    });
  return target.pipe(inject(sources))
    .pipe(gulp.dest(__dirname + '/client'));
});
