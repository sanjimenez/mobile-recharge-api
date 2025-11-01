module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: 'src',
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '.*\\.spec\\.ts$', // Unit & integration
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
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
