const { Rack } = require('./fuel-cells')
const serial = 1133 // From puzzle input
const size = [300, 300]
const squareSize = [3, 3]

let powerBank = new Rack(serial, size)
powerBank.tallySquares(squareSize)
const answer = powerBank.getCellsByPower(squareSize)[0].coords
const answer2 = ''
console.log(`-- Part 1 --`)
console.log(`Answer: ${answer}`)
console.log(`-- Part 2 --`)
console.log(`Answer: ${answer2}`)
