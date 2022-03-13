module.exports = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageReporters: ["text", "html"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/types/**/*.ts",        // Ignored - No use checking type declarations for coverage
    "!src/utils/checkLogPath.ts" // Ignored - Would require changing the value of NODE_ENV
  ],
  testPathIgnorePatterns: [".js"],
};
