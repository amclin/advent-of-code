const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { calculateFuel, calculateFuelRecursively } = require('./fuel-calculator')
const { parseData } = require('../../../2018/inputParser')

fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err

  data = parseData(data.trim())

  const answer = data.reduce((prev, cur) => {
    return prev + calculateFuel(parseInt(cur))
  }, 0)

  console.log('-- Part 1 --')
  console.log(`Answer: ${answer}`)

  const answer2 = data.reduce((prev, cur) => {
    return prev + calculateFuelRecursively(parseInt(cur))
  }, 0)

  console.log('-- Part 2 --')
  console.log(`Answer: ${answer2}`)
})
