const fs = require('fs');
const path = require('path');
const critical = require('critical');

function criticalCSS(destIndexPath) {
  critical.generate({
    base: 'dist/',
    css: ['dist/css/main.css'],
    src: 'index.html',
    width: 375,
    height: 667,
  })
    .then((result) => {
      const criticalPath = result.html.replace('.empty-style-tag', result.css);
      fs.writeFileSync(destIndexPath, criticalPath, { encoding: "utf-8" });
    })
    .catch((error) => {
      throw new Error(error);
    });
}

module.exports = class {
  async data() {
    const destIndexPath = path.join(__dirname, '../../dist/index.html');

    return {
      destIndexPath,
    };
  }

  async render({ destIndexPath }) {
    return await criticalCSS(destIndexPath);
  }
};
