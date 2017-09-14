var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var pug = require('pug');
var gulpPug = require('gulp-pug');
var reload = browserSync.reload;
var concat = require('gulp-concat');
// var through = require('through2');

gulp.task('pug', function buildHTML() {
  return gulp.src('app/*.pug')
    .pipe(gulpPug({
      pug: pug,
      pretty: true
    }))
    .pipe(gulp.dest('app'))
    .pipe(reload({stream: true}))
});


gulp.task('sass', function () {
  return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream: true}));
});

gulp.task('minifyCss', function () {
  return gulp.src('app/css/*.css')
    .pipe(cssnano({
      safe: true,
      autoprefixer: false,
      reduceIdents: false,
      mergeIdents: false,
      discardUnused: false,
      zindex: false
    }))
    .pipe(gulp.dest('app/css/'));
});

gulp.task('jsConcat', function() {
  return gulp.src('app/js/vendor/*.js')
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('app/js'));
});


gulp.task('templates', ['pug']);
gulp.task('styles', ['sass']);
gulp.task('scripts', ['jsConcat']);

gulp.task('templates-watch', ['templates'], reload);
gulp.task('styles-watch', ['styles'], reload);
gulp.task('scripts-watch', ['scripts'], reload);


gulp.task('default', function () {
  browserSync({server: 'app'});

  gulp.watch('app/scss/**/*.scss', ['styles-watch']);
  gulp.watch('app/**/*.pug', ['templates-watch']);
  gulp.watch('app/**/*.js', ['scripts-watch']);
});

// TODO: add PostCSS (autoprefixer etc.)

gulp.task('build', ['templates', 'styles', 'scripts']);

// TODO: implement prod mode
// TODO: imagemin
gulp.task('prod', ['templates', 'styles', 'scripts']);
