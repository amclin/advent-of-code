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

  return ints.sort(isCloser)
}

const isCloser = (intA, intB) => {
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

const getClosesetIntersection = (intersections) => {
  intersections.sort(isCloser)
  // Skip the origin since all wires start at origin
  return intersections[1]
}

module.exports = {
  elfWireToSVGPath,
  findWireIntersections,
  getClosesetIntersection
}
