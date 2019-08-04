const ROOT = process.cwd();

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  name: 'chat-client',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts', 'jest-extended'],
  transformIgnorePatterns: ['^.+\\.module\\.{css,sass,scss}$'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': `${ROOT}/../__jest__/styleMock.js`,
  },
};
