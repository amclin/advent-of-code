/**
 * Generates a checksum for a string by concatenating
 * the first and last digits found in the string
 * @param string containing a single line of data
 */
const checksumLine = (data) => {
  data.replace(/([^0-9])+/g, '') // trim non-numeric characters
  const checksumString = `${data[0]}${data[-1]}`
  return parseInt(checksumString)
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
