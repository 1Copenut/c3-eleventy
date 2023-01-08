const { minify } = require("terser");

async function minifyInlineScripts(code, callback) {
  try {
    if (process.env.ENVIRONMENT === "production") {
      const minified = await minify(code);
      callback(null, minified.code);
    } else {
      callback(null, code);
    }
  } catch (err) {
    console.error("Terser error: ", err);
    // Fail gracefully
    callback(null, code);
  }
}

module.exports = minifyInlineScripts;
