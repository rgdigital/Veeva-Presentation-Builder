/*
 * Dependancies
 */
const { series } = require('gulp');

/* 
 * Config data
 */
const config = require('./utils/gulp/config');

/* 
 * Task dependancies
 */
const templates = require('./utils/gulp/templates');
const serve = require('./utils/gulp/serve');
const createIndex = require('./utils/gulp/createIndex');
const css = require('./utils/gulp/css');
const js = require('./utils/gulp/js');

/* 
 * JS tasks
 */
exports.slideJs = js.slideJs;
exports.libsJs = js.libsJs;
exports.sharedJs = js.sharedJs;
exports.js = js.default;

/* 
 * CSS tasks
 */
exports.slideCss = css.slideCss;
exports.libsCss = css.libsCss;
exports.sharedCss = css.sharedCss;
exports.css = css.default;

/* 
 * Watch + serve task
 */
exports.default = serve.default;