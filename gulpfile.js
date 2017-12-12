var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var bust = require('gulp-buster');

gulp.task('sass', function() {
    return sass('resources/assets/sass/**/*.sass', {style: 'compressed'})
      .pipe(concat('main.css'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('public/css/'))
      .pipe(bust())
      .pipe(gulp.dest('public/'));
});

gulp.task('build-js', function() {
    return gulp.src('resources/assets/js/*.js')    
      .pipe(concat('main.js'))
      .pipe(rename({
        suffix: '.min'        
      }))
      .pipe(uglify())
      .pipe(gulp.dest('public/js'))
      .pipe(bust())
      .pipe(gulp.dest('public/'));
});

gulp.task('images', function() {
  return gulp.src('resources/assets/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/images'));
});

gulp.task('watch', function() {
  gulp.watch('resources/assets/js/**/*.js', ['build-js']);
  gulp.watch('resources/assets/sass/**/*.sass', ['sass']);
  gulp.watch('resources/assets/images/**/*', ['images']);
});

gulp.task('default', ['build-js','sass','images', 'watch']);