const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { linesToArray } = require('../../2018/inputParser')
const { lintAll } = require('./linting')
const { scoreAutocomplete, findMiddleScore } = require('./scoring')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = linesToArray(initData.trim())

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const data = resetInput()
    const points = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137
    }

    const errors = lintAll(data)

    // Score the premature closure errors
    return errors.filter((err) => !!err.char)
      .reduce((total, error) => total + points[error.found], 0)
  }

  const part2 = () => {
    const data = resetInput()
    // find the incomplete line errors
    const errors = lintAll(data).filter((err) => !!err.suggestion)

    const scores = errors.map((err) => scoreAutocomplete(err.suggestion))

    return findMiddleScore(scores)
  }
  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
