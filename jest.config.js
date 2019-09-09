module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testResultsProcessor: "jest-junit",
  reporters: ["default", "jest-junit"]
};