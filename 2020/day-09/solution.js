const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { inputToArray } = require('../../2018/inputParser')
const { findInvalid, findWeaknessRange } = require('./xmasEncryption')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = inputToArray(initData.trim()).map(Number)

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const data = resetInput()
    return findInvalid(data, 25)
  }

  const part2 = () => {
    const data = resetInput()
    const weakness = findWeaknessRange(data, answers[0])
    const arrMax = Math.max(...weakness)
    const arrMin = Math.min(...weakness)
    return arrMin + arrMax
  }

  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
