module.exports = {
    testEnvironment: 'jest-environment-jsdom-fifteen',
    setupFiles: ['@testing-library/react/dont-cleanup-after-each'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '\\.(css|less|scss|sass)$': 'jest-transform-css',
    },
}
