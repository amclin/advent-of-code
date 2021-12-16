const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { linesToArray } = require('../../2018/inputParser')
const { descrambleSignal, decodeSignal, parseEntry } = require('./display')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = linesToArray(initData.trim())

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(
      initData.map(
        (line) => line.split('|')
          .map((e) => e.trim())
      )
    ))
  }

  const part1 = () => {
    const data = resetInput()

    return data.map((entry) => {
      const { charCodes } = descrambleSignal(entry[0])
      return decodeSignal(charCodes, entry[1])
    }).reduce((total, signal) => {
      const search = [1, 4, 7, 8]

      // Find how many of our desired numbers are in the signal
      total += signal.filter((digit) => search.includes(digit)).length

      return total
    }, 0)
  }

  const part2 = () => {
    const data = resetInput()

    return data.map(parseEntry)
      .reduce((a, b) => a + b)
  }
  const answers = []
  answers.push(part1())
  answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
