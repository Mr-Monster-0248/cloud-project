module.exports = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageReporters: ["text", "html"],
  testPathIgnorePatterns: [".js"],
};
