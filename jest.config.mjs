import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
})

// custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jest-environment-jsdom',
}

export default createJestConfig(config)
