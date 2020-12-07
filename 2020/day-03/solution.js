const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { linesToArray } = require('../../2018/inputParser')
const { countTreesOnRoute } = require('./airportRoute')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = linesToArray(initData.trim())

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const data = resetInput()
    return countTreesOnRoute({ map: { rows: data } })
  }

  const part2 = () => {
    const data = resetInput()
    const slopes = [
      [1, 1],
      [3, 1], // Same as default
      [5, 1],
      [7, 1],
      [1, 2]
    ]
    // Multiple the results of multiple slopes
    return slopes.reduce((itr, slope) => {
      return itr * countTreesOnRoute({
        map: { rows: data },
        slope
      })
    }, 1)
  }
  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
