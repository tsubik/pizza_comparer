var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var order = require('gulp-order');

var paths = {
  sass: ['./app/styles/**/*.scss'],
  js: ['./app/scripts/**/*.js'],
  html: ['./app/**/*.html'],
  lib: ['./app/lib/**/*']
};

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('scripts', function(){
  gulp.src(paths.js)
    .pipe(order([
      'utility/*.js',
      'vendor/*.js',
      'app.js',
      'factories/*.js',
      'directives/*.js',
      'controllers/*.js'
      ]))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('html', function(){
  gulp.src(paths.html)
    .pipe(gulp.dest('./www/'));
});


gulp.task('lib', function(){
  gulp.src(paths.lib)
    .pipe(gulp.dest('./www/lib'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.lib, ['lib']);
});

gulp.task('default', ['sass','scripts','html','lib']);
