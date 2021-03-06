# Veeva Presentation Builder

## Prerequisites
- [Node + NPM](https://nodejs.org/en/download/)
- [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
    - `npm install --global gulp-cli`
    - `npm install --save-dev gulp`

## Installation
1. Clone the repo with  `git clone git@github.com:rgdigital/Veeva-Presentation-Builder.git`.
2. Run `npm install` to install all the project dependancies.

## Quick start
1. Create a slide with `npm run newslide` and enter your slide name in the prompt. Your new slide will be created with assets in `src/slides/<your slide name>`.
2. In the slide folder you can edit -
	- `<slide name>.hbs` - View file (will be output as normal HTML)
	- `slide.scss` - Sass file (output as normal CSS)
	- `slide.js` - ES6 compatible js file (compiled to standards-compliant JS)
	- `images` - add your image assets here
3. Once you have finished, run the delivery task `gulp delivery`. This will compile all the assets into a Veeva-compatible format and zip up the assets ready for upload into Veeva.

## Project structure

    .
    ├── delivery                    # Zip files for delivery
    ├── dist                        # Output directory for preview
    ├── src                         # Working directory for development
    │   ├── data                    
    │   │   └── data.json           # Data you add here passed to all slide view files
    │   ├── shared                  # For files shared between all files
    │   │   ├── js
    │   │   ├── libs                # JS / CSS libs
    │   │   └── scss                # Generic scss
    │   └── slides                  # The view folder
    │       ├── _partials           # Partials for use across multiple slides
    │       └── slide_01            # Default slide view folder
    │           ├── images
    │           ├── slide.js
    │           ├── slide.scss
    │           └── slide_01.hbs
    ├── utils                       # Utilities used by the build system
    ├── gulpfile.js
    └── ...

- **/dist** - This contains the compiled project ready to host on a live server.
- **/src** - This is the working directory. All the code + assets go in here.

## Shared resources

A shared folder can contain generic resources, like JS, CSS, images, and fonts for use by each slide.

The shared folder zip will be packaged with a filename from the project title in src/data.json. To add a shared resource in Veeva you need to add separately from the binder. Follow these steps -

1. Click the **Library** tab.
2. Click **Create** and select **Upload**.
3. Upload the zip, selecting **Multichannel Slide** from the document type.
4. Click **Edit fields**
5. In the right-hand sidebar you need to specify:
    - **Multichannel Properties** -> **Shared resource = Yes**
    - **CLM Properties** -> **CLM Content = Yes**
6. Now press **Save**.
7. Sync in the CRM (Salesforce)
8. Sync in the Veeva app (iPad or simulator)
9. To check the shared zip hsa been downloaded to the Veeva app, go to **More** -> **Options** -> **Media** and you should see it at the top of the list.

To add this shared resource to a slide, go to that slide in the binder and select the **+** button from the *Related Shared Resource* in the sidebar. Then find your shared resource folder and add it.

## Generator tasks

#### `npm run newslide` - Create a new slide
This will prompt for a slide title and create a new slide folder and its files in the `src/slides` folder. It will also add a link to the slide to the index page (first page you see when you serve the project locally).

## Gulp tasks

#### `gulp` - default task
This will open a browser window with a preview of the project. All the HTML, CSS, and JS files (apart from libraries) are being watched, so any changes you make will trigger a browser refresh to reflect the changes.

#### `gulp assets` - Copy over assets to dist
This task will copy the asset files to the `/dist` folder.

#### `gulp delivery` - Package up delivery files
This task will package the slide`.zip` files into the `/delivery` folder ready to be imported into Veeva.

## Resources
- [Veeva CRM docs](https://developer.veevacrm.com/api/)
- [Veeva Presentation build guide](https://www.slideshare.net/bluegrassdigital/veeva-irep-overview-dev-guide)
- [Veeva CRM generator repo](https://github.com/devopsgroup-io/veeva)
- [Veeva CRM generator example project](https://github.com/devopsgroup-io/veeva/tree/master/examples/clm)

## Contact
[rick@rgdigital.io](mailto:rick@rgdigital.io)