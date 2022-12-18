const { minify } = require("terser");

async function minifyScripts(code, callback) {
  try {
    if (
      process.env.ENVIRONMENT === "staging" ||
      process.env.ENVIRONMENT === "production"
    ) {
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

module.exports = minifyScripts;
