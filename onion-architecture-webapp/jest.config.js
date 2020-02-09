module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,ts,vue}"],
  coverageDirectory: "coverage",
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFiles: ["./tests/unit/setup.js"]
};
