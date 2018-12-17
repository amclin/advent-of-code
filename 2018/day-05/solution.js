const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { reducePolymer } = require('./polymer')

fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err

  data = data.trim()

  let answer = reducePolymer(data).length
  let answer2 = undefined

  console.log(`-- Part 1 --`)
  console.log(`Answer: ${answer}`)
  console.log(`-- Part 2 --`)
  console.log(`Answer: ${answer2}`)
})
