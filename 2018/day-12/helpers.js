const { listToProps } = require('../day-10/helpers')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { linesToArray } = require('../inputParser')

const loadInput = (callback) => {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) throw err

    const list = linesToArray(data).map(parseLine)
    if (typeof callback === 'function') {
      callback(list)
    }
  })
}

/**
 * Parses a line from the input into structured data
 * @param {String} input Line from input stream
 * @returns Structured object with patterns and states
 */
const parseLine = (input) => {
  return input.split(' => ').reduce((acc, curr, idx) => listToProps(acc, curr, idx, ['id', 'generate']), {})
}

module.exports = {
  loadInput,
  parseLine
}
