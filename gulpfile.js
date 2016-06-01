/**
 * Created by abaddon on 18.12.2014.
 */
"use strict";
var gulp = require('gulp');
var w3c = require('./index-compiled.js');

gulp.task('validate', function () {
    gulp.src('./*.html')
        .pipe(w3c())
        .pipe(gulp.dest('./'));
});