// https://florian.ec/blog/cache-busting-eleventy-postcss/

const fs = require('fs');
const glob = require('fast-glob');
const md5 = require('md5');

function generateCssHash(dir) {
  const filesArr = glob.sync([`${dir}/**/*.css`]);
  const content = filesArr.map(file => fs.readFileSync(file)).join('');
  return md5(content).slice(0, 12);
}

module.exports = generateCssHash;