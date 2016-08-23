var gulp       = require('gulp');
var gutil      = require('gulp-util');
var gulpCoffee = require('gulp-coffee');

gulp.task('coffee', function() {
  gulp.src('./src/*.coffee')
    .pipe(gulpCoffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./lib/'));
});

