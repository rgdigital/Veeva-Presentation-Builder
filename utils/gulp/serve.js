const gulp = require("gulp");
const { watch } = require('gulp');
const { series } = require('gulp');
const browserSync = require('browser-sync').create();

/* 
 * Tasks
 */
const templates = require('./templates');
const createIndex = require('./createIndex');
const css = require('./css');
const js = require('./js');
const assets = require('./assets');

const config = require('./config');
const data = require('../../src/data/data.json');

// File types
var type = {};
type.img = '.{jpeg,jpg,png,gif,svg,cur,ico}';
type.font = '.{eot,ttf,otf,woff,woff2,svg}';
type.video = '.{mp4,ogv,webm}';
type.audio = '.{wav,mp3}';

function reload(cb) {
    browserSync.reload();
    cb();
}

// Reconnect CSS tasks to browsersync for streaming
function connect(cb) {
    css.connect(browserSync);
    cb();
}

function serve() {
    // initialize browsersync
    browserSync.init({
        server: {
            baseDir: [
                config.path.dist,
                config.path.dist + "/shared/",
            ]
        },

        // rewriteRules: [
        //     {
        //         match: new RegExp("shared"),
        //         fn: function () {
        //             return "sharedddd"
        //         }
        //     }
        // ],

        // proxy: "http://localhost/RGDigital/mccann/11354403_generic_ambrisentan-action_plan_janssen/site/dist",
        // serveStatic: [
        //     config.path.dist,
        //     config.path.dist + "/shared/",
        // ]
    });
    // Watch handelbar files + compile to HTML
    watch(config.path.src + "/slides/**/*.hbs", series(templates.default, reload));
    // Watch JS app files + compile
    watch(config.path.src + "/slides/**/*.js", series(js.default, reload));
    watch(config.path.src + "/shared/js/**/*.js", series(js.default, reload));
    // Watch JS lib files + compile
    watch(config.path.src + "/shared/libs/js/**/*.js", series(js.libsJs, reload));
    // Watch CSS files (changes streamed from task)
    watch(config.path.src + "/**/*.scss", series(connect, css.default));
    // Watch CSS lib files + compile
    watch(config.path.src + "/shared/libs/css/**/*.scss", series(connect, css.libsCss));
    // Watch image asset changes (and copy)
    watch(config.path.src + "/**/*" + type.img, series(connect, assets.default));
}

module.exports.default = series(createIndex.default, serve);