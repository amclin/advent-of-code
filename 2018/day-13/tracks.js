class Track {
  constructor (track) {
    this.layout = []
    this.carts = []
    this.cartDirections = ['^', '>', 'v', '<']
    this.frame = 0
    this.setLayout(track)
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

  setLayout (track) {
    this.layout = track.split('\n')
    this.layout = this.layout.map((e) => { return e.split('') })
    this.extractCarts()
  }
}

module.exports = {
  Track
}
