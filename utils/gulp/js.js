'use strict';

const gulp = require("gulp");
const { watch } = require('gulp');
const { series } = require('gulp');
const rename = require("gulp-rename");
const terser = require('gulp-terser');
const tap = require('gulp-tap');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

const config = require('./config');
const data = require('../../src/data/data.json');

function slideJs() {
    return gulp
        .src([
            config.path.src + "/slides/**/*.js",
        ], { base: "." })
        .pipe(terser())
        // .pipe(concat("slide.js"))
        .pipe(rename(function (path) {
                path.dirname = path.dirname.split('\\').pop();
                path.basename = "slide.min";
                path.extname = ".js";
        }))
        .pipe(gulp.dest(config.path.dist));
}

function libsJs() {
    return gulp
        .src([
            config.path.src + "/shared/libs/js/**/*.js",
        ])
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(concat("libs.min.js"))
        .pipe(sourcemaps.write())
        .pipe(rename("libs.min.js"))
        .pipe(gulp.dest(config.path.dist + "/shared"));
}

function sharedJs() {
    return gulp
        .src([
            config.path.src + "/shared/js/**/*.js",
            config.path.src + "/shared/js/app.js",
            "!" +config.path.src + "/shared/libs/js/**/*.js",
        ])
        .pipe(terser())
        .pipe(concat("app.min.js"))
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest(config.path.dist + "/shared"));
}

module.exports.slideJs = slideJs;
module.exports.libsJs = libsJs;
module.exports.sharedJs = sharedJs;
module.exports.default = series(slideJs, libsJs, sharedJs);