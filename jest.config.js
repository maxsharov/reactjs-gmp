module.exports = {
  moduleNameMapper: {
    '\\.(s?css|less)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/setup-jest.js',
  ],
  testEnvironment: 'jsdom',
}