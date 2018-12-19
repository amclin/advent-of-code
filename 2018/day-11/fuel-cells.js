class Rack {
  constructor (serial) {
    this.serial = serial
  }

  /**
   * Calculates the Rack ID at the specified coordinate
   * @param {Array} coords [x,y]
   * @returns {Number}
   */
  getRackId (coords) {
    return coords[0] + 10
  }

  /**
   * Calculates the Power Level at the specified coordinate
   * @param {Array} coords [x,y]
   * @returns {Number}
   */
  getPowerLevel (coords) {
    const rackId = this.getRackId(coords)
    const serial = this.serial
    let power = rackId * coords[1]
    power += serial
    power = power * rackId
    power = parseInt(power.toString().substr(-3, 1)) || 0 // Extract the hundreds didget, using 0 if there isn't one
    power = power - 5
    return power
  }
}

module.exports = {
  Rack
}
