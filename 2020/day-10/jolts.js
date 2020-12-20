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
  console.debug('Tallied voltage differences:', tallies)
  return tallies
}

const countCombinations = (data) => {
  const tallies = Array(5).fill(0)
  const delta = (idx) => {
    return data[idx] - data[idx - 1]
  }

  // Always account for the outlet
  data.push(0)
  data = data.sort((a, b) => a - b)

  const deltas = data.reduce((res, el, idx) => {
    console.debug(idx, el, delta(idx))
    if (idx <= 0) {
      return res
    }
    res.push(delta(idx))
    return res
  }, [])
  console.debug('joltage deltas', deltas)

  // I'm really not proud of this solution. It hardcodes too much logic with magic constants
  // and only works because there are no joltage differences of 2, and the max allowed
  // skip is 3.
  //
  // Since the rules say adapters can support 1, 2, or 3 jolt diferences,
  // that means if the difference between n and n+2 is 3 or less, n+1 can be safely
  // skipped. Potentially we can skip two.
  // Every time we skip a number, the total amount of variations doubles

  // This logic would be a LOT messier if we had diffs of 2 in the data set

  // When we have 2 skips in a row, we need to leave one combo in case
  // skipping both exceeds the max difference
  // TODO: we aren't implementing this because our data set doesn't have
  // any diffs of 2, which means we never have a 1 + 2 skip to worry about

  // When we have 3 skips in a row, we're definitely exceeding the max difference
  // if the next is also a skip so we have to leave at least one in place

  // When we have 5 skips in a row.... etc..
  // TODO: we aren't implementing this because dataset doesn't have any examples

  deltas.forEach((d, idx, arr) => {
    if (d === 1 && arr[idx + 1] === 1 && arr[idx + 2] === 1 && arr[idx + 3] === 1) {
      console.debug('Found 4 in a row')
      tallies[4]++
      deltas.splice(idx, 4)
    } else if (d === 1 && arr[idx + 1] === 1 && arr[idx + 2] === 1) {
      console.debug('Found 3 in a row')
      tallies[3]++
      deltas.splice(idx, 3)
    } else if (d === 1 && arr[idx + 1] === 1) {
      console.debug('Found 2 in a row')
      tallies[2]++
      deltas.splice(idx, 2)
    } else if (d === 1) {
      console.debug('Found 1 in a row')
      tallies[1]++
      deltas.splice(idx, 1)
    }
  })

  console.debug('skippable ranges', tallies)
  console.debug([1, 1 ** tallies[1], 2 ** tallies[2], 4 ** tallies[3], 7 ** tallies[4]])
  return (
    1 ** tallies[1]
  ) * (
    2 ** tallies[2]
  ) * (
    4 ** tallies[3]
  ) * (
    7 ** tallies[4] // 4 in a row is special case because we can't skip more than 3
  )
}

module.exports = {
  countDifferences,
  countCombinations
}
