const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const linesToArray = require('../inputParser').linesToArray

const loadInput = (callback) => {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) throw err

    const list = linesToArray(data)
    if (typeof callback === 'function') {
      callback(list)
    }
  })
}

module.exports = {
  loadInput
}
