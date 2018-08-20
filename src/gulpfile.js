var gulp = require('gulp');
// var $    = require('gulp-load-plugins')();
var sass = require('gulp-sass');

// var sassPaths = [
//   'bower_components/foundation-sites/scss',
//   'bower_components/motion-ui/src'
// ];

gulp.task('sass', function() {
  return gulp.src('assets/styles/styles.scss')
      .pipe(sass({
            // includePaths: sassPaths
          })
          .on('error', sass.logError))
      // .pipe($.autoprefixer({
      //   browsers: ['last 2 versions', 'ie >= 9']
      // }))
      .pipe(gulp.dest(''));
});

gulp.task('default', ['sass'], function() {
  gulp.watch(['assets/scss/**/*.scss'], ['sass']);
});