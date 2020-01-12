// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    const puppeteer = require('puppeteer');
    process.env.CHROME_BIN = puppeteer.executablePath();

    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'test.ts'
        ],
        preprocessors: {
            'test.ts': ['webpack', 'sourcemap']
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
            dir: require('path').join(__dirname, './dist/coverage/myanmar-text-fragmenter-js'),
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
            outputDir: './dist/junit/myanmar-text-fragmenter-js'
        },
        webpack: require('./webpack.config.test.js')(),
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        // customLaunchers: {
        //     ChromeHeadlessCI: {
        //         base: 'ChromeHeadless',
        //         flags: ['--no-sandbox']
        //     }
        // },
        singleRun: false,
        restartOnFileChange: true
    });
};
