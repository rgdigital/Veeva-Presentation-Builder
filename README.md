# Veeva Presentation Builder

## Prerequisites
- [Node + NPM](https://nodejs.org/en/download/)
- [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
    - `npm install --global gulp-cli`
    - `npm install --save-dev gulp`

## Installation
1. Clone the repo with  `git clone git@github.com:rgdigital/Veeva-Presentation-Builder.git`.
2. Run `npm install` to install all the project dependancies.

## TODO
<!-- - Compile handlebar templates into dist -->
- Zip up individual folders in dist
- Generate thumbnails for each slide (using puppeteer)

## Project structure
- **/dist** - This contains the compiled project ready to host on a live server.
- **/src** - This is the working directory. All the code + assets go in here.

## Generator tasks

#### `npm run newslide` - Create a new slide
This will prompt for a slide title and create a new slide folder and its files in the `src/slides` folder. It will also add a link to the slide to the index page (first page you see when you serve the project locally).

## Gulp tasks

#### `gulp` - default task
This will open a browser window with a preview of the project. All the HTML, CSS, and JS files (apart from libraries) are being watched, so any changes you make will trigger a browser refresh to reflect the changes.

<!--

#### `gulp assets` - Asset copy task
This will copy over asset files - images, fonts, icons + JSON. You will need to run this when you copy new assets into the **/src** folder as these changes aren't being watched.

#### `gulp jslibs` - Compile JS libraries
This will concat and minify all the JS in the `src/public/js/libs` folder.

#### `gulp csslibs` - Compile CSS libraries
This will concat and minify all the CSS in the `src/public/css` folder.

## Adding JS to pages

To add JS to a page you need to -
- Add the page ID to the body of the page 
- Create a js file for the page in `src/public/js/pages/<pageID>.js` and add a contructor to `_Pres.Pages.<PageID>`.

This will be called automatically when the user is on that page.

## Adding HTML views
Just add the HTML page in src (in a folder if you like) and it will be copied to `/dist` and preserve the same folder structure.

## Adding CSS / SCSS
Custom CSS is written in `src/public/scss`. The entry point SCSS file is `app.scss`. You can change the structure however you like as long as you include any extra .scss files in app.scss.

## Resources
- [Veeva CRM docs](https://developer.veevacrm.com/api/)
- [Veeva Presentation build guide](https://www.slideshare.net/bluegrassdigital/veeva-irep-overview-dev-guide)
- [Veeva CRM generator repo](https://github.com/devopsgroup-io/veeva)
- [Veeva CRM generator example project](https://github.com/devopsgroup-io/veeva/tree/master/examples/clm)

## Contact
[ricky.grimaldi@mccann.com](mailto:ricky.grimaldi@mccann.com)
Or
[rick@rgdigital.io](mailto:rick@rgdigital.io) -->