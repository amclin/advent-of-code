
const parse = (data) => {
  return data.split('\n').map((row) => {
    return row.split('')
  })
}

const format = (seatMap) => {
  return seatMap.map((row) => row.join('')).join('\n')
}

const occupiedNearby = ({ x, y, seatMap }) => {
  let temp = ''

  for (let row = y - 1; row <= y + 1; row++) {
    for (let col = x - 1; col <= x + 1; col++) {
      try {
        temp += seatMap[row][col] || '-'
      } catch {
        temp += '-'
      }
    }
    temp += '\n'
  }
  const occupied = (temp.match(/#/g) || []).length

  // console.debug(temp)
  // console.debug(`------${occupied}------------`)
  return occupied
}

const advance = (seatMap) => {
  return seatMap.map((row, y) => {
    return row.map((col, x) => {
      return update({ x, y, seatMap })
    })
  })
}

const update = ({ x, y, seatMap }) => {
  let next = seatMap[y][x]
  switch (seatMap[y][x]) {
    case '.':
      // Floor (.) never changes; seats don't move, and nobody sits on the floor.
      next = seatMap[y][x]
      break
    case 'L':
      // If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
      if (occupiedNearby({ x, y, seatMap }) === 0) {
        next = '#'
      }
      break
    case '#':
      // If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
      // We subtract 1 so we don't count the target seat
      if (occupiedNearby({ x, y, seatMap }) - 1 >= 4) {
        next = 'L'
      }
      break
    default:
      // Otherwise, the seat's state does not change.
      next = seatMap[y][x]
  }

  return next
}

module.exports = {
  format,
  parse,
  advance
}
