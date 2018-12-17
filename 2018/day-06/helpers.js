const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const linesToArray = require('../inputParser').linesToArray

const loadInput = (callback) => {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) throw err

    let list = linesToArray(data).sort().map((line) => {
      let coords = line.split(', ')
      return {
        x: parseInt(coords[0]),
        y: parseInt(coords[1])
      }
    })

    if (typeof callback === 'function') {
      callback(list)
    }
  })
}

module.exports = {
  loadInput
}