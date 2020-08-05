'use strict';

const gulp = require("gulp");
const { watch } = require('gulp');
const { series } = require('gulp');
const tap = require('gulp-tap');
const path = require('path');
const puppeteer = require('puppeteer');
const jimp = require('jimp');
const zip = require('gulp-zip');
const browserSync = require('browser-sync').create();

const config = require('./config');
const data = require('../../src/data/data.json');

let port = 3010;

function startServer(done) {
    // Create local server
    browserSync
        .init({
            server: {
                baseDir: config.path.dist,
            },
            port: port,
            notify: false,
            open: false
        });
    setTimeout(() => {
        done();
    }, 2000);
}

function createThumbnails(done) {
    gulp
        .src([
            config.path.src + "/slides/*",
            "!" + config.path.src + "/slides/_partials",
        ])
        .pipe(tap(function (file, t) {
            let folder = path.basename(file.path);
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                await page.setViewport({
                    width: 1024,
                    height: 768,
                    deviceScaleFactor: 1
                });

                await page.goto('http://localhost:' + port + '/' + folder, { waitUntill: "networkidle2" });
                await page.waitFor(4300);
                await page.screenshot({ path: 'dist/' + folder+'/thumbnail.png' });
                await browser.close();
                browserSync.cleanup();

                jimp.read('dist/' + folder + '/thumbnail.png')
                    .then(lenna => {
                        return lenna
                            .resize(200, 143)
                            .quality(60)
                            .write('dist/' + folder + '/thumbnail.png');
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })();
        }))
    done();
}

module.exports.default = series(startServer, createThumbnails);