const path = require('path');

module.exports = function (config) {
    const puppeteer = require('puppeteer');
    process.env.CHROME_BIN = puppeteer.executablePath();

    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'test/index.ts'
        ],
        preprocessors: {
            'test/index.ts': ['webpack', 'sourcemap']
        },
        plugins: [
            require('karma-webpack'),
            require('karma-sourcemap-loader'),
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-junit-reporter')
        ],
        client: {
            clearContext: false
        },
        coverageIstanbulReporter: {
            dir: path.join(__dirname, 'dist/coverage'),
            reports: ['html', 'lcovonly', 'text-summary', 'cobertura'],
            fixWebpackSourcePaths: true,
            thresholds: {
                statements: 80,
                lines: 80,
                branches: 80,
                functions: 80
            }
        },
        reporters: ['progress', 'kjhtml'],
        junitReporter: {
            outputDir: './dist/junit'
        },
        webpack: require('./webpack.config.test.js'),
        webpackMiddleware: {
            noInfo: true,
            stats: 'errors-only'
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: true
    });
};
