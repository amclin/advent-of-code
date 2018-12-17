const {
  findLaziestGuards,
  findSleepiestTimes,
  processActivities,
  sortActivities
} = require('./guards')
const {
  loadInput,
  parseLog
} = require('./helpers')

const init = (data) => {
  data = parseLog(data.join('\n'))
  data = sortActivities(data)
  data = processActivities(data)
  const laziestGuard = findLaziestGuards(data)[0].id
  const sleepiestTime = findSleepiestTimes(laziestGuard, data)[0].minute
  const answer = laziestGuard * sleepiestTime
  const answer2 = undefined
  console.log(`-- Part 1 --`)
  console.log(`Laziest Guard: ${laziestGuard}`)
  console.log(`Sleepiest time: ${sleepiestTime}`)
  console.log(`Answer: ${answer}`)
  console.log(`-- Part 2 --`)
  console.log(`Answer: ${answer2}`)
}

loadInput(init)
