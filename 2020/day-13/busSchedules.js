const parseSchedule = (schedule) => {
  // Drop "x" and convert to numeric
  return schedule.split(',').filter((e) => e !== 'x').map(Number)
}

const findNext = ({ time, schedule }) => {
  const result = schedule.map((route) => {
    return {
      route,
      wait: route - (time % route)
    }
  }).sort(
    (a, b) => a.wait - b.wait
  )

  result.forEach((res) => {
    console.debug(`Wait for route ${res.route} is ${res.wait}`)
  })

  return result[0]
}

const findSequentialTime = (schedule) => {
  const routes = schedule.split(',').map((el) => (el !== 'x') ? Number(el) : el)

  let x = routes[0]
  let result = []
  // If we get an array the same length as the routes array, that means all routes matched
  while (result.length < routes.length) {
    x += routes[0]
    // loop through the list looking for el mod = idx
    let matches = true
    let i = 0
    while (i < routes.length && matches === true) {
      if (routes[i] === 'x') { // "x" doesn't matter
        i++
      } else if ((x + i) % routes[i] === 0) { // Route is sequentially +1 above the previous route
        i++
      } else {
        matches = false
      }
    }
    if (matches) { result = routes }
  }
  console.debug(`Found a match ${x}`)
  return x
}

module.exports = {
  parseSchedule,
  findNext,
  findSequentialTime
}
