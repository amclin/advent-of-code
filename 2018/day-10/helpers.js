const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const linesToArray = require('../inputParser').linesToArray

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
   * Converts a string to a keyed value on the provided object based on its index
   * @private
   * @param obj Object to attach the keys to
   * @param val Value to populate for the key
   * @param idx Index count so we know what key to use
   * @param {Array} keys List of keys to use for the object
   * @returns The original object mutated with appended keys
   */
const _listToProps = (obj, val, idx, keys) => {
  obj[keys[idx]] = val
  return obj
}

/**
 * Parses a line from the input into structured data
 * @param {String} input Line from input stream
 * @returns Structured object with velocity and position x/y pairs
 */
const parseLine = (input) => {
  const pattern = /-*\d+,\s*-*\d+/g

  return input.match(pattern)
    .map((res) => res.split(',')
      .map(Number)
      .reduce((acc, curr, idx) => _listToProps(acc, curr, idx, ['x', 'y']), {})
    ).reduce((acc, curr, idx) => _listToProps(acc, curr, idx, ['position', 'velocity']), {})
}

module.exports = {
  listToProps: _listToProps,
  loadInput,
  parseLine
}
