const gulp = require("gulp");
const { watch } = require('gulp');
const { series } = require('gulp');

/* 
 * Tasks
 */
const templates = require('./templates');
const serve = require('./serve');
const createIndex = require('./createIndex');
const css = require('./css');
const js = require('./js');
const thumbnails = require('./thumbnails');
const browserSync = require('browser-sync').create();

const config = require('./config');
const data = require('../../src/data/data.json');

// Reconnect CSS tasks to browsersync for streaming
function connect(cb) {
    css.connect(browserSync);
    cb();
}

function delivery() {
   
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
    // Compile to delivery
);