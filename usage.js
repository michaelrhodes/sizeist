var fs = require('fs')
var sizeist = require('sizeist')

function log (type) {
  return console.log.bind(console, type)
}

sizeist(fs.createReadStream('usage.js'))
  .on('size', log('size'))
  .on('size:uglify', log('size:uglify'))
  .on('size:uglify:gzip', log('size:uglify:gzip'))
  .on('finish', log('done'))

// Output:
// size 387
// size:uglify 272
// size:uglify:gzip 164
// done
