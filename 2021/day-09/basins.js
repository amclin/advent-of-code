const findLocalLows = (data) => {
  const lows = []
  const rows = data.split('\n')
  let checked = 0

  const isLow = (val, col, row) => {
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

  rows.forEach((row, rowIdx) => {
    for (let c = 0; c < row.length; c++) {
      const cell = parseInt(row[c])
      if (isLow(cell, c, rowIdx)) {
        lows.push(cell)
        console.debug(`Found low at ${c},${rowIdx}: ${cell}`)
      }
      checked++
    }
  })

  console.debug(`Checked ${checked} cells`)
  return lows
}

module.exports = {
  findLocalLows
}
