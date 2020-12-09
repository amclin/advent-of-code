const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { linesToArray } = require('../../2018/inputParser')
const { parseRule, findAllowedOuter, countInner } = require('./bagRules')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = linesToArray(initData.trim())

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const rules = resetInput().map(parseRule)
    return Object.keys(findAllowedOuter(
      rules,
      'shiny gold bag'
    )).length
  }

  const part2 = () => {
    const rules = resetInput()
    return Object.values(
      countInner(rules.map(parseRule), 'shiny gold bag')
    ).reduce((a, b) => a + b, 0)
  }

  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
