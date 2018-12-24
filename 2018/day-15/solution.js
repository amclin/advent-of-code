const { loadInput } = require('./helpers')
const { Cave } = require('./caves')

const init = (data) => {
  const cave = new Cave(data)
  while (cave.outcome === null) {
    cave.advance()
  }
  // Get total hitpoints of winning army X the number of completed rounds
  const answer = cave.rounds * cave.units.filter((unit) => unit.type === cave.outcome).reduce((hp, unit) => hp + unit.hp, 0)

  const answer2 = ''
  console.log(`-- Part 1 --`)
  console.log(`Answer: ${answer}`)
  console.log(`-- Part 2 --`)
  console.log(`Answer: ${answer2}`)
}

loadInput(init)
