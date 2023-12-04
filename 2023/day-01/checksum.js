/**
 * Generates a checksum for a string by concatenating
 * the first and last digits found in the string
 * @param {string} data of a single line
 */
const checksumLine = (data) => {
  const parsed = data.replaceAll(/([^0-9])/g, '') // trim non-numeric characters
  let result = ''
  if (parsed.length === 1) { // some strings only have a single digit
    result = `${parsed}${parsed}`
  } else {
    result = `${parsed[0]}${parsed[parsed.length - 1]}`
  }
  return parseInt(result)
}

/**
 * Generates the checksum for an entire set
 * @param {array} set of lines containing data
 */
const checksumSet = (set) => {
  return set.reduce((total, current) => {
    return total + checksumLine((current))
  }, 0)
}

/**
 * Generates the checksum for an entire set when data is not sanitized
 * @param {array} set of lines containing data
 */
const checksumUnSanitizedSet = (set) => {
  return set.reduce((total, current) => {
    return total + checksumLine(sanitizeLine(current))
  }, 0)
}

const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const reg = new RegExp(numbers.join('|'), 'g')
/**
 * Sanitzizes a line by replacing spelled-out numbers with data
 * @param {string} data line of input to sanitize
 */
const sanitizeLine = (data) => {
  return data.replaceAll(reg, (matched) => numbers.indexOf(matched))
}

module.exports = { checksumLine, checksumSet, checksumUnSanitizedSet, sanitizeLine }
