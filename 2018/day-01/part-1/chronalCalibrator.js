const parseData = require('../../inputParser').parseData

/**
 * Calculates a frequency from a list of values
 * @param {String} input list of values
 */
const chronalCalibrator = (input) => {
  const adjustments = parseData(input)
  return adjustments.reduce(
    (total, current) => total + current
  )
}

module.exports = chronalCalibrator
