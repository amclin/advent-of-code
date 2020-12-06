const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const { validateRecords } = require('./expenseValidation')
const { inputToArray } = require('../../2018/inputParser')

fs.readFile(filePath, { encoding: 'utf8' }, (err, initData) => {
  if (err) throw err

  initData = inputToArray(initData.trim())
    .map(el => Number(el))

  const resetInput = () => {
    // Deep copy to ensure we aren't mutating the original data
    return JSON.parse(JSON.stringify(initData))
  }

  const part1 = () => {
    const data = resetInput()
    const results = validateRecords(data)

    return results[0] * results[1]
  }

  // const part2 = ({ target, maxNoun, maxVerb }) => {
  //   // Helper for running the program with specified noun and verb inputs
  //   const tryProgram = ({
  //     noun,
  //     verb
  //   }) => {
  //     const data = resetInput()
  //     data[1] = noun
  //     data[2] = verb
  //     runProgram({ data })
  //     console.debug(`Running with noun:${noun} and verb:${verb} produces ${data[0]}`)
  //     return Number(data[0])
  //   }

  //   // Manipulate and loop through attempts for Part 2
  //   let noun = -1
  //   while (noun <= maxNoun) {
  //     let verb = -1
  //     noun++
  //     while (verb <= maxVerb) {
  //       verb++
  //       const output = tryProgram({
  //         noun,
  //         verb
  //       })
  //       // Break the search loop on success
  //       if (output === target) {
  //         return 100 * noun + verb
  //       }
  //     }
  //   }
  // }

  const answers = []
  answers.push(part1())
  // answers.push(part2())

  answers.forEach((ans, idx) => {
    console.info(`-- Part ${idx + 1} --`)
    console.info(`Answer: ${ans}`)
  })
})
