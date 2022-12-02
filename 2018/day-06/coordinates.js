const { dynamicSort } = require('../day-04/helpers')

const minX = 0
const minY = 0
let maxX = 10
let maxY = 10

/**
 * Use the list of defined points to determine min/max dimensions for the grid
 * @param {Array} points List of defined points
 */
const setAbsolutes = (points) => {
  maxX = points.sort(dynamicSort('-x'))[0].x
  maxY = points.sort(dynamicSort('-y'))[0].y
}

/**
 * Calculates the manhattan distance between two points
 * @param {Object} A Point 1 { x: 123, y: 456 }
 * @param {Object} B Point 2
 * @returns {number}
 */
const distance = (A, B) => {
  return Math.abs(A.x - B.x) + Math.abs(A.y - B.y)
}

/**
 * Parses the data set to find the point closes to the specified coordinate
 * @param {Object} source To start measurements from
 * @param {*} data List of points to measure to
 */
const findClosestPoint = (source, data) => {
  const distances = data.map((target, idx) => {
    return {
      id: idx,
      distance: distance(source, target)
    }
  }).sort(dynamicSort('distance'))

  // Point is invalid when equadistant, so mark with '.' instead of a value
  const point = (distances[0].distance === distances[1].distance) ? '.' : distances[0].id
  return String.fromCharCode(point)
}

/**
 * Areas that would continue beyond the XY axis, or out past maxX and maxY are unbounded and invalid
 * @param {number} area ID of the area to check. IDs are registered point indexes
 */
const isUnbounded = (area, grid) => {
  // Area extends past the x = 0 axis
  if (grid[0].filter(
    (point) => point.closest === area
  ).length > 0) { return true }
  // Area extends past the y = 0 axis
  if (grid.filter((xPoint) => {
    return xPoint[0].closest === area
  }).length > 0) { return true }
  // Area extends to infinity in X
  if (grid[maxX - 1].filter(
    (point) => point.closest === area
  ).length > 0) { return true }
  // Area extends to inifity in Y
  if (grid.filter((xPoint) => {
    return xPoint[maxY - 1].closest === area
  }).length > 0) { return true }
  // Point appears to be bounded
  return false
}

/**
 * Creates an empty XY grid array
 */
const blankGrid = () => {
  const grid = []
  for (let x = minX; x < maxX; x++) {
    grid[x] = grid[x] || []
    for (let y = minY; y < maxY; y++) {
      grid[x][y] = grid[x][y] || {
        x,
        y
      }
    }
  }
  return grid
}

/**
 * Totals the distance to all registered points
 * @param {Object} point The point being tested
 * @param {Array} data List of known points to calculate distance to
 */
const distanceToAllPoints = (point, data) => {
  return data.reduce((acc, target) => {
    return acc + distance(point, target)
  }, 0)
}

/**
 * Counts the number of coordinates in the grid that are closest to the specified point
 * @param {Number} pointId ID of the point being searched
 * @param {Array} grid The grid array, already populated with closest points
 */
const getArea = (pointId, grid) => {
  return grid.reduce((xacc, xcurr, xidx) => {
    return xacc + xcurr.filter((ycurr) => ycurr.closest === pointId).length
  }, 0)
}

module.exports = {
  blankGrid,
  distance,
  distanceToAllPoints,
  findClosestPoint,
  getArea,
  isUnbounded,
  setAbsolutes
}
