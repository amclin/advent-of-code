class Track {
  constructor (track) {
    this.layout = []
    this.carts = []
    this.cartDirections = ['^', '>', 'v', '<']
    this.trackTurns = ['\\', '/']
    this.trackTypes = this.trackTurns.concat(['-', '|', '+'])
    this.collision = false
    this.frame = 0
    this.setLayout(track)
  }

  _isCollision (x, y) { return (this.carts.filter((c) => c.x === x && c.y === y).length > 1) }
  _isIntersection (s) { return s === '+' }
  _isTurn (s) { return this.trackTurns.indexOf(s) >= 0 }

  /**
   * Determines the next direction for a cart rotating at an intersection
   * Order of rotations is left (counterclockwise), right (clockwise), straight
   * @private
   * @param {Object} cart the cart being turned
   * @returns {String} value of new direction
   */
  _intersect (cart) {
    let r = 0
    if (typeof cart.lastIntersection === 'undefined') {
      r = -1
    }
    if (cart.lastIntersection === -1) {
      r = 1
    }

    cart.lastIntersection = r
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
    console.log(`${s} for ${a} is turning ${r}`)
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
    console.log(`rotating ${d}, ${r}`)
    if (d + r > this.cartDirections.length - 1) {
      return 0
    }
    if (d + r < 0) {
      return this.cartDirections.length - 1
    }
    console.log(`new direction is ${d + r}`)
    return d + r
  }

  /**
   * Displays the current state of the track with the carts placed
   */
  display () {
    let output = ''
    const layout = JSON.parse(JSON.stringify(this.layout)) // Deep copy
    // Include the carts
    this.carts.forEach((cart) => {
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

    return output.trim()
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
            direction: x
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
  getSegmentType (x, y) {
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
    const s = this.layout[cart.y][cart.x] // Segment of track the cart is now on

    // Make sure cart hasn't run off the rails
    if (this.trackTypes.indexOf(this.layout[cart.y][cart.x]) < 0) {
      return new Error(`cart ran off the track at ${cart.x}, ${cart.y}`)
    }
    // Check for collision
    if (this._isCollision(cart.x, cart.y)) {
      this.collision = { x: cart.x, y: cart.y }
      return new Error(`collision at ${cart.x}, ${cart.y}`) // Stop everything
    }
    // rotate the cart when entering a turn
    if (this._isTurn(s)) {
      console.log(`Cart direction was ${cart.direction}`)
      cart.direction = this._rotate(s, a, d)
      console.log(`Cart direction is ${cart.direction}`)
      return
    }
    // rotate (or not) the cart when entering an intersection
    if (this._isIntersection(s)) {
      cart.direction = this._intersect(cart)
    }
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
