const {
  playGame
} = require('./marbles')

const players = 479 // from input
const marbles = 71035 // from input
const answer = playGame(players, marbles).highScore
const answer2 = ''
console.log(`-- Part 1 --`)
console.log(`Answer: ${answer}`)
console.log(`-- Part 2 --`)
console.log(`Answer: ${answer2}`)
