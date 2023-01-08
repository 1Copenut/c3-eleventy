const fs = require("fs");

function generateMinifiedPath(sourcePath) {
  if (process.env.ENVIRONMENT === "production") {
    // Terser --output flag fails to write if the directory doesn't exist
    const dir = "dist/js";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Find JavaScript files and splice .min into the filepath
    const regex = /\.m?js/;
    const fileType = sourcePath.match(regex)[0];
    const minifiedPath = sourcePath.replace(regex, `.min${fileType}`);

    return minifiedPath;
  }

  return sourcePath;
}

module.exports = generateMinifiedPath;
