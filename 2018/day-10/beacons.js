/**
 * Aggregates the min/max x,y coordinats from a list
 * @private
 * @param {*} acc Accumulated data
 * @param {*} cur The list item being evlauted
 * @returns acc
 */
const _aggMinMaxCoords = (acc, cur) => {
  return {
    maxX: Math.max(acc.maxX, cur.x),
    maxY: Math.max(acc.maxY, cur.y),
    minX: Math.min(acc.minX, cur.x),
    minY: Math.min(acc.minY, cur.y)
  }
}

class Beacon {
  constructor (start) {
    this.start = start
    this.time = 0
    this.frameMeta = []
  }

  /**
   * Interpolates data to calculate a given frame
   * @param {Number} frame number
   * @returns {Object} frame contents
   */
  getFrame (frame) {
    const data = {}
    // Calculate the position of all the beacons
    data.contents = this.start.map((beacon) => {
      const point = {}
      Object.keys(beacon.position).forEach((key) => {
        point[key] = beacon.position[key] + (frame * beacon.velocity[key])
      })
      return point
    })

    if (this.frameMeta[frame]) {
      // Get cached metadata
      data.meta = this.frameMeta[frame]
    } else {
      // cache metadata for this frame if we haven't already
      const meta = {
        focus: this._getFocus(data.contents),
        dims: this._getContentDimensions(data.contents)
      }
      this.frameMeta[frame] = meta
      data.meta = this.frameMeta[frame]
    }

    return data
  }

  /**
   * Calculates the area occupied by the points in a given frame.
   * The mimimum area in an animation should indicate the frame
   * that is most in focus.
   * @private
   * @param {Array} points list of coordinates
   * @return {Number}
   */
  _getFocus (points) {
    // Find min/max values
    const ranges = points.reduce(_aggMinMaxCoords, { maxX: points[0].x, maxY: points[0].y, minX: points[0].x, minY: points[0].y })
    // Focus is the area
    return (ranges.maxX - ranges.minX) * (ranges.maxY - ranges.minY)
  }

  /**
   * Calculates the origin and dimensions of the contents in the specified list
   * @private
   * @param {Array} points list of coordinates
   * @return {Object}
   */
  _getContentDimensions (points) {
    // Find min/max values
    const ranges = points.reduce(_aggMinMaxCoords, { maxX: points[0].x, maxY: points[0].y, minX: points[0].x, minY: points[0].y })

    return {
      origin: [ranges.minX, ranges.minY],
      dim: [ranges.maxX - ranges.minX, ranges.maxY - ranges.minY]
    }
  }
}

module.exports = {
  Beacon
}
