const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')

const loadInput = (callback) => {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) throw err

    if (typeof callback === 'function') {
      callback(data)
    }
  })
}

module.exports = {
  loadInput
}
