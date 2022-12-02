const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { inputToArray, linesToArray } = require('../../2018/inputParser')
const { scoreMatch, strategizeMatch } = require('./rochambeau')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = linesToArray(initData.trim()).map(inputToArray)

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const data = resetInput()
    return scoreMatch(data)
  }

  const part2 = () => {
    const data = resetInput()
    return strategizeMatch(data)
  }
  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
