module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: 'src',
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '.*\\.spec\\.ts$', // Unit & integration
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!uuid)'],
    moduleNameMapper: {
        '^@recharge/(.*)$': '<rootDir>/recharge/$1',
        '^@security/(.*)$': '<rootDir>/security/$1',
        '^@infrastructure/(.*)$': '<rootDir>/infrastructure/$1',
        "^@test/(.*)$": "<rootDir>/test/utils/$1",
    },
    coverageDirectory: '../coverage',
    collectCoverageFrom: [
        '**/*.ts',
        '!**/main.ts',
        '!**/index.ts',
        '!**/*.module.ts',
        '!**/*.mock.ts',
    ],
};
