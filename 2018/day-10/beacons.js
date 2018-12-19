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
    let data = {}
    // Calculate the position of all the beacons
    data.contents = this.start.map((beacon) => {
      var point = {}
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
      let meta = {
        focus: this._getFocus(data.contents)
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
   */
  _getFocus (points) {
    // Find min/max values
    let ranges = points.reduce((acc, cur) => {
      return {
        maxX: Math.max(acc.maxX, cur.x),
        maxY: Math.max(acc.maxY, cur.y),
        minX: Math.min(acc.minX, cur.x),
        minY: Math.min(acc.minX, cur.x)
      }
    }, { maxX: 0, maxY: 0, minX: 0, minY: 0 })

    return (ranges.maxX - ranges.minX) * (ranges.maxY - ranges.minY)
  }
}

module.exports = {
  Beacon
}
