var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var order = require('gulp-order');

var paths = {
  sass: ['./app/styles/**/*.scss'],
  js: ['./app/scripts/**/*.js'],
  html: ['./app/**/*.html']
};

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
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
      'factories/*.js',
      'directives/*.js',
      'controllers/*.js',
      'app.js'
      ]))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('html', function(){
  gulp.src(paths.html)
    .pipe(gulp.dest('./www/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['sass','scripts','html']);
