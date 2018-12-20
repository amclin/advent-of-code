const { dynamicSort } = require('../day-04/helpers')
const { Rack } = require('./fuel-cells')
const serial = 1133 // From puzzle input
const size = [300, 300]
const squareSize = [3, 3]

let powerBank = new Rack(serial, size)
// powerBank.tallySquares(squareSize)
// const answer = powerBank.getCellsByPower(squareSize)[0].coords
let max = powerBank.findMaxSquare(squareSize).idx
const answer = powerBank.cells[max].coords

console.log(`-- Part 1 --`)
console.log(`Answer: ${answer}`)

const anySizeSquares = []
for (let dial = 1; dial <= 300; dial++) {
  console.log(`Measuring power with dial at ${dial}`)
  // powerBank.tallySquares([dial, dial])
  // let bestOfSizeX = powerBank.getCellsByPower(squareSize)[0]
  // anySizeSquares.push({
  //   coords: bestOfSizeX.coords,
  //   power: bestOfSizeX.squareTotal,
  //   size: dial
  // })
  const max = powerBank.findMaxSquare([dial, dial])
  anySizeSquares.push({
    coords: powerBank.cells[max.idx].coords,
    power: max.power,
    size: dial
  })
}

const bestOfAnySize = anySizeSquares.sort(dynamicSort('-power'))[0]
let answer2 = bestOfAnySize.coords
answer2.push(bestOfAnySize.size)

console.log(`-- Part 2 --`)
console.log(`Answer: ${answer2}`)
