const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { parseData } = require('../../2018/inputParser')
const { school } = require('./fish')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = parseData(initData.trim())

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const data = resetInput()
    school.state = data
    // Advance the designated time
    for (let x = 0; x < 80; x++) {
      school.advance()
    }
    // Count how many fish we have
    return school.state.length
  }

  const part2 = () => {
    const data = resetInput()
    console.debug(data)
    return 'No answer yet'
  }
  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
