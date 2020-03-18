module.exports = (options) => {
  const path = require('path')
  const paths = require('./paths')
  const template = require('lodash/template')
  const webpack = require('webpack')

  const srcPath = paths.toAbsPath('src.assets')
  const destPath = paths.toPath('dist.assets')
  const plugins = []

  plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __PRODUCTION__: options.production,
      __TARGET__: JSON.stringify(options.target),
      __TARGET_HOST__: JSON.stringify(options.hosts[options.target] || {}),
      'process.env': {
        'NODE_ENV': JSON.stringify(options.production ? 'production' : 'development') //eslint-disable-line quote-props
      }
    })
  )

  if (options.production) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.BannerPlugin({
        banner: template(options.banners.application)(options),
        entryOnly: true,
        raw: true
      })
    )
  }

  return {
    context: srcPath,
    entry: {},
    output: {
      path: path.join(process.cwd(), destPath),
      publicPath: destPath.replace(paths.toPath('dist.root'), '').replace(/\\/g, '/') + '/',
      filename: `${paths.get('js')}/[name].js`
    },
    watch: !!options.isWatching,
    devtool: (options.production ? '#source-map' : '#cheap-module-source-map'),
    mode: options.production ? 'production' : 'development',
    plugins,
    target: 'web',
    performance: {
      hints: false
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        { parser: { amd: false } },
        {
          test: /\.js$/,
          include: [
            paths.toAbsPath('src.assets/js')
          ],
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }, {
          test: /\.json$/,
          exclude: /(node_modules|vendors)/,
          loader: 'json-loader'
        }
      ]
    },
    resolve: {
      modules: ['node_modules', paths.toAbsPath('src.assets/vendors')],
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    }
  }
}