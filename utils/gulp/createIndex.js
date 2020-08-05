const gulp = require("gulp");
const { watch } = require('gulp');
const { series } = require('gulp');
const fs = require('fs')
// const { readdirSync } = require('fs')
const tap = require('gulp-tap');
const path = require('path');
const config = require('./config');
const data = require('../../src/data/data.json');

let arr = [];

function getList() {
    return gulp.src([
        config.path.src + "/slides/*",
        "!" + config.path.src + "/slides/_partials",
    ])
        .pipe(tap(function (file, t) {
            arr.push(path.basename(file.path));
        }))    
}

function createIndex(done) {
    let str = '<!DOCTYPE html><head><meta charset="utf-8"><title>'+data.project_title+'</title></head><body><ol>';
    for (let i = 0; i < arr.length; i++) {
        str += '<li><a href="' + arr[i] + '">' + arr[i] + '</a></li>';
    }
    str += '</ol></body></html>';
    fs.writeFileSync(config.path.dist + '/index.html', str);
    done();
}

module.exports = series(getList, createIndex)