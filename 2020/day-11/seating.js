const parse = (data) => {
  return data.split('\n').map((row) => {
    return row.split('')
  })
}

const format = (seatMap) => {
  return seatMap.map((row) => row.join('')).join('\n')
}

const occupiedLineOfSite = ({ x, y, seatMap }) => {
  let occupied = 0
  const look = ({ lookX, lookY, dirX, dirY }) => {
    if (lookY < 0 || lookY >= seatMap.length) {
      // exceeded rows space
      return 'x'
    }
    if (lookX < 0 || lookX >= seatMap[0].length) {
      // exceeded column space
      return 'x'
    }
    // Find the first seat in the direction, recursively
    if (seatMap[lookY][lookX] !== '.') {
      return seatMap[lookY][lookX]
    }

    // Recursively look in the next seat in this direction
    return look({ lookX: lookX + dirX, lookY: lookY + dirY, dirX, dirY })
  }

  // 8 compass point directions
  for (let dirX = -1; dirX <= 1; dirX++) {
    for (let dirY = -1; dirY <= 1; dirY++) {
      if (look({ lookX: x + dirX, lookY: y + dirY, dirX, dirY }) === '#') {
        occupied++
      }
    }
  }

  return occupied
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

const advance = (seatMap, rules) => {
  return seatMap.map((row, y) => {
    return row.map((col, x) => {
      return update({ x, y, seatMap, rules })
    })
  })
}

const update = ({ x, y, seatMap, rules = 'proximity' }) => {
  let leaveThreshold = 4
  let processor = occupiedNearby
  if (rules === 'visibility') {
    leaveThreshold = 5
    processor = occupiedLineOfSite
  }

  let next = seatMap[y][x]
  switch (seatMap[y][x]) {
    case '.':
      // Floor (.) never changes; seats don't move, and nobody sits on the floor.
      next = seatMap[y][x]
      break
    case 'L':
      // If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
      if (processor({ x, y, seatMap }) === 0) {
        next = '#'
      }
      break
    case '#':
      // If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
      // We subtract 1 so we don't count the target seat
      if (processor({ x, y, seatMap }) - 1 >= leaveThreshold) {
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
  advance,
  occupiedLineOfSite
}
