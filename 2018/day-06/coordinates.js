/**
 * Calculates the manhattan distance between two points
 * @param {Object} A Point 1 { x: 123, y: 456 }
 * @param {Object} B Point 2
 * @returns {number}
 */
const distance = (A, B) => {
  return Math.abs(A.x - B.x) + Math.abs(A.y - B.y)
}

module.exports = {
  distance
}
