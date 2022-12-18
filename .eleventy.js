const generatePermalinkDate = require("./src/_lib/generatePermalinkDate");
const minifyInlineScripts = require("./src/_lib/minifyInlineScripts");

module.exports = function (eleventyConfig) {
  // Pass items through to /dist
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/_copied/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/_copied/css/*.css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/_includes/js/*.js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/_includes/js/*.mjs": "js" });
  eleventyConfig.addPassthroughCopy({
    "src/_includes/js/helpers/*.mjs": "js/helpers",
  });
  eleventyConfig.addPassthroughCopy(".well-known/*.txt");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("_headers");

  eleventyConfig.addFilter("generatePermalinkDate", generatePermalinkDate);
  eleventyConfig.addNunjucksAsyncFilter(
    "minifyInlineScripts",
    minifyInlineScripts
  );

  return {
    dir: {
      input: "src",
      output: "dist",
    },

    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html", "11ty.js"],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",
  };
};
