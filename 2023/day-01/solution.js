const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { inputToArray } = require('../../2018/inputParser')
const { checksumSet } = require('./checksum')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = inputToArray(initData.trim())

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const data = resetInput()
    return checksumSet(data)
  }

  const part2 = () => {
    const data = resetInput()
    return checksumSet(data, false, true)
  }
  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
