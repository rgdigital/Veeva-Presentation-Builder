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
const thumbnails = require('./utils/gulp/thumbnails');
const delivery = require('./utils/gulp/delivery');
const assets = require('./utils/gulp/assets');

/* 
 * Template tasks
 */
exports.createIndex = createIndex.default;
exports.templates = templates.default;

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
 * Generate thumbnails
 */
exports.thumbnails = thumbnails.default;

/* 
 * Copy assets
 */
exports.assets = assets.default;

/* 
 * Deliver files
 */
exports.delivery = delivery.default;
exports.clean = delivery.clean;
exports.zip = delivery.zip;

/* 
 * Watch + serve task
 */
exports.default = serve.default;