/**
 * Parse the string into addressable data. Suitable for use in Array.prototype.map()
 * @param {String} line from log file
 * @param {Number} idx index of line in array
 * @param {Array} arr read-only array provided by .map()
 * @returns {Object} structured data
 */
const parseEntry = (line, idx, arr) => {
  let data = line.split(' ')
  return {
    id: data[7],
    dep: data[1]
  }
}

/**
 * Calculates the necessary order of entries based on their hierarchy
 * @param {Array} entries List of instructions
 * @returns {Array} sorted list
 */
const sortInstructions = (entries) => {
  let sorted = ''
  return sorted
}

module.exports = {
  parseEntry,
  sortInstructions
}
