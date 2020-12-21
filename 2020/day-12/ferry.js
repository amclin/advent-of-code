const parseCommand = (command) => {
  return {
    cmd: command.slice(0, 1),
    unit: Number(command.slice(1))
  }
}

const move = ({
  position = {
    x: 0,
    y: 0,
    d: 90 // Default to facing east
  },
  command
}) => {
  // Movement subfunctions
  const mv = {
    N: (u) => { // North
      position.y += u
    },
    S: (u) => { // South
      position.y -= u
    },
    E: (u) => { // East
      position.x += u
    },
    W: (u) => { // West
      position.x -= u
    },
    L: (u) => { // Turn Left
      position.d -= u
      position.d = position.d % 360
    },
    R: (u) => { // Turn Right
      position.d += u
      position.d = position.d % 360
    },
    F: (u) => { // Forward
      // TODO: replace with vector positioning of arbitrary angles
      switch (position.d) {
        case 0 :
          mv.N(u)
          break
        case 90 :
          mv.E(u)
          break
        case 180 :
          mv.S(u)
          break
        case 270 :
          mv.W(u)
          break
        default :
          console.debug('Position', position)
          console.debug('Forward', u)
          throw new Error('Non-cardinal compass direction')
      }
    }
  }

  console.debug('Received', command, position)
  const operation = parseCommand(command)
  mv[operation.cmd](operation.unit)
  return position
}

const route = ({ instructions }) => {
  return instructions.reduce(
    (position, command) => {
      console.debug('Routing position', position)
      console.debug('Routing command', command)
      return move({ position, command })
    }, { x: 0, y: 0, d: 90 }
  )
}

module.exports = {
  move,
  route
}
