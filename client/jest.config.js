module.exports = {
  collectCoverageFrom: ["src/**/*.jsx"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ["html", "text"],
  collectCoverage: true,
};
