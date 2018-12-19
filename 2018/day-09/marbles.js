let marbles = [0] // Game circle
let currentMarble = 0
let players = []
let currentPlayer = -1

// Wrap around arrays with negative remainders
// https://stackoverflow.com/a/17323608/2859367
const mod = (n, m) => ((n % m) + m) % m

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
  let results = {
    players: players,
    highScore: players.sort((a, b) => b - a)[0]
  }

  return results
}

/**
 * Resets the game for the designated number of players
 * @param {Number} count who will be playing
 */
const resetGame = (count) => {
  marbles = [0]
  currentMarble = marbles.indexOf(0)
  players = Array(count).fill(0)
  currentPlayer = -1
}

/**
 * Find the index for the spot at n (looping through the array)
 */
const findClockwiseIdx = (n) => {
  return (n === marbles.length) ? n : n % marbles.length
}

/**
 * Normal move is to place a marble 2 spaces clockwise of current, shifting the circle
 * @param {Number} marble
 */
const placeClockwise = (marble, player) => {
  // console.log(`Player ${player} played marble ${marble}`)
  // find location
  let nextSpot = findClockwiseIdx(currentMarble + 2)
  marbles.splice(nextSpot, 0, marble)
  currentMarble = nextSpot
}

/**
 * Placing the special marble has all sorts of rules. See https://adventofcode.com/2018/day/9
 * @param {Number} marble
 */
const placeSpecial = (marble, player) => {
  // Player keeps the marble instead of playing it
  // console.log(`Player ${player} drew marble ${marble}`)
  players[player] += marble
  // Player takes the marble off the board 7 spaces counter-clockwise from currrent
  let target = mod(currentMarble - 7, marbles.length)
  players[player] += marbles.splice(target, 1)[0]
  // Marble immediately clockwise of the one removed becomes the new current marble
  // (in other words, occupies the same position the removed marble was in)
  currentMarble = target
}

module.exports = {
  playGame
}
