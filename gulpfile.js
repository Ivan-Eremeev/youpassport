const preprocessor        = 'scss', // Препроцессор для стилей (scss, less)
      gulpVersion         = '3'; // Версия галпа (3, 4)

const gulp                = require('gulp'),
      sass                = require('gulp-sass'),
      less                = require('gulp-less'),
      concatJS            = require('gulp-concat'),
      pug                 = require('gulp-pug'),
      autoprefixer        = require('gulp-autoprefixer'),
      cleanCSS            = require('gulp-clean-css'),
      rigger              = require('gulp-rigger'),
      browserSync         = require('browser-sync'),
      uglify              = require('gulp-uglify'),
      rename              = require("gulp-rename");



gulp.task('jade', function buildHTML() {
  return gulp.src('jade/*.jade')
    .pipe(pug({
      pretty: '\t'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}));
});

if (preprocessor == 'scss') {
  gulp.task('style', function () {
    return gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers:['last 5 version'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
  });
}

else if (preprocessor == 'less') {
  gulp.task('style', function () {
    return gulp.src('less/style.less')
    .pipe(less())
    .pipe(autoprefixer({
        browsers:['last 5 version'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
  });
}

gulp.task('css', function () {
  return gulp.src('dist/css/style.css')
  .pipe(cleanCSS({
    level : 2
  }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
    return gulp.src('js-app/*.js')
    .pipe(rigger())
    // .pipe(uglify({
    //   compress: false,
    //   mangle: false,
    //   output: {
        
    //   }
    // }))
    .pipe(rename({
        basename: 'script',
        extname: '.js'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: true
    });
});

if (gulpVersion == '3') {
  gulp.task('watch', function () {
    gulp.watch('jade/**/*.jade', ['jade']);
    gulp.watch('js-app/**/*.js', ['js']);
    gulp.watch('scss/**/*.scss', ['style']);
    gulp.watch('dist/css/style.css', ['css']);
  });

  gulp.task('default', ['browser-sync', 'jade', 'js', 'style', 'css', 'watch']);
}
else if (gulpVersion == '4') {
  gulp.task('watch', function () {
    gulp.watch('jade/**/*.jade', gulp.parallel('jade'));
    gulp.watch('js-app/**/*.js', gulp.parallel('js'));
    gulp.watch('scss/**/*.scss', gulp.parallel('style'));
    gulp.watch('dist/css/style.css', gulp.parallel('css'));
  });

  gulp.task('default', gulp.parallel('browser-sync', 'jade', 'js', 'style', 'css', 'watch'));
}