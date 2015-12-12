var pump = require('pump')
var through = require('through2')
var uglify = require('uglify-stream')
var devnull = require('dev-null')
var zlib = require('zlib')
var gzip = zlib.createGzip

module.exports = function (input, opts) {
  opts = opts || {}

  var size = pump(
    input,
    count('size'),
    uglify(opts.uglify),
    count('size:uglify'),
    gzip(),
    count('size:uglify:gzip'),
    devnull()
  )

  function count (name) {
    var bytes = 0
    return through(
      function (chunk, enc, next) {
        this.push(chunk)
        bytes += chunk.toString().length
        next()
      },
      function (done) {
        size.emit(name, bytes)
        done()
      }
    )
  }

  return size
}
