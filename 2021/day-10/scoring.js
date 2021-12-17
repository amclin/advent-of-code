
const findMiddleScore = (scores) => {
  // According to specs, there's always an odd number of items in the list,
  // so we're safe to divide by 2 and round down to get the desired index
  return scores.sort((a, b) => a - b)[
    Math.floor(scores.length / 2)
  ]
}

// How many points each character is worth in autocomplete scoring
const pointValues = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}

const scoreAutocomplete = (suggestion) => {
  return [...suggestion].reduce((score, char) => {
    return (score * 5) + pointValues[char]
  }, 0)
}

module.exports = {
  findMiddleScore,
  scoreAutocomplete
}
