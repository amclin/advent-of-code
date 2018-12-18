/**
 * Parses the data stream to generate a structured data object
 * @param {Array} data list of data valeus from license input
 * @returns {Object} the structured data nodes
 */
const parseData = (data) => {
  return data
}

/**
 * Totals the values of all the metadata entries in the provided data object
 * @param {Object} data object
 * @returns {Number} total of all nested metadata
 */
const sumMetadata = (data) => {
  let sum = data.length
  return sum
}

module.exports = {
  parseData,
  sumMetadata
}
