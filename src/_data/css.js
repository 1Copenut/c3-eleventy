// https://florian.ec/blog/cache-busting-eleventy-postcss/

const path = require('path');
const generateCssHash = require('../_lib/generateCssHash');

const cssDir = path.join(__dirname, '../_includes/css/');
const hash = generateCssHash(cssDir);

module.exports = {
  styles: `/css/main.${hash}.css`,
}
