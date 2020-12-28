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
  waypoint = {
    x: 10,
    y: 1
  },
  command,
  mode = 'normal'
}) => {
  // Movement subfunctions
  const mv = {
    normal: {
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
        // prevent negative angles
        if (position.d < 0) {
          position.d += 360
        }
      },
      R: (u) => { // Turn Right
        position.d += u
        position.d = position.d % 360
        // prevent negative angles
        if (position.d < 0) {
          position.d += 360
        }
      },
      F: (u) => { // Forward
        // TODO: replace with vector positioning of arbitrary angles
        switch (position.d) {
          case 0 :
            mv[mode].N(u)
            break
          case 90 :
            mv[mode].E(u)
            break
          case 180 :
            mv[mode].S(u)
            break
          case 270 :
            mv[mode].W(u)
            break
          default :
            console.debug('Position', position)
            console.debug('Forward', u)
            throw new Error('Non-cardinal compass direction')
        }
      }
    },
    waypoint: {
      N: (u) => { // Waypoint North
        waypoint.y += u
      },
      S: (u) => { // Waypoint South
        waypoint.y -= u
      },
      E: (u) => { // Waypoint East
        waypoint.x += u
      },
      W: (u) => { // Waypoint West
        waypoint.x -= u
      },
      L: (u) => { // Waypoint Turn Left
        // Luckily we can be lazy and not involve trig since all the rotations
        // are multiples of 90 degrees

        // Rotate around an origin since it's easier
        let oldWaypoint = {
          x: waypoint.x - position.x,
          y: waypoint.y - position.y
        }
        let tmpWaypoint = {}
        // Figure out the number of quarter-turns
        const qtr = u / 90
        // Rotate each quarter turn
        for (let r = 1; r <= qtr; r++) {
          tmpWaypoint = {
            x: oldWaypoint.y * -1,
            y: oldWaypoint.x
          }
          // Prep for next rotation
          oldWaypoint = JSON.parse(JSON.stringify(tmpWaypoint))
        }
        // Update the waypoint with the new position
        Object.assign(waypoint, {
          x: position.x + tmpWaypoint.x,
          y: position.y + tmpWaypoint.y
        })
      },
      R: (u) => { // Waypoint Turn Right
        // Rotate around an origin since it's easier
        let oldWaypoint = {
          x: waypoint.x - position.x,
          y: waypoint.y - position.y
        }
        let tmpWaypoint = {}
        // Figure out the number of quarter-turns
        const qtr = u / 90
        // Rotate each quarter turn
        for (let r = 1; r <= qtr; r++) {
          tmpWaypoint = {
            x: oldWaypoint.y,
            y: oldWaypoint.x * -1
          }
          // Prep for next rotation
          oldWaypoint = JSON.parse(JSON.stringify(tmpWaypoint))
        }
        // Update the waypoint with the new position
        Object.assign(waypoint, {
          x: position.x + tmpWaypoint.x,
          y: position.y + tmpWaypoint.y
        })
      },
      F: (u) => { // Forward
        const distance = {
          x: waypoint.x - position.x,
          y: waypoint.y - position.y
        }

        Object.assign(position, {
          x: position.x + (distance.x * u),
          y: position.y + (distance.y * u)
        })
        Object.assign(waypoint, {
          x: waypoint.x + (distance.x * u),
          y: waypoint.y + (distance.y * u)
        })
      }
    }
  }

  console.debug('Received', command, position)
  const operation = parseCommand(command)
  mv[mode][operation.cmd](operation.unit)

  if (mode === 'normal') {
    return position
  }
  console.debug('-------------------')
  console.debug('position:', position)
  console.debug('waypoint:', waypoint)
  return {
    position,
    waypoint
  }
}

const route = ({ instructions, mode }) => {
  let position = { x: 0, y: 0, d: 90 }
  let waypoint = { x: 10, y: 1 }
  instructions.forEach((command) => {
    console.debug('Routing position', position)
    console.debug('Routing command', command)
    console.debug('Routing method', mode)
    if (mode === 'waypoint') {
      const tmp = move({ position, waypoint, command, mode })
      position = tmp.position
      waypoint = tmp.waypoint
    } else {
      position = move({ position, command, mode })
    }
  })

  return position
}

module.exports = {
  move,
  route
}
