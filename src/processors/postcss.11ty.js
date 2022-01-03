const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const cleanCSS = require("clean-css");


module.exports = class {
  async data() {
    const fileName = 'main.css';
    const destFilePath = path.join(__dirname, `../../dist/css/${fileName}`);
    const rawFilepath = path.join(__dirname, `../_includes/css/${fileName}`);

    return {
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
            console.log({result});
            fs.writeFileSync(destFilePath, result.styles, { encoding: "utf-8" });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
