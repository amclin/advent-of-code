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

module.exports = {
  parseSchedule,
  findNext,
  findSequentialTime: () => {}
}
