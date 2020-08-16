const prompts = require('prompts');
const fs = require('fs');
const createIndex = require('../gulp/createIndex');

const questions = [
    {
        type: 'text',
        name: 'title',
        message: 'What is the title of the new slide?'
    },
    // {
    //     type: 'number',
    //     name: 'age',
    //     message: 'How old are you?'
    // },
    // {
    //     type: 'text',
    //     name: 'about',
    //     message: 'Tell something about yourself',
    //     initial: 'Why should I?'
    // }
];

function createNewSlide(title) {
    let encodedTitle = title.replace(/\s+/g, '_').toLowerCase();
    let path = './src/slides/' + encodedTitle + '/';
    let filename = encodedTitle + '.hbs';
    let str = `<!DOCTYPE html>
<html lang="en">
{{> head title="${title}" }}
<body class="preload">
    <h1>Lorem ipsum dolor sit amet</h1>
    <p>Add your content for ${title} here.</p>
    {{> _modals }}
    
{{> footer }}
</body>
</html>`;
    str += '</ol></body></html>';

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    // Create .hbs template
    fs.writeFileSync(path + '/index.hbs', str);
    // Create SCSS file
    fs.writeFileSync(path + '/slide.scss', '');
    // Create JS file
    fs.writeFileSync(path + '/slide.js', '');
    return path + filename;
}

(async () => {
    const response = await prompts(questions);
    // console.log(createIndex())
    let path = createNewSlide(response.title);
    createIndex.default()
    console.log('Created new slide (with JS + CSS) at: ' + path)
    // => response => { username, age, about }
})();