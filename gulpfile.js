'use strict';

var gulp = require('gulp');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var glob = require('glob');
var babelify = require('babelify');
var reactify = require('reactify');
var evts = require('event-stream');
var $ = require('gulp-load-plugins')();

gulp.task('html', function() {
  return gulp.src('src/html/**/*.html')
    .pipe(gulp.dest('build/release/html/'));
});

gulp.task('babel', function() {
  return gulp.src('src/js/**/*.{js,jsx}')
    .pipe($.babel({
      presets: ['es2015', 'react']
    }))
    .on('error', handleError)
    .pipe(gulp.dest('build/tmp/js'));
});

gulp.task('scripts', ['babel'], function(done) {
  glob('build/tmp/js/**/*.js', function(err, files) {
    if (err) {
      done(err);
    }
    var tasks = files.map(function(filename) {
      return browserify({ 
          entries: [filename],
          debug: true
        })
        .bundle()
        .pipe(source(filename))
        .pipe(gulp.dest('build/release/js'));
    })
    evts.merge(tasks).on('end', done);
  });
});

gulp.task('build', ['html', 'scripts'], function() {

});

gulp.task('watch', function() {
  gulp.watch('src/html/**/*.html', ['html']);
  gulp.watch('src/js/**/*.{js,jsx}', ['scripts']);
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
