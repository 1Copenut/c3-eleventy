const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

const fileName = 'main.css';

module.exports = class {
  async data() {
    const rawFilepath = path.join(__dirname, `../_includes/css/${fileName}`);
    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([require('postcss-import'), require('postcss-nested')])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css);
  }
};
