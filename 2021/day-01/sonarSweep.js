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

const sampledDepth = (depths, target) => {
  // console.debug(`sum of ${depths[target]} + ${depths[target + 1]} + ${depths[target + 2]}`)
  return depths[target] + depths[target + 1] + depths[target + 2]
}

const countIncreasingSampledDepth = (pings) => {
  const result = pings.reduce((total, curr, idx, pings) => {
    // skip first
    if (idx <= 0) {
      return 0
    }

    // Skip measureent if inusfficient remaining samples
    if (pings.length - idx < 3) {
      return total
    }

    // Increment count when sampled depth is larger than the previous sampled depth
    if (sampledDepth(pings, idx) > sampledDepth(pings, idx - 1)) {
      total++
      return total
    }

    // Otherwise don't increase
    return total
  }, 0)

  return result
}

module.exports = {
  countIncreasingDepth,
  countIncreasingSampledDepth
}
