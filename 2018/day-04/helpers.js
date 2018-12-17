const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')
const linesToArray = require('../inputParser').linesToArray

const loadInput = (callback) => {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) throw err

    const list = linesToArray(data)
    if (typeof callback === 'function') {
      callback(list)
    }
  })
}

/**
 * Filter for use in Array.sort() that allows you to specify the key to sort on
 * @param {String} property key to use for the sort
 */
const dynamicSort = (property) => {
  let sortOrder = 1
  // use - as prefix to indicate reverse sort
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }

  return (a, b) => {
    let result = 0
    if (a[property] < b[property]) { result = -1 }
    if (a[property] > b[property]) { result = 1 }
    return result * sortOrder
  }
}

/**
 * Filter for use in Array.sort() that allows you to specify mutlipe keys to sort on
 * @param {...String} property Two or more property names to sort by
 */
const dynamicSortMultiple = (...keys) => {
  return (a, b) => {
    let i = 0
    let result = 0
    let numberOfProperties = keys.length

    while (result === 0 && i < numberOfProperties) {
      result = dynamicSort(keys[i])(a, b)
      i++
    }
    return result
  }
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
  data.hour = parseInt(
    res[0].split(':')[0]
  )
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
  dynamicSort,
  dynamicSortMultiple,
  loadInput,
  parseLog,
  parseLogEntry
}
