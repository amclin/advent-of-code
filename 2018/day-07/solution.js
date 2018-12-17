const { loadInput } = require('./helpers')
const {
  parseEntry,
  sortInstructions
} = require('./steps')

const init = (data) => {
  data = data.map(parseEntry)
  // const answer = sortInstructions(data).map((el) => el.id).join('')
  const answer = sortInstructions(data).join('')
  console.log(`-- Part 1 --`)
  console.log(`Answer: ${answer}`)
  console.log(`-- Part 2 --`)
  // console.log(`Answer: ${answer2}`)
}

loadInput(init)
