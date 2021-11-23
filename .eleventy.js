module.exports = function (eleventyConfig) {
  // Pass items through to /dist
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy(".well-known/humans.txt");

  // eleventyConfig.addCollection('services', function (collection) {
  //   const coll = collection.getFilteredByTag('services');

  //   for (let i = 0; i < coll.length; i++) {
  //     const prevPost = coll[i - 1];
  //     const nextPost = coll[i + 1];

  //     coll[i].data['prevPost'] = prevPost;
  //     coll[i].data['nextPost'] = nextPost;
  //   }

  //   return coll;
  // });

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
