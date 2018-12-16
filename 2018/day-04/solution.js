const guards = require('./guards')
const helpers = require('./helpers')

const data = helpers.loadInput((res) => helpers.parseLog())
const laziestGuard = guards.getLaziestGuards(data)[0]
const answer = guards.findSleepiestTimes(laziestGuard)
const answer2 = undefined

console.log(`-- Part 1 --`)
console.log(`Answer: ${answer}`)
console.log(`-- Part 2 --`)
console.log(`Answer: ${answer2}`)
