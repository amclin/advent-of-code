const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { linesToArray } = require('../../2018/inputParser')
const { findLocalLows, flow } = require('./basins')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = linesToArray(initData.trim())

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const data = resetInput().join('\n')
    const lows = findLocalLows(data)
    console.debug(lows.length)
    // risk profiles is the sum of each height + 1, which is the same as adding the count of lows
    return lows.reduce((a, b) => a + b) + lows.length
  }

  const part2 = () => {
    const data = resetInput()
    let map = {
      coords: [...Array(data.length)].map(() => Array(data[0].length)), // allocate a map
      basins: [0] // fake first basin with no area to avoid having to figure out JS loose-type false/truthy and <> bullshit
    }

    for (let x = 0; x < data[0].length; x++) {
      for (let y = 0; y < data.length; y++) {
        console.debug(`Starting flow trace at ${x},${y}`)
        map = flow(x, y, map, data, 9).map // 9 is a magic number for assuming we start with fresh drains
      }
    }

    console.debug(`Found ${map.basins.length} basins.`)

    // Multiply the area of the 3 largest basins
    return map.basins.sort((a, b) => a - b)
      .slice(map.basins.length - 3)
      .reduce((a, b) => a * b)
  }
  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
