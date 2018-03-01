'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const glob = require('glob')

let instruct = process.env.npm_config_theme ? process.env.npm_config_theme.split('_') : []
let themeName = instruct[0] ? instruct[0] : ''
let styleName = instruct[1] ? instruct[1] : 'default'
let themeList = glob.sync('src/themes/*')
let hasThemes = themeList.map(v => v.slice(11)).includes(themeName)
// console.log('themeName', themeName, styleName, themeList, hasThemes)

let port = 8080 + Math.floor(Math.random() * 100)

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/data': {
        target: 'http://data.taipei/',  // 遠端 URL Domain
        changeOrigin: true,
        pathRewrite: {
          '^/data': ''
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: port, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: { // (目前for demo做設定，實際一次build多theme，以設定index與assetsPublicPath做控制)
    // Template for index.html
    // index: hasThemes ? path.resolve(__dirname, `../dist/${themeName}/${styleName}/index.html`) : path.resolve(__dirname, '../dist/index.html'),
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: hasThemes ? `${themeName}/${styleName}` : 'static',
    // assetsPublicPath: hasThemes ? '/' : './',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
