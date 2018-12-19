/**
 * Splits the array of data into lists of the number of children
 * @param {Array} input list of data values from license input
 * @param {Number} expected Number of children in the data
 * @returns {Object} { children: [node], remainder: [data values]}
 */
const findChildren = (input, expected) => {
  let results = []

  while (results.length < expected) {
    let result = {
      children: [],
      metadata: []
    }
    let childCount = input.shift()
    let metaCount = input.shift()
    let childSearchResults = findChildren(input, childCount)

    result.children = childSearchResults.children
    input = childSearchResults.remainder
    if (metaCount > 0) {
      for (let r = 0; r < metaCount; r++) {
        result.metadata.push(input.shift())
      }
    }

    results.push(result)
  }

  return {
    children: results,
    remainder: input
  }
}

/**
 * Parses the data stream to generate a structured data object
 * @param {Array} input list of data valeus from license input
 * @returns {Object} the structured data nodes
 */
const parseData = (input) => {
  return findChildren(input, 1).children[0]
}

/**
 * Totals the values of all the metadata entries in the provided data object
 * @param {Object} node object
 * @returns {Number} total of all nested metadata
 */
const sumMetadata = (node) => {
  let count = node.metadata.reduce((acc, curr) => { return acc + curr }, 0)
  count += node.children.reduce((acc, curr) => { return acc + sumMetadata(curr) }, 0)
  return count
}

module.exports = {
  parseData,
  sumMetadata
}
