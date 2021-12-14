/**
 *
 * @param {*} data Existing coordinate data
 * @param {*} x1 start of line horizontal point
 * @param {*} y1 start of line vertical point
 * @param {*} x2 end of line horizontal point
 * @param {*} y2 end of line vertical point
 * @returns
 */
const chartLine = (data, x1, y1, x2, y2, allowDiaganol = false) => {
  let x = x1
  let y = y1
  if (y1 === y2) {
    // chart horizontal line
    console.debug(`Drawing horizontal line ${x1},${y1} to ${x2},${y2}`)
    const xDir = (x2 > x1) ? 1 : -1
    while (x !== x2) {
      data[y][x]++
      x += xDir
    }
    data[y][x]++ // coordinates are inclusive
  } else if (x1 === x2) {
    // chart vertical line
    console.debug(`Drawing vertical line ${x1},${y1} to ${x2},${y2}`)
    const yDir = (y2 > y1) ? 1 : -1
    while (y !== y2) {
      data[y][x]++
      y += yDir
    }
    data[y][x]++ // coordinates are inclusive
  } else if (allowDiaganol) {
    // chart diagonal line
    console.debug(`Drawing diagonal line ${x1},${y1} to ${x2},${y2}`)
    const xDir = (x2 > x1) ? 1 : -1
    const yDir = (y2 > y1) ? 1 : -1
    while (x !== x2 && y !== y2) {
      data[y][x]++
      x += xDir
      y += yDir
    }
    data[y][x]++ // coordinates are inclusive
  } else {
    console.debug(`Skipping diagonal line ${x1},${y1} to ${x2},${y2}`)
  }
  return data
}

/**
 * Count the number of points with more than [threshold] intersecting lines
 * @param {*} data
 * @param {*} threshold
 * @returns
 */
const countIntersections = (data, threshold) => {
  return data.reduce((total, row) => {
    total += row.filter((cell) => (cell >= threshold)).length
    return total
  }, 0)
}

/**
 * Creates a visible map from the data
 * @param {*} data
 * @returns string
 */
const render = (data) => {
  return data
    .map((row) => row.join(''))
    .join('\n')
    .replace(/0/gi, '.')
}

/**
 * Parses the provided data rules into useable lines
 * @param string data
 * @returns Array
 */
const parseLines = (data) => {
  return data.split('\n')
    .map(
      (row) => row.replace(' -> ', ',')
        .split(',')
        .map((val) => parseInt(val))
    )
}

module.exports = {
  render,
  chartLine,
  countIntersections,
  parseLines
}
