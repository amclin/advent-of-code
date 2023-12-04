/**
 * Generates a checksum for a string by concatenating
 * the first and last digits found in the string
 * @param string containing a single line of data
 */
const checksumLine = (data) => {
  const parsed = data.replace(/([^0-9])/g, '') // trim non-numeric characters
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
 * @param Arrray of lines containing data
 */
const checksumSet = (set) => {
  return set.reduce((total, current) => {
    return total + checksumLine(current)
  }, 0)
}

module.exports = { checksumLine, checksumSet }
