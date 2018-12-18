const { loadInput } = require('./helpers')
const {
  executeInstructions,
  getDependencies,
  parseEntry,
  sortInstructions
} = require('./steps')

const init = (data) => {
  data = data.map(parseEntry)
  const answer = sortInstructions(data).join('')
  const answer2 = executeInstructions(getDependencies(), 5, 60)
  console.log(`-- Part 1 --`)
  console.log(`Answer: ${answer}`)
  console.log(`-- Part 2 --`)
  console.log(`Answer: ${answer2}`)
}

loadInput(init)
