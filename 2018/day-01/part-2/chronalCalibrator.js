const parseData = require('../../inputParser').parseData

/**
 * Calculates a frequency from a list of values
 * @param {String} input list of values
 */
function getFrequency (input) {
  let adjustments = parseData(input)
  return adjustments.reduce(
    (total, current) => total + current
  )
}

/**
 * Finds the first time a frequency value matches
 * @param {String} input list of values
 */
function getFirstMatch (input) {
  const sequence = parseData(input)
  let freq = 0
  let idx = 0
  let log = [freq]
  let matched = null
  do {
    // Adjust Frequence
    freq += sequence[idx]
    // Frequency previously reached and stored in log
    if (log.indexOf(freq) > -1) {
      matched = freq
    }

    // Log this frequency
    log.push(freq)

    // Next adjustment in the sequence
    idx++
    // loop through the sequence multiple times if necessary
    if (idx === sequence.length) {
      idx = 0
    }
  }
  while (matched === null)
  return matched
}

module.exports = {
  getFrequency,
  getFirstMatch
}
