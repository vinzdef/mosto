// https://github.com/nuxt/nuxt.js/issues/5800
const { src, dest } = require('gulp')
const htmlmin = require('gulp-html-minifier')

function minify () {
  return src('./dist/**/*.html')
    .pipe(htmlmin({ removeComments: true, collapseWhitespace: true }))
    .pipe(dest('./dist'))
}

exports.default = minify
