require("dotenv").config();
const generatePermalinkDate = require("./src/_lib/generatePermalinkDate");
const generateMinifiedPath = require("./src/_lib/generateMinifiedPath");
const minifyInlineScripts = require("./src/_lib/minifyInlineScripts");

module.exports = function (eleventyConfig) {
  // Pass items through to /dist
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/_copied/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/_copied/css/*.css": "css" });
  eleventyConfig.addPassthroughCopy(".well-known/*.txt");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("_routes.json");
  eleventyConfig.addPassthroughCopy({
    "google2604c2a182173f8d.html": "google2604c2a182173f8d.html",
  });

  // Don't minify JS if we're not in production
  if (process.env.ENVIRONMENT !== "production") {
    eleventyConfig.addPassthroughCopy({ "src/_includes/js/*.js": "js" });
  }

  // Synchronous filters
  eleventyConfig.addFilter("generatePermalinkDate", generatePermalinkDate);
  eleventyConfig.addFilter("generateMinifiedPath", generateMinifiedPath);

  // Asynchronous filters
  eleventyConfig.addNunjucksAsyncFilter(
    "minifyInlineScripts",
    minifyInlineScripts
  );

  // Short codes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Environment variable
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
