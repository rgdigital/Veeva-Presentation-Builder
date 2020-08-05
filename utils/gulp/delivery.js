const gulp = require("gulp");
const { watch } = require('gulp');
const { series } = require('gulp');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const tap = require('gulp-tap');
const zip = require('gulp-zip');
const foreach = require("gulp-foreach");

/* 
 * Tasks
 */
const templates = require('./templates');
const serve = require('./serve');
const createIndex = require('./createIndex');
const css = require('./css');
const js = require('./js');
const thumbnails = require('./thumbnails');
const path = require('path');

const config = require('./config');
const data = require('../../src/data/data.json');

// Reconnect CSS tasks to browsersync for streaming
function connect(cb) {
    css.connect(browserSync);
    cb();
}

function cleanDelivery(cb) {
    gulp.src('./delivery/*', { read: false })
        .pipe(clean());
    cb();
}

function zipDelivery(cb) {

    gulp.src([
        './dist/*',
        '!./dist/index.html',
        '!./dist/shared',
    ])
        .pipe(foreach(function (stream, file) {
            var fileName = file.path.substr(file.path.lastIndexOf("/") + 1).split('\\').pop();;
            gulp.src("./dist/" + fileName + "/**/*")
                .pipe(zip(fileName + ".zip"))
                .pipe(gulp.dest("./delivery"));

            return stream;
        }));
    cb();
}

/* 
 * Compile everything
 */
module.exports.default = series(
    // Compile to dist
    templates.default,
    js.default,
    connect,
    css.default,
    // css.slideCss,
    // css.libsCss,
    // css.sharedCss,
    thumbnails.default,
    // Clean delivery directory
    clean,
    // Compile to delivery
);

module.exports.clean = cleanDelivery;
module.exports.zip = zipDelivery;