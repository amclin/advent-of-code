const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { runProgram } = require('./intcodeParser')
const { inputToArray } = require('../../2018/inputParser')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = inputToArray(initData.trim())

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const data = resetInput()
    // Manipulate input per puzzle instructions for Part 1
    data[1] = 12
    data[2] = 2
    runProgram({ data })
    return data[0]
  }

  const part2 = ({ target, maxNoun, maxVerb }) => {
    // Helper for running the program with specified noun and verb inputs
    const tryProgram = ({
      noun,
      verb
    }) => {
      const data = resetInput()
      data[1] = noun
      data[2] = verb
      runProgram({ data })
      console.debug(`Running with noun:${noun} and verb:${verb} produces ${data[0]}`)
      return Number(data[0])
    }

    // Manipulate and loop through attempts for Part 2
    let noun = -1
    while (noun <= maxNoun) {
      let verb = -1
      noun++
      while (verb <= maxVerb) {
        verb++
        const output = tryProgram({
          noun,
          verb
        })
        // Break the search loop on success
        if (output === target) {
          return 100 * noun + verb
        }
      }
    }
  }

  const answer1 = part1()
  const answer2 = part2({ target: 19690720, maxNoun: 99, maxVerb: 99 })

  console.log('-- Part 1 --')
  console.log(`Answer: ${answer1}`)

  console.log('-- Part 2 --')
  console.log(`Answer: ${answer2}`)
})
