
/**
 * Validates a list of records by comparing every combination
 * to the checksum. Stops when the first match is found
 * @param {array} records List of records to check
 * @param {int} checksum The target sum that records should add up to
 * @param {int} goal The number of records we hope to find
 */
const validateRecords = (records, checksum = 2020, goal = 2) => {
  const results = []

  // Intentionally using `function()` instead of `() =>` because
  // the thisArg won't get passed to the find callback otherwise
  // https://stackoverflow.com/questions/46639131/javascript-array-prototype-find-second-argument-thisarg-not-working
  function matcher (record) {
    this.depth = this.depth || 1 // depth tracking starts at level 1
    this.tracker = this.tracker || 0 // for basic sums, start counter at 0
    const subTotal = this.tracker + record
    // Found a match in the specified with desired qty of results, don't keep searching!
    if (subTotal === this.target && this.depth >= goal) {
      results.push(record)
      return true
    }
    // When subtotal exceeds target, return immediately and don't waste time
    // on more loops that won't get results
    if (subTotal > this.target) {
      return false
    }
    // If we're already at max depth, don't waste time on more loops
    if (this.depth >= this.maxDepth) {
      return false
    }
    // Check the next level down
    const res = records.find(matcher, {
      maxDepth: this.maxDepth,
      target: this.target,
      depth: this.depth + 1,
      tracker: this.tracker + record
    })
    // Propogate maches back up the recursion chain, capturing each
    if (res) {
      results.push(record)
      return true
    }
    // Nothing found with this combo, step to the next sibling
    return false
  }

  // Parse the records to find results
  records.find(matcher, {
    maxDepth: goal,
    target: checksum
  })

  if (results.length < 2) {
    throw new Error('Couldn\'t find a checksum match')
  }
  return results
}

module.exports = {
  validateRecords
}
