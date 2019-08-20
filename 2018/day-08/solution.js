const { loadInput } = require('./helpers')
const {
  parseData,
  sumMetadata
} = require('./license')

const init = (data) => {
  data = parseData(data)
  const answer = sumMetadata(data)
  const answer2 = data.value
  console.log('-- Part 1 --')
  console.log(`Answer: ${answer}`)
  console.log('-- Part 2 --')
  console.log(`Answer: ${answer2}`)
}

loadInput(init)
