module.exports = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageReporters: ["clover", "json", "lcov", "text", "html"],
};
