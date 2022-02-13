const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const cleanCSS = require("clean-css");

const generateCssHash = require('../_lib/generateCssHash');

module.exports = class {
  async data() {
    const cssDir = path.join(__dirname, '../_includes/css/');
    const rawFilepath = path.join(cssDir, 'main.css');
    const permalink = `css/main.${generateCssHash(cssDir)}.css`;
    const destFilePath = path.join(__dirname, `../../dist/${permalink}`);

    return {
      permalink,
      rawFilepath,
      destFilePath,
      rawCss: await fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawCss, rawFilepath, destFilePath }) {
    return await postcss([postcssImport, postcssNested])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css)
      .then((result) => {
        new cleanCSS({ returnPromise : true })
          .minify(result)
          .then((result) => {
            const { stats, warnings, errors, styles } = result;

            console.group();
            console.log('========================================');
            console.log('Clean CSS stats:');
            console.log(stats);
            console.groupEnd();

            console.group();
            console.log('========================================');
            console.log('Clean CSS warnings:');
            console.log(warnings);
            console.groupEnd();

            console.group();
            console.log('========================================');
            console.log('Clean CSS errors:');
            console.log(errors);
            console.groupEnd();

            fs.writeFileSync(destFilePath, styles, { encoding: "utf-8" });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
