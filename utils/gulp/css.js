'use strict';

const gulp = require("gulp");
const { watch } = require('gulp');
const { series } = require('gulp');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css');
const gulpif = require('gulp-if');

const config = require('./config');
const data = require('../../src/data/data.json');

// Fixes missing bs error
let browserSync = false;

function slideCss(done) {
    return gulp
        .src([
            config.path.src + "/slides/**/*.scss",
        ], { base: "." })
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(
            rename(function (path) {
                path.dirname = path.dirname.split('\\').pop();
                path.basename = "slide.min";
                path.extname = ".css";
            })
        )
        .pipe(gulp.dest(config.path.dist))
        .pipe(browserSync.stream())
        done()
}

function libsCss(done) {
    return gulp
        .src([
            config.path.src + "/shared/libs/css/**/*.css",
        ])
        .pipe(cleanCSS())
        .pipe(rename("libs.min.css"))
        .pipe(gulp.dest(config.path.dist + "/shared"))
        .pipe(browserSync.stream())
    done()
}

function sharedCss(done) {
    return gulp
        .src([
            config.path.src + "/shared/scss/**/*.scss",
        ])
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename("app.min.css"))
        .pipe(gulp.dest(config.path.dist + "/shared"))
        .pipe(browserSync.stream())
    done()
}

function connect(bs, done) {
    browserSync = bs || false;
}

module.exports.connect = connect;
module.exports.slideCss = slideCss;
module.exports.libsCss = libsCss;
module.exports.sharedCss = sharedCss;
module.exports.default = series(slideCss, libsCss, sharedCss);