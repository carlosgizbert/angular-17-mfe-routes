// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const process = require("process");
module.exports = function (config) {
  process.env.CHROME_BIN = require('puppeteer').executablePath();

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-spec-reporter'),
      require('karma-junit-reporter'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: false // disable the random running order
      }
    },
    preprocessors: {
      'src/**/!(*spec|*mock).js': ['coverage']
    },
    junitReporter: {
      outputDir: require('path').join(__dirname, 'testresults/junit'),
      outputFile: 'unit-test-result.xml',
      useBrowserName: false
    },
    specReporter: {
      // maxLogLines: 5,             // Limite de linhas logadas por teste
      suppressSummary: false,      // Imprimir resumo do test
      suppressErrorSummary: false, // Não imprimi o resumo dos erros
      suppressFailed: false,      // Não imprimi informações sobre os testes com erros
      suppressPassed: false,      // Não imprimi informações sobre os testes de sucesso
      suppressSkipped: true,      // Não imprimi informações sobre os testes skipados(pulados)
      showBrowser: false,         // Imprimir em tela cada teste
      showSpecTiming: true,      // Imprimir o tempo de execução de cada teste
      failFast: false,             // Para a suite de teste se encontrar qualquer erro, não roda o teste até o final
    },
    coverageReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      type: 'cobertura',
      file: 'code-coverage.xml',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        { type: 'cobertura', subdir: '.', file: 'code-coverage.xml' }
      ]
    },
    reporters: ["spec", "kjhtml", "junit"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--disable-web-security',
          '--disable-gpu',
          '--no-sandbox'
        ]
      }
    },
    singleRun: true
  });
};
