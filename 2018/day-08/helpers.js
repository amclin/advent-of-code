const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')

const loadInput = (callback) => {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) throw err

    const list = data.split(' ').map(Number)
    if (typeof callback === 'function') {
      callback(list)
    }
  })
}

module.exports = {
  loadInput
}
