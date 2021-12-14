const move = (location, direction, distance) => {
  const result = location
  switch (direction) {
    case 'forward':
      result.x += distance
      break
    case 'up':
      result.d -= distance
      break
    case 'down':
      result.d += distance
      break
    default:
      throw new Error(`Direction ${direction} is unsupported`)
  }
  return result
}

const navigate = (location, route, useAiming = false) => {
  let position = location
  route.forEach(instruction => {
    if (useAiming) {
      position = aimedMove(position, instruction[0], instruction[1])
    } else {
      position = move(position, instruction[0], instruction[1])
    }
  })
  return position
}

const aimedMove = (location, direction, distance) => {
  const result = location
  switch (direction) {
    case 'forward':
      result.x += distance
      result.d += (distance * location.a)
      break
    case 'up':
      result.a -= distance
      break
    case 'down':
      result.a += distance
      break
    default:
      throw new Error(`Direction ${direction} is unsupported`)
  }
  return result
}

module.exports = {
  move,
  navigate,
  aimedMove
}
