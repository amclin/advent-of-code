const isLow = (val, col, row, rows) => {
  // Collect points in each cardinal direction
  const points = []
  // TODO: If supporting diagonal checks, use this logic instead to loop
  // for (let x = -1; x <= 1; x++) {
  //   for (let y = -1; y <= 1; y++) {
  //     if(x != 0 && y != 0)
  //     if(rows[row + y] && rows[row + y][col + x]
  //   }
  // }
  if (rows[row - 1] && rows[row - 1][col]) { points.push(parseInt(rows[row - 1][col])) }
  if (rows[row + 1] && rows[row + 1][col]) { points.push(parseInt(rows[row + 1][col])) }
  if (rows[row] && rows[row][col - 1]) { points.push(parseInt(rows[row][col - 1])) }
  if (rows[row] && rows[row][col + 1]) { points.push(parseInt(rows[row][col + 1])) }

  // NOTE - if the value is the same as a neighbor,
  // that isn't counted as a low (even though together, they can be a low)
  // ... this might be a concern for part 2 ....
  return (val < Math.min(...points)) // value should be lower than any other points
}

const findLocalLows = (data) => {
  const lows = []
  const rows = data.split('\n')
  let checked = 0

  rows.forEach((row, rowIdx) => {
    for (let c = 0; c < row.length; c++) {
      const cell = parseInt(row[c])
      if (isLow(cell, c, rowIdx, rows)) {
        lows.push(cell)
        console.debug(`Found low at ${c},${rowIdx}: ${cell}`)
      }
      checked++
    }
  })

  console.debug(`Checked ${checked} cells`)
  return lows
}

const flow = (col, row, map, data, source) => {
  // Don't test invalid points
  if (col < 0 || col >= map.coords[0].length) {
    console.debug(`${col},${row} is out of bounds`)
    // Exceeds map horizontally
    return {
      map,
      result: false
    }
  }
  if (row < 0 || row >= map.coords.length) {
    console.debug(`${col},${row} is out of bounds`)
    // Exceeds map vertically
    return {
      map,
      result: false
    }
  }

  // If the point is a peak, register and don't continue
  if (parseInt(data[row][col]) === 9) {
    console.debug(`${col},${row} is a peak.`)
    // Peaks aren't part of basins
    map.coords[row][col] = 'p'
    return {
      map,
      result: false
    }
  }

  // If the point is higher than the source, we can't drain
  // BIG ASSUMPTION here about equal-height points
  if (data[row][col] >= source) {
    console.debug(`${col},${row} is higher (${data[row][col]} >= ${source}). Water can't flow uphill.`)
    return {
      map,
      result: false
    }
  }

  // If the point already mapped to a basin, don't recalculate its flow
  if (map.coords[row] && map.coords[row][col]) {
    console.debug(`${col},${row} is already known to be in basin ${map.coords[row][col]}`)
    return {
      map,
      result: map.coords[row][col]
    }
  }

  // If we've reached a low point, stop tracing
  if (isLow(data[row][col], col, row, data)) {
    console.debug(`${col},${row} is a low point in basin.`)
    // register a basin with an area of 1
    map.basins.push(1)
    // mark the low point to the basin
    map.coords[row][col] = map.basins.length - 1
    console.debug(`registered basin ${map.basins.length - 1}`)
    return {
      map,
      result: map.coords[row][col]
    }
    // HUGE ASSUMPTION that each basin only has 1 low point
  }

  console.debug(`checking where point ${col},${row} drains to`)

  // Check the next points in each cardinal direction
  const drains = []
  let result = false
  result = flow(col + 1, row, map, data, data[row][col]) // right
  map = result.map
  drains.push(result.result)
  result = flow(col - 1, row, map, data, data[row][col]) // left
  map = result.map
  drains.push(result.result)
  result = flow(col, row - 1, map, data, data[row][col]) // up
  map = result.map
  drains.push(result.result)
  result = flow(col, row + 1, map, data, data[row][col]) // down
  map = result.map
  drains.push(result.result)

  const results = drains.filter((c) => c !== false)
  if (results.length > 1) {
    console.warn('Point has more than one possilbe drain.')
    const uniqueDrains = [...new Set(results)]
    if (uniqueDrains.length > 1) {
      console.debug(drains)
      throw new Error('Point drains into multiple drains. Data might be bad.')
    }
    // Otherwise, all drains go to the same basin, so that's the same as having 1 drain
  }
  if (results.length === 0) {
    console.debug(drains)
    throw new Error('Point is not the low, but has no drains. Data might be bad.')
  }

  const basin = parseInt(results[0])

  // Mark the point as belonging to the basin it drains into
  map.coords[row][col] = basin
  // Track the area of the basin so we don't have to recalculate it later
  map.basins[basin]++

  // return the findings recursively
  return {
    map,
    result: map.coords[row][col]
  }
}

module.exports = {
  findLocalLows,
  flow
}
