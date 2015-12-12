var fs = require('fs')
var test = require('tape')
var sizeist = require('./')

test('it works', function (assert) {
  sizeist(fs.createReadStream('usage.js'))
    .on('size', expect('size', 387))
    .on('size:uglify', expect('size:uglify', 272))
    .on('size:uglify:gzip', expect('size:uglify:gzip', 164))
    .on('finish', assert.end)

  function expect (name, expected) {
    return function (actual) {
      assert.equal(actual, expected, name)
    }
  }
})
