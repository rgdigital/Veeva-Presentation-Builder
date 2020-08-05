const gulp = require("gulp");
const { watch } = require('gulp');
const { series } = require('gulp');
const handlebars = require("gulp-compile-handlebars");
const rename = require("gulp-rename");
const config = require('./config');
const data = require('../../src/data/data.json');

module.exports = function(cb) {
    const modals = {
        // pi: {
        // 	name: "pi",
        // 	classNames: "modal modal--pi",
        // 	title: "Prescribing Information"
        // }
    };
    const options = {
        ignorePartials: true,
        batch: [config.path.src + "/slides/_partials"],
        helpers: {
            inc: function (index) {
                index++;
                index++;
                return index;
            }
        }
    };
    return gulp
        .src([
            config.path.src + "/slides/**/*.hbs",
            "!" + config.path.src + "/slides/_**/*.hbs",
            "!" + config.path.src + "/slides/_**.hbs",
        ])
        .pipe(handlebars({ data: data, modals: modals }, options))
        .pipe(
            rename(function (path) {
                // path.dirname += `/${path.basename}/`;
                path.dirname += "";
                path.basename = "index";
                path.extname = ".html";
            })
        )
        .pipe(gulp.dest(config.path.dist));
}