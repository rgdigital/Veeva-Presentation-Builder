'use strict';

const gulp = require("gulp");
const { watch } = require('gulp');
const { series } = require('gulp');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css');

const config = require('./config');
const data = require('../../src/data/data.json');

let browserSync;

function slideCss() {
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
        .pipe(browserSync && browserSync.stream())
        .pipe(gulp.dest(config.path.dist));
}

function libsCss() {
    return gulp
        .src([
            config.path.src + "/shared/libs/css/**/*.css",
        ])
        .pipe(cleanCSS())
        .pipe(rename("libs.min.css"))
        .pipe(browserSync && browserSync.stream())
        .pipe(gulp.dest(config.path.dist + "/shared"));
}

function sharedCss() {
    return gulp
        .src([
            config.path.src + "/shared/scss/**/*.scss",
        ])
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename("app.min.css"))
        .pipe(browserSync && browserSync.stream())
        .pipe(gulp.dest(config.path.dist + "/shared"));
}

// module.exports.slideCss = slideCss;
// module.exports.libsCss = libsCss;
// module.exports.sharedCss = sharedCss;
// module.exports.default = series(slideCss, libsCss, sharedCss);

module.exports = function(bs) {
    browserSync = bs || false;
    let modules = {};
    modules.slideCss = slideCss;
    modules.libsCss = libsCss;
    modules.sharedCss = sharedCss;
    modules.default = series(slideCss, libsCss, sharedCss);
    return modules;
};