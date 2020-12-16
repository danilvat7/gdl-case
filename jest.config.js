module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: './src/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
};
