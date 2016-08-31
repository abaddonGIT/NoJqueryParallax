/**
 * Created by abaddon on 18.12.2014.
 */
"use strict";
var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    size = require('gulp-filesize'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    fs = require('fs'),
    gzip = require('gulp-gzip'),
    source = require('vinyl-source-stream');

gulp.task("browserify", function () {
    return browserify("./src/index.js")
        .bundle()
        .pipe(source("index.compile.js"))
        .pipe(gulp.dest("./src/"));
});

gulp.task('min', ['browserify'], function () {
    return gulp.src("./src/index.compile.js")
        .pipe(header(fs.readFileSync('./header.js', 'utf8')))
        .pipe(uglify({preserveComments: "some"}))
        .pipe(rename({basename: "min", prefix: "NoJqueryParallax."}))
        .pipe(gulp.dest("./dist"))
        .pipe(size());
});

gulp.task('gzip', ['min'], function () {
    return gulp.src('./dist/NoJqueryParallax.min.js')
        .pipe(gzip())
        .pipe(gulp.dest('./dist'))
        .pipe(size());
});

gulp.task('watch', function () {
    gulp.watch('./src/index.js', ['browserify']);
});