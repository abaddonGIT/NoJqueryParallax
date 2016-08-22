/**
 * Created by abaddon on 18.12.2014.
 */
"use strict";
var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

gulp.task("browserify", function () {
    return browserify("./index.js")
        .bundle()
        .pipe(source("index.compile.js"))
        .pipe(gulp.dest("./"));
});

gulp.task('watch', function () {
    gulp.watch('./index.js', ['browserify']);
});