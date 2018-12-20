const { listToProps } = require('../day-10/helpers')

/**
 * Parses a line from the input into structured data
 * @param {String} input Line from input stream
 * @returns Structured object with patterns and states
 */
const parseLine = (input) => {
  return input.split(' => ').reduce((acc, curr, idx) => listToProps(acc, curr, idx, ['id', 'generate']), {})
}

module.exports = {
  parseLine
}
