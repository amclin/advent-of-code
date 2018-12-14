/**
 * Filters an array to only its unique values
 * @param {Array} arr list of items
 * @returns {Array} list of unique results
 */
const unique = (arr) => {
  return Array.from(new Set(arr))
}

module.exports = {
  unique
}
