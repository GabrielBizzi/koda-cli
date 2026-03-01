const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "templates");
const dest = path.resolve(__dirname, "bin/templates");

fs.cpSync(src, dest, { recursive: true });
