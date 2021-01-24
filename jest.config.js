module.exports = {
    preset: "ts-jest",
    verbose: true,
    projects: ["<rootDir>"],
    collectCoverage: true,
    testEnvironment: "node",
    testMatch: ["**/test/**/*.[t]s?(x)", "**/?(*.)+(spec|test).[t]s?(x)"],
    testPathIgnorePatterns: [
        "/(?:production_)?node_modules/",
        ".d.ts$",
        "<rootDir>/build",
        "<rootDir>/test/fixtures",
        "<rootDir>/test/helpers",
        "<rootDir>/src/WordCount.ts",
        "__mocks__",
        ".history",
    ],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
};