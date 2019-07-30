const ROOT = process.cwd();

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts', 'jest-extended'],
  transformIgnorePatterns: ['^.+\\.module\\.{css,sass,scss}$'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': `${ROOT}/../__jest__/styleMock.js`,
  },
};
