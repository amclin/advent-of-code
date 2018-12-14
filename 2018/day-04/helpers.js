const linesToArray = require('../inputParser').linesToArray

const loadInput = () => {
  let data = ''
  return data
}

/**
 * Parses log and generates a structured list of log entries
 * @param {String} log multiline data to parse
 * @returns {Array} parsed results as an array of objects
 */
const parseLog = (log) => {
  const lines = linesToArray(log)
  return lines.map(parseLogEntry)
}

/**
 * Converts a line from the log into a useable object
 * @param {String} entry individual line from log
 * @returns {Object} { activity, date, guard, minute }
 */
const parseLogEntry = (entry) => {
  let data = {}
  let res = entry.split(' ')

  data.date = res.shift()
    .replace('[', '') // strip brackets from date
  data.minute = parseInt(
    res.shift()
      .replace(']', '') // strip brackets from time
      .split(':')[1] // extract minutes from time segment
  )
  // Find optional Guard ID when the segment "Guard #XX" is in the string
  if (res[0] === 'Guard') {
    res.shift()
    data.guard = parseInt(
      res.shift()
        .replace('#', '') // Strip # from guard ID
    )
  } else {
    data.guard = undefined
  }
  data.activity = res.join(' ') // Remaining words are the activity

  return data
}

module.exports = {
  loadInput,
  parseLog,
  parseLogEntry
}
