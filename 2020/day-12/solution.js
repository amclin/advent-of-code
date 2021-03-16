const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { inputToArray } = require('../../2018/inputParser')
const { distance } = require('../../2018/day-06/coordinates')
const { route } = require('./ferry')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = inputToArray(initData.trim())

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const instructions = resetInput()
    const destination = route({ instructions })
    return distance({ x: 0, y: 0 }, destination)
  }

  const part2 = () => {
    const instructions = resetInput()
    const destination = route({ instructions, mode: 'waypoint' })
    return distance({ x: 0, y: 0 }, destination)
  }
  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
