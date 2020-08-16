const gulp = require("gulp");
const { watch } = require('gulp');
const { series } = require('gulp');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const tap = require('gulp-tap');
const zip = require('gulp-zip');
const foreach = require("gulp-foreach");
const path = require('path');

/* 
 * Tasks
 */
const templates = require('./templates');
const serve = require('./serve');
const createIndex = require('./createIndex');
const css = require('./css');
const js = require('./js');
const thumbnails = require('./thumbnails');
const assets = require('./assets');

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
        // '!./dist/shared',
    ])
        .pipe(foreach(function (stream, file) {
            var fileName = file.path.substr(file.path.lastIndexOf("/") + 1).split('\\').pop();
            let destFilename = fileName !== "shared" ? fileName : data.project_title.replace(/ /g, "_").toLowerCase() + "_shared";
            gulp.src("./dist/" + fileName + "/**/*")
                .pipe(zip(destFilename + ".zip"))
                .pipe(gulp.dest("./delivery"));
            return stream;
        }));
    cb();
}

/* 
* Tasks
*/
module.exports.clean = cleanDelivery;
module.exports.zip = zipDelivery;
module.exports.default = series(
    // Compile to dist
    templates.default,
    js.default,
    connect,
    css.default,
    assets.default,
    thumbnails.default,
    // Clean delivery directory
    cleanDelivery,
    // Zips to delivery
    zipDelivery
);
