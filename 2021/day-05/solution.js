const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { parseLines, chartLine, countIntersections } = require('./vents')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = parseLines(initData.trim())

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const task = (supportDiagonals) => {
    const data = resetInput()

    // Allocate map
    const max = data.reduce((max, curr) => {
      max[0] = Math.max(max[0], curr[0], curr[2]) // find the maximum X value
      max[1] = Math.max(max[1], curr[1], curr[3]) // find the maximum Y value
      return max
    }, [0, 0])

    let map = [...new Array(max[1] + 1)].map(() => {
      return [...new Array(max[0] + 1)].map(() => 0)
    })

    data.forEach((line) => {
      map = chartLine(map, ...line, supportDiagonals)
    })

    return countIntersections(map, 2)
  }

  const part1 = () => {
    return task(false)
  }

  const part2 = () => {
    return task(true)
  }

  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
