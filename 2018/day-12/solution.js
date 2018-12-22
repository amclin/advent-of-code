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
  // This probably is reflected in a pattern in the checksum.
  let prevCheckSum = 0
  let prevDelta = 0
  const stableThreshold = 5 // The number of sequentially identical deltas necessary to determine stabilization
  const stableDeltas = Array(stableThreshold).fill(0)
  let stableGeneration = 0
  let stableCheckSum = 0
  for (let gen = 0; gen <= generations2; gen++) {
    const checkSum = plantTracker.getCheckSum(gen)
    const delta = checkSum - prevCheckSum
    console.log(`Generation ${gen} checksum: ${plantTracker.getCheckSum(gen)} which is Δ of ${delta})`)

    // When delta matches previous generation, we may have reached stabilization
    if (delta === prevDelta) {
      stableDeltas.shift()
      stableDeltas.push(delta)
      // Reached true stable point when there are N deltas in a row that are the same.
      if (stableDeltas.filter((Δ) => Δ === delta).length === stableDeltas.length) {
        stableCheckSum = checkSum
        stableGeneration = gen
        break
      }
    }
    prevCheckSum = checkSum
    prevDelta = delta
  }
  console.log(`At generation ${stableGeneration} the Δ is ${stableDeltas[0]} and the checksum is ${stableCheckSum}.`)
  // Calculate the checksum for 50B generations (minus the generation we're already at)
  const answer2 = (stableDeltas[0] * (50000000000 - stableGeneration)) + stableCheckSum

  console.log(`-- Part 1 --`)
  console.log(`Answer: ${answer}`)
  console.log(`-- Part 2 --`)
  console.log(`Answer: ${answer2}`)
}

loadInput(init)
