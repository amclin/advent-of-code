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
  let plantTracker = new Plants(initialState, rules)
  const generations = 20
  for (let gen = 1; gen <= generations; gen++) {
    plantTracker.advance()
  }
  console.log(`Generating ${generations} generations from the input looks like this:`)
  plantTracker.display()
  const answer = plantTracker.getCheckSum(generations)

  // Start for part 2
  const generations2 = 500
  for (let gen = generations + 1; gen <= generations2; gen++) {
    plantTracker.advance()
  }
  console.log(`Generating ${generations2} generations from the input looks like this:`)
  plantTracker.display()

  // 500 generations takes about 30s, so running 50B generations isn't possible. It's
  // clear looking at the log there's a "Game of Life"-style glider.
  // See output/500-generations.txt and output/500-generations.png

  const answer2 = ''

  console.log(`-- Part 1 --`)
  console.log(`Answer: ${answer}`)
  console.log(`-- Part 2 --`)
  console.log(`Answer: ${answer2}`)
}

loadInput(init)
