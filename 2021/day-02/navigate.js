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

const navigate = (location, route) => {
  let position = location
  route.forEach(instruction => {
    position = move(position, instruction[0], instruction[1])
  })
  return position
}

module.exports = {
  move,
  navigate
}
