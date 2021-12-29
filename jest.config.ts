import type { Config } from '@jest/types';

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig: Config.InitialOptions = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: ['(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)sx?$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/utils/*.{js,jsx,ts,tsx}',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const config: Config.InitialOptions = createJestConfig(customJestConfig);

export default config;
