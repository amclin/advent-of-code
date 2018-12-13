const chronalCalibrator = (input) => {
  let frequency = 0
  // Split string into array of integers. Split by whitespace or comma
  let adjustments = input.split(/[\s,]+/).map((item) => {
    return parseInt(item) || 0
  })
  adjustments.forEach((adjustment) => {
    frequency += parseInt(adjustment)
  })
  return frequency
}

module.exports = chronalCalibrator
