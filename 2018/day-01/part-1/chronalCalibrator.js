const chronalCalibrator = (input) => {
  let frequency = 0
  input = input.replace(/\s+/g, '') // Strip whitespace
  // Convert string to array of int
  let adjustments = input.split(',').map((item) => {
    return parseInt(item)
  })
  adjustments.forEach((adjustment) => {
    frequency += parseInt(adjustment)
  })
  return frequency
}

module.exports = chronalCalibrator
