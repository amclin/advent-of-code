const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { parse, advance, format } = require('./seating')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = initData.trim()

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    let data = resetInput()
    let last = 0
    let curr = 1
    while (curr !== last) {
      last = curr
      data = format(advance(parse(data)))
      // count the current occupied seats
      curr = (data.match(/#/g) || []).length
    }
    return curr
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
