var gulp       = require('gulp');
var gutil      = require('gulp-util');
var gulpCoffee = require('gulp-coffee');
var del        = require('del');


gulp.task('compile', function() {
  gulp.src('./src/*.coffee')
    .pipe(gulpCoffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('clean', function() {
  return del.sync([
    'lib/*'
  ]);
});

gulp.task('default', ['clean', 'compile']);
