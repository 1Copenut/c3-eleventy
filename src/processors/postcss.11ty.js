const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const cleanCSS = require('clean-css');
const critical = require('critical');


module.exports = class {
  async data() {
    const fileName = 'main.css';
    const destIndex = path.join(__dirname, '../../dist/index.html');
    const destFilePath = path.join(__dirname, `../../dist/css/${fileName}`);
    const rawFilepath = path.join(__dirname, `../_includes/css/${fileName}`);

    return {
      rawFilepath,
      destIndex,
      destFilePath,
      rawCss: await fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawCss, rawFilepath, destFilePath, destIndex }) {
    return await postcss([postcssImport, postcssNested])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css)
      .then((result) => {
        new cleanCSS({ returnPromise : true })
          .minify(result)
          .then((result) => {
            console.log('Clean CSS stats:\n==============================');
            console.log(result.stats);
            console.log('Clean CSS errors:\n==============================');
            console.log(result.errors);
            fs.writeFileSync(destFilePath, result.styles, { encoding: "utf-8" });
          });
      })
      .then(() => {
        critical.generate({
          base: 'dist/',
          css: ['dist/css/main.css'],
          src: 'index.html',
          width: 375,
          height: 667,
        }).then((result) => {
            const criticalPath = result.html.replace('.empty-style-tag', result.css);
            fs.writeFileSync(destIndex, criticalPath, { encoding: "utf-8" });
        });
      })
      .catch((error) => {
        throw new Error('Failed in CSS pipeline', { cause: error });
      });
  }
};
