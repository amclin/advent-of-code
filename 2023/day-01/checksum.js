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

const lazyNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const lazyReg = new RegExp(lazyNums.join('|'))
const lazyNumsReversed = lazyNums.map((num) => num.split('').reverse().join(''))
const lazyReversReg = new RegExp(lazyNumsReversed.join('|'))

const lookupPosition = (match) => {
  const idx = lazyNums.indexOf(match)
  if (idx > 9) {
    return idx - 9
  }
  return idx
}

const lookupPositionReversed = (match) => {
  const reverseMatch = match.split('').reverse().join('')
  const idx = lazyNums.indexOf(reverseMatch)
  if (idx > 9) {
    return idx - 9
  }
  return idx
}

const lazyChecksumLine = (data) => {
  let first = ''
  data.replace(lazyReg, (match) => {
    first = lookupPosition(match)
    return match // reinsert so we don't bork the data string
  })
  // find last matching digit by reversing the string and searching backwards
  let last = ''
  data = data.split('').reverse().join('')
  data.replace(lazyReversReg, (match) => {
    last = lookupPositionReversed(match)
    return match // reinsert so we don't bork the data string
  })

  return parseInt(`${first}${last}`)
}

/**
 * Generates the checksum for an entire set
 * @param {array} set of lines containing data
 */
const checksumSet = (set, sanitize = false, lazy = false) => {
  let filter = (data) => data
  if (sanitize) {
    filter = sanitizeLine
  }

  let checksum = checksumLine
  if (lazy) {
    checksum = lazyChecksumLine
  }

  return set.reduce((total, current) => {
    return total + checksum(
      filter(current)
    )
  }, 0)
}

const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const numbersReversed = numbers.map((num) => num.split('').reverse().join(''))
const reg = new RegExp(numbers.join('|'))
const regGlobal = new RegExp(numbers.join('|'), 'g')
const regReversed = new RegExp(numbersReversed.join('|'))

// Sanitizes using a single-pass regex replace all
// Produces 53885 which is incorrect for part 2
const byRegex = (data) => {
  return data.replaceAll(regGlobal, (matched) => numbers.indexOf(matched) + 1)
}

// Sanitizes by replacing just the first and last text digits, in case shared letters is supposed to work
// Produces 53853 which is too low for part 2
const byFirstLast = (data) => {
  // sanitize first matching digit
  data = data.replace(reg, (matched) => numbers.indexOf(matched) + 1)
  // sanitize last matching digit by reversing the string and searching backwards
  data = data.split('').reverse().join('')
  data = data.replace(regReversed, (matched) => numbersReversed.indexOf(matched) + 1)

  // return original order
  return data.split('').reverse().join('')
}

/**
 * Sanitzizes a line by replacing spelled-out numbers with data
 * @param {string} data line of input to sanitize
 */
const sanitizeLine = (data, method = 'byFirstLast') => {
  const methods = {
    none: (data) => data,
    byFirstLast,
    byRegex
  }

  return methods[method](data)
}

module.exports = { checksumLine, checksumSet, sanitizeLine, lazyChecksumLine }
