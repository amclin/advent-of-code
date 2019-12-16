const intersection = require('path-intersection')
const { distance } = require('../../2018/day-06/coordinates') // Manhattan distance function from last year

const elfWireToSVGPath = (path) => {
  const replacements = {
    R: 'h', // R(ight) becomes relative positive horizontal lineto
    L: 'h-', // L(eft) becomes relative negative horizontal lineto
    U: 'v-', // U(p) becomes relative negative vertical line
    D: 'v', // D(own) becomes relative positive vertical line
    ',': ' ' // Separators are done with whitespace
  }
  path = path.trim()

  const pattern = new RegExp(Object.keys(replacements).join('|'), 'gi')
  path = path.replace(pattern, (match) => {
    return replacements[match]
  })

  return `M0,0 ${path}`
}

const findWireIntersections = (wires) => {
  wires = wires.map(elfWireToSVGPath)
  const ints = intersection(
    ...wires
  ).map((point) => {
    return { x: parseInt(point.x), y: parseInt(point.y) }
  })

  return ints.sort(isCloser.manhattan)
}

const isCloser = {
  manhattan: (intA, intB) => {
    const origin = { x: 0, y: 0 }
    intA.distance = distance(origin, intA)
    intB.distance = distance(origin, intB)
    if (intA.distance < intB.distance) {
      return -1
    }
    if (intA.distance > intB.distance) {
      return 1
    }
    if (intA.distance === intB.distance) {
      return 0
    }
  }
}

const advance = ({ segment, remaining, distance, current }) => {
  // Track the step
  switch (direction) {
    case 'U': // Up
      current.y += -dimension
      break
    case 'D': // Down
      current.y += dimension
      break
    case 'R': // Right
      current.x += dimension
      break
    case 'L': // Left
      current.x += -dimension
  }
  remaining += -1
  distance++
}

const getIntersectionWireDistance = ({ intersection, wires }) => {
  intersection.wireDistance = 0

  wires.reduce((wire) => {
    const segments = wire.split(',')
    const current = { x: 0, y: 0 }
    const distance = 0

    segments.forEach((segment, idx) => {
      const direction = segment.slice(0, 1)
      const length = parseInt(segment.slice(1))
      for (let d = 0; d < length; d++) {
        advance({ direction, remaining, distance, current })
        // Reached the desired intersection, stop counting and track result
        if (current.x === intersection.x && current.y === intersection.y) {
          intersection.wireDistance += distance
          break
        }
      }
    })
  }, 0)

  return intersection.wireDistance
}

const getClosesetIntersection = ({
  intersections,
  method = 'manhattan'
}) => {
  intersections.sort(isCloser[method])

  // TODO: Remove workaround for bug in SVG intersection library
  // https://github.com/bpmn-io/path-intersection/issues/10
  //
  // The shared origin inconsistently shows up in the intersection list
  if (parseInt(intersections[0].x) === 0 && parseInt(intersections[0].y) === 0) {
    // Skip the shared origin since all wires start at origin
    return intersections[1]
  }
  return intersections[0]
}

const getClosesetIntersectionByWire = (intersections) => {
  intersections.sort(isCloserByWire)
}

module.exports = {
  elfWireToSVGPath,
  findWireIntersections,
  getClosesetIntersection,
  getIntersectionWireDistance,
  getClosestIntersectionByWireDistance
}
