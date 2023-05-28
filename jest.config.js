/** @type {import("jest").Config} */
module.exports = {
  silent: false,
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
};
