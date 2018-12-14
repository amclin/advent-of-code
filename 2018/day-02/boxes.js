
function getListFromData (input) {
  // convert into an array of integers
  const dataList = input.split(/[\s,]+/)
  // Filter out empty strings
  return dataList.filter((el) => el !== '')
}

/**
 * Filters out a list of unique values in an array
 * @param {Array} a list of items
 * @returns {Array} list of unique results
 */
const unique = (a) => {
  return Array.from(new Set(a))
}

const hasNRepeatedChars = (haystack, n) => {
  let chars = unique(haystack.split(''))
  chars = chars.filter((char) => {
    let needle = new RegExp(char, 'g')
    let count = (haystack.match(needle) || []).length // find number of results in the ID
    return (count === n)
  })
  return (chars.length > 0)
}

function getChecksum (input) {
  const ids = getListFromData(input)
  let count2 = 0
  let count3 = 0
  ids.forEach((id) => {
    if (hasNRepeatedChars(id, 2)) { count2++ }
    if (hasNRepeatedChars(id, 3)) { count3++ }
  })

  return count2 * count3
}

module.exports = {
  getListFromData,
  getChecksum,
  hasNRepeatedChars
}
