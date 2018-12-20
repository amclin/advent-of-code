// const {
//   parseLine
// } = require('./helpers')
const {
  Plants
} = require('./plants')

const initialState = '#..#.#..##......###...###'
const plantTracker = new Plants(initialState)

console.log(plantTracker.generations[0])
