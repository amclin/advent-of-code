const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { linesToArray } = require('../../2018/inputParser')
const { navigate } = require('./navigate')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = linesToArray(initData.trim()).map(command => {
    const tmp = command.split(' ')
    return [
      tmp[0],
      parseInt(tmp[1])
    ]
  })

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const data = resetInput()
    const destination = navigate({ x: 0, d: 0 }, data)
    return destination.x * destination.d
  }

  const part2 = () => {
    const data = resetInput()
    const destination = navigate({ x: 0, d: 0, a: 0 }, data, true)
    return destination.x * destination.d
  }
  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
