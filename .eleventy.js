require("dotenv").config();
const generatePermalinkDate = require("./src/_lib/generatePermalinkDate");

module.exports = function (eleventyConfig) {
  // Pass items through to /dist
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/_copied/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/_copied/css/*.css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/_includes/js/*.js": "js" });
  eleventyConfig.addPassthroughCopy(".well-known/*.txt");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("_routes.json");

  eleventyConfig.addFilter("generatePermalinkDate", generatePermalinkDate);

  eleventyConfig.addGlobalData("env", process.env);

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
