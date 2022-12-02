const fs = require('fs')
const path = require('path')
const { findElfWithMost, parseCalorieData, sortElvesByCalories } = require('./calories')
const filePath = path.join(__dirname, 'input.txt')
// const { inputToArray } = require('../../2018/inputParser')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  // initData = inputToArray(initData.trim())

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return parseCalorieData(JSON.parse(JSON.stringify(initData)))
  }

  const part1 = () => {
    const data = resetInput()
    const elfWithMost = findElfWithMost(data)
    return elfWithMost.reduce((a, b) => a + b) // Tally calories for elf with most
  }

  const part2 = () => {
    const data = resetInput()
    const elves = sortElvesByCalories(data)
    let results = 0
    for (let x = 0; x < 3; x++) { // iterate through the top 3 results
      results += elves[x].reduce((a, b) => a + b, 0) // sum the calorie counts
    }
    return results
  }
  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
