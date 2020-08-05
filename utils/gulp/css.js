'use strict';

const gulp = require("gulp");
const { watch } = require('gulp');
const { series } = require('gulp');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css');
const gulpif = require('gulp-if');
const tap = require('gulp-tap');

const config = require('./config');
const data = require('../../src/data/data.json');

// Fixes missing bs error
// let browserSync = {};
// browserSync.stream = function(){};
let browserSync = false;

function slideCss(done) {
    // console.log(browserSync)
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
        // .pipe(gulpif(browserSync, browserSync.stream()))
        // .pipe(browserSync && browserSync.stream())
        // .pipe(tap(function (file, t) {
        //     console.log(typeof browserSync)
        //     browserSync && browserSync.stream()
        // }))
        done()
}

function libsCss(done) {
    return gulp
        .src([
            config.path.src + "/shared/libs/css/**/*.css",
        ])
        .pipe(cleanCSS())
        .pipe(rename("libs.min.css"))
        // .pipe(gulpif(browserSync, browserSync.stream()))
        // .pipe(browserSync && browserSync.stream())
        .pipe(tap(function (file, t) {
            browserSync && browserSync.stream()
        }))
        .pipe(gulp.dest(config.path.dist + "/shared"));
    done()
}

function sharedCss(done) {
    return gulp
        .src([
            config.path.src + "/shared/scss/**/*.scss",
        ])
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename("app.min.css"))
        // .pipe(browserSync && browserSync.stream())
        .pipe(tap(function (file, t) {
            browserSync && browserSync.stream()
        }))
        .pipe(gulp.dest(config.path.dist + "/shared"));
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