const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { runProgram } = require('./intcodeParser')
const { inputToArray } = require('../../2018/inputParser')

fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err

  data = inputToArray(data.trim())
  // Manipulate input per puzzle instructions for Part 1
  data[1] = 12
  data[2] = 2

  runProgram({ data })
  const answer = data[0]

  console.log('-- Part 1 --')
  console.log(`Answer: ${answer}`)
})
