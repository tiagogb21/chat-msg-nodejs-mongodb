/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./src/__tests__",
  testTimeout: 60000,
  testPathIgnorePatterns: ["/node_modules/", "/src/__tests__/ignore/"],
};
