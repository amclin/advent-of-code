const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { findWireIntersections, getClosesetIntersection } = require('./wires')
const { linesToArray } = require('../../2018/inputParser')

fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err

  data = linesToArray(data.trim())

  const answer = getClosesetIntersection(findWireIntersections(data)).distance

  console.log('-- Part 1 --')
  console.log(`Answer: ${answer}`)
})
