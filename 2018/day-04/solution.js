const {
  findLaziestGuards,
  findSleepiestTimes,
  processActivities,
  sortActivities
} = require('./guards')
const {
  dynamicSort,
  loadInput,
  parseLog
} = require('./helpers')

const init = (data) => {
  data = parseLog(data.join('\n'))
  data = sortActivities(data)
  data = processActivities(data)
  let guardsBySleepTime = findLaziestGuards(data)
  const laziestGuard = guardsBySleepTime[0].id
  const sleepiestTime = findSleepiestTimes(laziestGuard, data)[0].minute

  const answer = laziestGuard * sleepiestTime

  // Sort the guards most likely to fall asleep on a repeated minute
  guardsBySleepTime = guardsBySleepTime.map((guard) => {
    if (guard.asleep > 0) {
      const sleepiestTimes = findSleepiestTimes(guard.id, data)
      guard.sleepiestMinute = sleepiestTimes[0].minute
      guard.sleepiestMinuteQty = sleepiestTimes[0].qty
    } else {
      guard.sleepiestTime = 0
      guard.sleepiestMinuteQty = 0
    }
    return guard
  }).sort(dynamicSort('-sleepiestMinuteQty'))
  const mostRegularGuard = guardsBySleepTime[0].id
  const mostRegularGuardsMostRegularMinute = guardsBySleepTime[0].sleepiestMinute
  const answer2 = mostRegularGuard * mostRegularGuardsMostRegularMinute

  console.log(`-- Part 1 --`)
  console.log(`Laziest Guard: ${laziestGuard}`)
  console.log(`Sleepiest time: ${sleepiestTime}`)
  console.log(`Answer: ${answer}`)
  console.log(`-- Part 2 --`)
  console.log(`Most Regular Guard: ${mostRegularGuard}`)
  console.log(`Most Regular Minute for same Guard: ${mostRegularGuardsMostRegularMinute}`)
  console.log(`Answer: ${answer2}`)
}

loadInput(init)
