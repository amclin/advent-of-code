const inputToArray = require('../inputParser').inputToArray
const unique = require('../helpers').unique

const hasNRepeatedChars = (haystack, n) => {
  let chars = unique(haystack.split(''))
  chars = chars.filter((char) => {
    const needle = new RegExp(char, 'g')
    const count = (haystack.match(needle) || []).length // find number of results in the ID
    return (count === n)
  })
  return (chars.length > 0)
}

function getChecksum (input) {
  const ids = inputToArray(input)
  let count2 = 0
  let count3 = 0
  ids.forEach((id) => {
    if (hasNRepeatedChars(id, 2)) { count2++ }
    if (hasNRepeatedChars(id, 3)) { count3++ }
  })

  return count2 * count3
}

/**
 * Compares two stings and counts how many letters differ between them
 * @param {String} id1 the first string
 * @param {String} id2 the second string
 * @returns {number}
 */
const scoreIDs = (str1, str2) => {
  const common = getCommonLetters(str1, str2)
  return str1.length - common.length
}

/**
 * Compares two strings and returns the letters that they share
 * @param {String} str1
 * @param {String} str2
 * @returns {String}
 */
const getCommonLetters = (str1, str2) => {
  const chars1 = str1.split('')
  const chars2 = str2.split('')

  return chars1.filter((chr, idx) => {
    return (chars2[idx] === chr)
  }).join('')
}

/**
 * Searches through a list of IDs, finding ones that only have 1 letter difference
 * @param {Array} ids
 * @param {Number} threshold of difference. Defaults to 1
 * @returns {Array} list of similar IDs
 */
const findSimilarIDs = (ids, threshold) => {
  const results = []
  threshold = threshold || 1

  let searchIdx = 0
  do {
    const needle = ids[searchIdx]
    // Find matches that differ by only one letter
    const matches = ids.filter((id, idx) => {
      // Don't repeat comparisons and don't compare to self
      if (searchIdx <= idx) {
        return false
      }
      return (scoreIDs(needle, id) === threshold)
    })

    // Stop iterating through needles once there's a match
    if (matches.length === threshold) {
      results.push(needle)
      results.push(matches[0])
    }

    // Check next term
    searchIdx++
  }
  while (searchIdx < ids.length && results.length === 0)

  return results
}

module.exports = {
  findSimilarIDs,
  getCommonLetters,
  getChecksum,
  hasNRepeatedChars,
  scoreIDs
}
