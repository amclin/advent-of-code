const { dynamicSort } = require('../day-04/helpers')
const { Rack } = require('./fuel-cells')
const serial = 1133 // From puzzle input
const size = [300, 300]
const squareSize = [3, 3]

const powerBank = new Rack(serial, size)
// powerBank.tallySquares(squareSize)
// const answer = powerBank.getCellsByPower(squareSize)[0].coords
const max = powerBank.findMaxSquare(squareSize).idx
const answer = powerBank.cells[max].coords

console.log('-- Part 1 --')
console.log(`Answer: ${answer}`)

const anySizeSquares = []
let negativeCounter = 0
for (let dial = 1; dial <= 300; dial++) {
  // powerBank.tallySquares([dial, dial])
  // let bestOfSizeX = powerBank.getCellsByPower(squareSize)[0]
  // anySizeSquares.push({
  //   coords: bestOfSizeX.coords,
  //   power: bestOfSizeX.squareTotal,
  //   size: dial
  // })
  const max = powerBank.findMaxSquare([dial, dial])
  console.log(`Max power whith dial at ${dial} is ${max.power}`)

  anySizeSquares.push({
    coords: powerBank.cells[max.idx].coords,
    power: max.power,
    size: dial
  })

  // Watching the log, the power seems to go up as the grid size goes up, but reaches
  // a limit at which point it drops of forever. Therefore, let's cap it when 5 sizes in
  // a row have negative power outputs
  if (max.power < 0) { negativeCounter++ }
  if (negativeCounter >= 5) {
    break
  }
}

const bestOfAnySize = anySizeSquares.sort(dynamicSort('-power'))[0]
const answer2 = bestOfAnySize.coords
answer2.push(bestOfAnySize.size)

console.log('-- Part 2 --')
console.log(`Answer: ${answer2}`)
