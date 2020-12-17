const { dynamicSort } = require('../day-04/helpers')

class Rack {
  /**
   * Initializes a new power rack
   * @param {Number} serial grid serial number
   * @param {Array} size [x,y] Grid size
   */
  constructor (serial, size) {
    this.serial = serial
    this.size = size
    if (typeof size === 'object' && size.length === 2) {
      this._allocateGrid(size)
    }
    this.maxSquare = null
  }

  /**
   * Generates a grid with power levels
   * @private
   * @param {Array} size [x,y] Grid size
   */
  _allocateGrid (size) {
    this.cells = []
    // Generate a grid
    for (let x = 1; x <= size[0]; x++) {
      for (let y = 1; y <= size[1]; y++) {
        this.cells.push({
          coords: [x, y],
          power: this.getPowerLevel([x, y])
        })
      }
    }
  }

  getCellsByPower () {
    return this.cells.sort(dynamicSort('-squareTotal'))
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

  _tallySquare (idx, size) {
    let power = 0
    // Check if square will be off the panel by calculating the max index
    const maxIdx = idx + (size[0] - 1) + ((size[1] - 1) * this.size[0])
    if (maxIdx > this.cells.length) {
      return null
    }

    for (let x = 0; x < size[0]; x++) {
      for (let y = 0; y < size[1]; y++) {
        const pointer = idx + x + (y * this.size[0])
        if (pointer > this.cells.length) {
          x = size[0]
          y = size[1]
          return null // break for speed on invalid squares
        }
        const dest = this.cells[pointer]
        power += (dest) ? dest.power : 0
      }
    }
    return power
  }

  tallySquares (size) {
    this.cells = this.cells.map((cell, idx) => {
      cell.squareTotal = this._tallySquare(idx, size) || null
      return cell
    })
  }

  findMaxSquare (size) {
    return this.cells.reduce((acc, cell, idx) => {
      const squarePower = this._tallySquare(idx, size)
      return (squarePower !== null && squarePower > acc.power) ? { power: squarePower, idx: idx } : acc
    }, { power: -99999, idx: -1 })
  }
}

module.exports = {
  Rack
}
