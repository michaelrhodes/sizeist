# sizeist
sizeist takes a readable stream and emits its size (in bytes) at various stages of compression. This is useful for quickly determining the real-world size of a given module.

[![Build status](https://travis-ci.org/michaelrhodes/sizeist.png?branch=master)](https://travis-ci.org/michaelrhodes/emoji-flag)

## Install
```sh
$ npm install sizeist
```

## Usage
```js
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
```

## License
[MIT](http://opensource.org/licenses/MIT)
