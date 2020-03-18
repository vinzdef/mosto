module.exports = (gulp, $, options) => {

  const path = require('path')
  const log = require('fancy-log')
  const { cyan } = require('ansi-colors')
  const _ = require('lodash')
  const webpackConfigDefault = require('../gulp-config/webpack.conf')(options)
  const paths = require('../gulp-config/paths')
  const webpack = require('webpack')

  let compiler
  let watcher

  function getEntryPoints(cwd) {
    const entryObj = {}

    require('glob').sync(`./${paths.get('js')}/*.js`, {
      cwd
    }).forEach((filepath) => {
      const entryId = path.basename(filepath, '.js')
      entryObj[entryId] = [filepath]
    })

    return entryObj
  }

  function compilerCallback(err, stats) {
    log((stats || {}).toString({
      colors: cyan,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: true,
      version: true,
      cached: false,
      cachedAssets: false,
      reasons: false,
      source: false,
      errorDetails: false
    }))

    if (err) {
      throw new $.PluginError('webpack', err)
    }
  }

  const webpackConfig = _.assign({}, webpackConfigDefault)
  webpackConfig.entry = _.assign({}, webpackConfigDefault.entry, getEntryPoints(webpackConfigDefault.context))
  compiler = webpack(webpackConfig)

  gulp.task('scripts', (done) => {
    compiler.run((err, stats) => {
      compilerCallback(err, stats)
      if (stats && stats.hasErrors()) {
        done('Error compiling')
      } else {
        done()
      }
    })
  })

  gulp.task('scripts:watch', gulp.series((done) => {
    const notifier = $.notify({ message: 'Scripts Compiled!' })
    const bs = require('browser-sync')
    const del = require('del')
    const browserSync = bs.has(options.buildHash) ? bs.get(options.buildHash) : null

    function createWatcher(webpackCompiler) {
      return webpackCompiler.watch({
        aggregateTimeout: 200,
        poll: false
      }, (err, stats) => {
        compilerCallback(err, stats)
        if (stats && stats.hasErrors()) {
          notifier.emit('error', new Error('Compilation error!'))
        } else {
          notifier.write('Scripts Compiled')
          if (browserSync) {
            browserSync.reload()
          }
        }
      })
    }

    notifier.on('error', $.notify.onError({
      message: 'Error: <%= error.message %>'
    }))

    //force watching
    if (!options.isWatching) {
      options.isWatching = true //eslint-disable-line
    }

    watcher = createWatcher(compiler)
    process.on('exit', () => {
      watcher.close(done)
    })
  }))
}