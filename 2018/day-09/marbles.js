let marbles = [0] // Game circle
let currentMarble = 0
let players = []
let currentPlayer = -1

const nextPlayer = () => {
  currentPlayer = (currentPlayer + 1 >= players.length) ? 0 : currentPlayer + 1
  return currentPlayer
}

/**
 * Play the game with the designated high marble and number of players
 * @param {Number} playerCount Number of players
 * @param {NUmber} highMarble Last marble (we ignore the marble spent for position 0)
 */
const playGame = (playerCount, highMarble, showBoard) => {
  resetGame(playerCount)

  // Go through the game
  for (let marble = 1; marble <= highMarble; marble++) {
    const player = nextPlayer()
    const makeMove = (marble % 23 === 0) ? placeSpecial : placeClockwise
    makeMove(marble, player)
    if (showBoard) {
      console.log(`[${player}] ${marbles.join(' ')}.....${marbles[currentMarble]}`)
    }
  }

  // tally the results
  let results = {}
  results.players = players.map((player) => {
    player.score = player.marbles.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    return player
  })
  results.highScore = Math.max.apply(null, results.players.map((p) => p.score))

  return results
}

/**
 * Resets the game for the designated number of players
 * @param {Number} count who will be playing
 */
const resetGame = (count) => {
  marbles = [0]
  currentMarble = marbles.indexOf(0)
  players = []
  currentPlayer = -1

  // Setup the players
  for (let x = 0; x < count; x++) {
    players.push({
      marbles: []
    })
  }
}

/**
 * Find the marble that is n places clockwise from the current marble
 */
const findClockwiseIdx = (n) => {
  let target = currentMarble + n
  // special case for first marble since it loops around the circle N times
  if (marbles.length === 1) {
    return 1
  }
  if (target === marbles.length) {
    return target
  }
  return target % marbles.length
}

/**
 * Find the marble that is n places counter-clockwise from the current marble
 */
const findCounterClockwiseIdx = (n) => {
  let target = currentMarble - n
  if (target < 0) {
    // wrap around
    return marbles.length + target
  }
  return target
}

/**
 * Normal move is to place a marble 2 spaces clockwise of current, shifting the circle
 * @param {Number} marble
 */
const placeClockwise = (marble, player) => {
  // console.log(`Player ${player} played marble ${marble}`)
  // find location
  let clockwise = findClockwiseIdx(2)
  marbles.splice(clockwise, 0, marble)
  currentMarble = marbles.indexOf(marble)
}

/**
 * Placing the special marble has all sorts of rules. See https://adventofcode.com/2018/day/9
 * @param {Number} marble
 */
const placeSpecial = (marble, player) => {
  // Player keeps the marble instead of playing it
  // console.log(`Player ${player} drew marble ${marble}`)
  players[player].marbles.push(marble)
  // Player takes the marble off the board 7 spaces counter-clockwise from currrent
  let target = findCounterClockwiseIdx(7)
  let marbleNext = marbles[target + 1]
  let earnedMarble = marbles.splice(target, 1)[0]
  // console.log(`Player ${player} picked up marble ${earnedMarble} from spot ${target}`)
  // console.log(`The new current marble is ${marbleNext} at spot ${marbles.indexOf(marbleNext)}`)
  players[player].marbles.push(earnedMarble)
  // Marble immediately clockwise of the one removed becomes the new current marble
  // (in other words, occupies the same position the removed marble was in)
  currentMarble = marbles.indexOf(marbleNext)
}

module.exports = {
  playGame
}
