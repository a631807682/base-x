// Karma configuration
// Generated on Mon Jun 10 2019 18:26:18 GMT+0800 (中国标准时间)

module.exports = function (config) {
  let options = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'tape'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/karma-read-json/karma-read-json.js',
      'node_modules/browser-tap/browser-tap.js',
      'index.js',
      'test/browser.js',
            { pattern: 'test/**/*.json', included: false }
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/browser.js': 'browserify'
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-browserify',
      'karma-tape'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: [ '-headless' ]
      },
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--headless',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222'
        ],
        debug: true
      }
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity

  }

  if (process.env.TRAVIS) {
    options.singleRun = true
    options.browsers = [
      'ChromeHeadless',
      'FirefoxHeadless'
    ]
  }

  config.set(options)
}
