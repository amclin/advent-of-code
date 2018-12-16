const helpers = require('./helpers')

let _data = {}

const getData = (key) => _data[key]
const setData = (key) => _data[key]

/**
 * Searches the list of daily activity to rank lazy guards
 * @param {Array} days List of day sleeping patterns as returned by processActivities()
 */
const findLaziestGuards = (days) => {
  // Get a list of guards with their sleeping times
  let guards = days.filter((day, idx, arr) => {
    return (arr.indexOf(day) === idx) // filters a list of unique guard IDs
  }).map((day) => {
    return { id: day.guard } // Makes a list of guard objects
  }).map((guard) => {
    guard.asleep = days.filter((day, idx, arr) => {
      return (day.guard === guard.id) // find the days this guard
    }).reduce((acc, day) => acc + day.activity.count('#')) // count the time the guard was asleep
    return guard
  })

  // sort the list with the laziest guard first
  return guards.sort(helpers.dynamicSort('-asleep'))
}

const processActivities = (data) => {
  // we'll store asleep as (#) and awake as (.)
  const statesMap = {
    'begins shift': '.',
    'wakes up': '.',
    'falls asleep': '#'
  }

  // store variables iterated through the loop
  let store = {
    date: data[0].date,
    hour: data[0].hour,
    minute: data[0].minute,
    guard: data[0].guard,
    state: statesMap[data[0].activity]
  }

  // Build up the results set
  let results = [{
    date: store.date,
    guard: store.guard,
    activity: ''
  }]

  // Iterate through events to log activities
  data.forEach((event, idx) => {
    // Crossed into new day
    if (event.date !== store.date) {
      // Finish out the open pattern
      let prevAct = results[results.length - 1].activity
      if (prevAct.length < 60) {
        results[results.length - 1].activity += store.state.repeat(60 - prevAct.length)
      }

      // Start a new activity pattern
      // The new activity pattern should fill up to the current minute, or completely fill
      // when the new event is in a later hour
      let len = (event.hour === 0) ? event.minute : 60
      results.push({
        date: event.date,
        guard: event.guard || store.guard,
        activity: (len > 0) ? store.state.repeat(len) : ''
      })
    }

    // Event is the same day as the previous event
    if (event.date === store.date) {
      let act = results[results.length - 1].activity
      // Populate the previous state up to the current minute or up to the full hour
      // when it's no longer the 0 hour
      let len = (event.hour === 0) ? event.minute - act.length : 60 - act.length

      if (len > 0 && len < 60) {
        results[results.length - 1].activity += store.state.repeat(len)
      }
    }

    // Update tracker with new event
    store.state = statesMap[event.activity]
    store.guard = event.guard || store.guard
    store.date = event.date
    store.hour = event.hour
    store.minute = event.minute

    // Mark the current event in the current activity pattern
    if (event.hour === 0) {
      results[results.length - 1].activity += store.state
    }
  })

  // Finish up last entry by padding it out to the full width
  results[results.length - 1].activity += store.state.repeat(60 - results[results.length - 1].activity.length)

  console.log('Resulting activity chart:')
  results.forEach((res) => {
    console.log(`${res.date} ${res.guard} ${res.activity}`)
  })

  return results
}

const sortActivities = (data) => {
  return data.sort(helpers.dynamicSortMultiple('date', 'hour', 'minute'))
}

module.exports = {
  findLaziestGuards,
  getData,
  processActivities,
  setData,
  sortActivities
}
