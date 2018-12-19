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
    let rackId = 0
    return rackId
  }

  /**
   * Calculates the Power Level at the specified coordinate
   * @param {Array} coords [x,y]
   * @returns {Number}
   */
  getPowerLevel (coords) {
    let rackId = 0
    return rackId
  }
}

module.exports = {
  Rack
}
