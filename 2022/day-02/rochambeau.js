
// Lookup tables for possible rock / paper / scissor values
const selfCodes = ['X', 'Y', 'Z']
const opponentCodes = ['A', 'B', 'C']

const scoreRound = (opponent, self) => {
  const scoreShape = (self) => {
    return selfCodes.indexOf(self) + 1
  }

  const scoreOutcome = (opponent, self) => {
    const selfScore = selfCodes.indexOf(self)
    const oppScore = opponentCodes.indexOf(opponent)
    // Win
    if (
      (selfScore - 1 === oppScore) ||
      (selfScore === 0 && oppScore === 2)
    ) {
      return 6
    }
    // Lose
    if (
      (oppScore - 1 === selfScore) ||
      (oppScore === 0 && selfScore === 2)
    ) {
      return 0
    }
    // Draw
    if (selfCodes.indexOf(self) === opponentCodes.indexOf(opponent)) {
      return 3
    }

    throw new Error(`Could not calculate the results of the match: ${opponent}, ${self}`)
  }

  return scoreShape(self) + scoreOutcome(opponent, self)
}

/**
 * Tallies the results of all rounds in a match
 * @param {*} guide
 * @returns
 */
const scoreMatch = (guide) => {
  return guide.map((match) => {
    return scoreRound(...match)
  }).reduce((sum, value) => sum + value, 0)
}

module.exports = {
  scoreMatch,
  scoreRound
}
