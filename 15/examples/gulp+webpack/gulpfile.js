const gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config.js');

gulp.task('compile__js', function () {
    return gulp.src('./app/index.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./'));
});

gulp.task('watch__js', ['compile__js'], function () {
    gulp.watch([
        './app/**/*.js'
    ], ['compile__js']);
});