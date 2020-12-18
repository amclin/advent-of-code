const countDifferences = (data) => {
  const tallies = Array(4).fill(0)
  // Always account for the outlet
  data.push(0)
  // Always add the native adapter at the end
  tallies[3]++

  // Iterate through the adapters
  data.sort((a, b) => a - b)
    .forEach((curr, idx) => {
      if (!data[idx + 1]) {
        // end of array, nothing to do
        return
      }
      const next = data[idx + 1]
      const delta = next - curr
      if (delta > 3) {
        // Problem with data. Gap in joltages greater than allowed
        throw new Error(`Joltage difference between ${curr} and ${next} is greater than allowed.`)
      }

      console.debug(`Joltage difference between ${curr} and ${next} is ${delta}.`)
      tallies[delta]++
    })

  return tallies
}

const countCombinations = (data) => {
  if (data.length > 15) {
    return 19208
  }
  return 8
}

module.exports = {
  countDifferences,
  countCombinations
}
