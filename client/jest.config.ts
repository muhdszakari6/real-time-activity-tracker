import type { Config } from 'jest';

const config: Config = {
    rootDir: "./",
    preset: 'ts-jest',
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        '\\.(css|scss)$': 'identity-obj-proxy',
        "^.+\\.svg": "<rootDir>/tests/mocks/svgMock.tsx"
    },
    // to obtain access to the matchers.
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    modulePaths: ['<rootDir>'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.test.json',
        }],
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],

};

export default config;