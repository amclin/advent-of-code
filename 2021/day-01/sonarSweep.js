const countIncreasingDepth = (pings) => {
  const result = pings.reduce((total, curr, idx, pings) => {
    // skip first
    if (idx <= 0) {
      return 0
    }
    // Increment count when depth is larger than the previous depth
    if (curr > pings[idx - 1]) {
      total++
      return total
    }

    // Otherwise don't increase
    return total
  }, 0)

  return result
}

module.exports = {
  countIncreasingDepth
}
