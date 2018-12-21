const { dynamicSortMultiple } = require('../day-04/helpers')

class Track {
  constructor (track, options) {
    this.layout = []
    this.carts = []
    this.cartDirections = ['^', '>', 'v', '<']
    this.collision = false
    this.frame = 0
    this.interSectionOrder = [-1, 0, 1]
    this.options = options || {
      removeCrashedCarts: false
    }
    this.trackTurns = ['\\', '/']
    this.trackTypes = this.trackTurns.concat(['-', '|', '+'])
    this.setLayout(track)
  }

  _isCollision (x, y) { return (this.carts.filter((c) => c.x === x && c.y === y && c.ghost !== true).length > 1) }
  _isIntersection (s) { return s === '+' }
  _isTurn (s) { return this.trackTurns.indexOf(s) >= 0 }

  /**
   * Determines the next direction for a cart rotating at an intersection
   * Order of rotations is left (counterclockwise), straight, right (clockwise)
   * @private
   * @param {Object} cart the cart being turned
   * @returns {String} value of new direction
   */
  _intersect (cart) {
    const i = this.interSectionOrder
    let l = cart.lastIntersections

    // Figure out the new rotation
    let r = i.indexOf(l[0])
    r = (r + 1 >= i.length) ? i[0] : i[r + 1]

    // Track the intersections
    cart.lastIntersections.pop()
    cart.lastIntersections.splice(0, 0, r)

    return this.cartDirections[this._roationDirection(this.cartDirections.indexOf(cart.direction), r)]
  }

  /**
   * Rotates the cart
   * @private
   * @param {String} s track segment the cart is now on
   * @param {String} a x||y axis of travel
   * @param {Number} d Index of absolute cart direction
   * @returns {String} value of new direction
   */
  _rotate (s, a, d) {
    // Determine which way we're rotating
    let r = (
      (this.trackTurns.indexOf(s) === 1 && a === 'y') || // vertical turns clockwise
      (this.trackTurns.indexOf(s) === 0 && a === 'x') // horizontal turns clockwise
      // (this.trackTurns.indexOf(s) === 0 && a === 'x') // horizontal turns counter-clockwise
      // (this.trackTurns.indexOf(s) === 1 && a === 'y') // vertical turns counter-clockwise
    ) ? 1 : -1
    // Find the value of the new direction
    return this.cartDirections[this._roationDirection(d, r)]
  }

  /**
   * Determines the next clockwise or counter-clockwise direction
   * @private
   * @param {Number} d Index of current direction
   * @param {Number} r +1 for clockwise (turn right), -1 for counterclockwise (turn left)
   * @returns {Number} Index of new direction
   */
  _roationDirection (d, r) {
    if (d + r > this.cartDirections.length - 1) {
      return 0
    }
    if (d + r < 0) {
      return this.cartDirections.length - 1
    }
    return d + r
  }

  /**
   * Advances the state of the entire layout
   */
  advance () {
    this.frame++
    this.carts.sort(dynamicSortMultiple('y', 'x')).forEach((c) => {
      try {
        this.moveCart(c)
      } catch (err) {
        console.error(`Problem moving cart in frame ${this.frame}`)
        console.error(err)
      }
    })
  }

  /**
   * Displays the current state of the track with the carts placed
   */
  display () {
    let output = ''
    const layout = JSON.parse(JSON.stringify(this.layout)) // Deep copy
    // Include the carts
    this.carts.filter((c) => c.ghost !== true).forEach((cart) => {
      // If another cart is at the spot, draw a collision instead
      if (this.cartDirections.indexOf(layout[cart.y][cart.x]) >= 0) {
        layout[cart.y][cart.x] = 'X'
      } else {
        layout[cart.y][cart.x] = cart.direction
      }
    })
    layout.forEach((y) => {
      output += y.join('')
      output += '\n'
    })

    return output
  }

  /**
   * Locates carts on the imported layout and pops them out to the carts list
   */
  extractCarts () {
    this.layout = this.layout.map((y, idy) => {
      return y.map((x, idx) => {
        // Pop the cart into the cart list with its location
        if (this.cartDirections.indexOf(x) >= 0) {
          this.carts.push({
            x: idx,
            y: idy,
            direction: x,
            lastIntersections: [1, 0] // Assume the first ntersection the cart will turn left
          })
          // Replace the cart on the track with a track segment
          // (Assuming cart initial states aren't on instersections)
          x = (this.cartDirections.indexOf(x) % 2 === 0) ? '|' : '-'
        }
        return x
      })
    })
  }

  /**
   * Gets the track segment at the specified coordinates
   * @param {*} x Number
   * @param {*} y Number
   */
  getSegment (x, y) {
    return this.layout[y][x]
  }

  /**
   * Moves the specified cart in the direction of travel, observing all rules
   * @param {Objc} cart from the list of carts
   */
  moveCart (cart) {
    // Determine the direction of travel
    const d = this.cartDirections.indexOf(cart.direction) // Absolute direction
    const a = (d % 2 === 0) ? 'y' : 'x' // axis of travel
    const l = (d % 3 === 0) ? -1 : 1 // (+/-) distance of travel on the axis
    // move the cart
    cart[a] = cart[a] + l
    const s = this.getSegment(cart.x, cart.y) // Segment of track the cart is now on

    // Make sure cart hasn't run off the rails
    if (this.trackTypes.indexOf(this.layout[cart.y][cart.x]) < 0) {
      throw new Error(`cart ran off the track at ${cart.x}, ${cart.y}`)
    }
    // Check for collision
    if (this._isCollision(cart.x, cart.y)) {
      this.collision = { x: cart.x, y: cart.y }

      if (!this.options.removeCrashedCarts) {
        throw new Error(`collision at ${cart.x}, ${cart.y}`) // Stop everything
      }
      this.carts.filter((c) => c.x === cart.x && c.y === cart.y).forEach((c) => {
        c.ghost = true // Ghost carts are dead and no longer collide
        // we leave them in the array so that it doesn't mess up the loops
        // necessary to finish out each cycle tick
      })
    }
    // rotate the cart when entering a turn
    if (this._isTurn(s)) {
      cart.direction = this._rotate(s, a, d)
      return true
    }
    // rotate (or not) the cart when entering an intersection
    if (this._isIntersection(s)) {
      cart.direction = this._intersect(cart)
    }
    return true
  }

  /**
   * Stores the provided track
   * @param {String} track
   */
  setLayout (track) {
    this.layout = track.split('\n')
    this.layout = this.layout.map((e) => { return e.split('') })
    this.extractCarts()
  }
}

module.exports = {
  Track
}
