const {
  loadInput
} = require('./helpers')
const {
  Plants
} = require('./plants')

// Initial state from my puzzle input
const initialState = '#...#...##..####..##.####.#...#...#.#.#.#......##....#....######.####.##..#..#..##.##..##....#######'

const init = (data) => {
  const rules = data
  const plantTracker = new Plants(initialState, rules)
  const generations = 20
  for (let gen = 1; gen <= generations; gen++) {
    plantTracker.advance()
  }
  console.log(`Generating ${generations} generations from the input looks like this:`)
  plantTracker.display()
  const answer = plantTracker.getCheckSum(generations)
  const answer2 = ''

  console.log(`-- Part 1 --`)
  console.log(`Answer: ${answer}`)
  console.log(`-- Part 2 --`)
  console.log(`Answer: ${answer2}`)
}

loadInput(init)
