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
  for (let gen = 1; gen <= 20; gen++) {
    plantTracker.advance()
  }
  console.log('Generating 20 generations from the input looks like this:')
  plantTracker.display()
  const answer = plantTracker.getCheckSum(20)
  const answer2 = ''

  console.log(`-- Part 1 --`)
  console.log(`Answer: ${answer}`)
  console.log(`-- Part 2 --`)
  console.log(`Answer: ${answer2}`)
}

loadInput(init)
