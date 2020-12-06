
/**
 * Validates a list of records by comparing every combination
 * to the checksum. Stops when the first match is found
 */
const validateRecords = (records, checksum = 2020) => {
  const results = []

  // We're using Array.find() at each level so it stops looping
  // onced matched. This game has a habit of throwing huge
  // data sets to discourage brute-forcing
  const matcher = records.find((record) => {
    const match = records.find(matchRec => record + matchRec === checksum)
    if (match) {
      results.push(match)
      return true
    }
    return false
  })
  if (matcher) {
    results.push(matcher)
  }

  if (results.length < 2) {
    throw new Error('Couldn\'t find a checksum match')
  }
  return results
}

module.exports = {
  validateRecords
}
