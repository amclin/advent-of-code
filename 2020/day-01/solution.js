const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { validateRecords } = require('./expenseValidation')
const { inputToArray } = require('../../2018/inputParser')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = inputToArray(initData.trim())
    .map(el => Number(el))

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const data = resetInput()
    return validateRecords(data) // Find 2 results for 2020
      .reduce((total, res) => total * res, 1)
  }

  const part2 = () => {
    const data = resetInput()
    return validateRecords(data, undefined, 3) // Find 3 results for 2020
      .reduce((total, res) => total * res, 1)
  }
  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
