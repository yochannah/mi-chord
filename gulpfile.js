var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
// var babel = require('babelify');
var browserSync = require('browser-sync').create()
var coffee = require('gulp-coffee');

var minify = require('gulp-minify');



var less = require('gulp-less');
var path = require('path');


function compile(watch) {

  // var bundler = watchify(browserify('./src/index.js', {debug: true, standalone: 'MIModel'}).transform(babel));
  var bundler = watchify(browserify('./js/index.js', {debug: true, standalone: 'Circle'}));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('circle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/dist'))
      .pipe(browserSync.stream({once: true}));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build-watch', ['build'], function (done) {
    browserSync.reload();
    done();
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });

    gulp.watch("public/*.html").on('change', browserSync.reload);
});

gulp.task('coffee', function() {
  gulp.src('./src/**/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./js/'));
});

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch-coffee', function() {
  gulp.watch("src/**/*.coffee", ['coffee', 'build']);
  gulp.watch("src/**/*.hbs", ['templates', 'build']);
  gulp.watch("less/**/*.less", ['less']);

});

gulp.task('compress', function() {
  gulp.src('public/dist/circle.js')
    .pipe(minify({
        ext:{
            // src:'-debug.js',
            min:'.min.js'
        },
        noSource: true,
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '.js']
    }))
    .pipe(gulp.dest('dist'))
});


gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['coffee', 'watch-coffee', 'watch', 'browser-sync']);

// gulp.task('default', ['watch-coffee', 'watch', 'browser-sync']);
