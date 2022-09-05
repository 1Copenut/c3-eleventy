const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const csso = require('postcss-csso');

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
    return await postcss([
      postcssImport,
      postcssNested,
      csso({ restructure: false })
    ])
      .process(rawCss, { from: rawFilepath })
      .then((result) => {
        fs.writeFileSync(destFilePath, result.css, { encoding: "utf-8" });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
