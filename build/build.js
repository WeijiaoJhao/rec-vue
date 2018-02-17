'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const fs = require('fs')
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

let instruct = process.env.npm_config_theme ? process.env.npm_config_theme.split('_') : []
let themeName = instruct[0] ? instruct[0] : ''
let styleName = instruct[1] ? instruct[1] : 'default'
// console.log('themeName', themeName, styleName)

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n', (err) => {
      if (err) console.error(err)
      instruct.length === 0 && console.log(`build dev, Write operation complete.`)
      instruct.length === 0 || console.log(`${themeName}_${styleName},Write operation complete.`)
    })

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
