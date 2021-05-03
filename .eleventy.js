module.exports = function (eleventyConfig) {
  // Pass images through to /dist
  eleventyConfig.addPassthroughCopy('src/images');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },

    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ['md', 'njk', 'html', '11ty.js'],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',
  };
};
