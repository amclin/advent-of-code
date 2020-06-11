class Plants {
  constructor (initial, rules) {
    this.generations = []
    this.boundaryBuffers = [0, 0]
    this.rules = {}
    if (rules && rules.length > 0) {
      rules.forEach((rule) => {
        this.addRule(rule)
      })
    }
    this.boundaryBuffers = this.getBoundaryBuffers()
    this._setInitialGeneration(initial)
  }

  _setInitialGeneration (initial) {
    this.generations.push(
      initial.split('').map((plant, idx) => {
        return {
          position: idx,
          state: plant
        }
      })
    )
    this.generations[0] = this.pad(this.generations[0])
  }

  /**
   * Adds a rule to the rules list
   * @param {Object} rule {id: "..#..", generate: "#"}
   * @returns {Object} Plants instance for chaining
   */
  addRule (rule) {
    this.rules[rule.id] = rule.generate
    return this // allow chaining
  }

  /**
   * Determines the the pot state based on the pattern provided
   * @param {String} pattern "..#.."
   * @returns {String} "." or "#"
   */
  predictPlant (pattern) {
    const result = this.rules[pattern] || '.'
    return result
  }

  /**
   * Advances the plants by one generation
   * @returns {Array} The results of the new generation
   */
  advance () {
    const prevGen = this.generations[this.generations.length - 1]

    // Loop through all pots in the last generation to create a new generation
    let nextGen = prevGen.map((pot) => {
      // Assemble pattern for the given pot
      let pattern = ''
      for (let x = pot.position - 2; x <= pot.position + 2; x++) {
        const pp = prevGen.find((p) => p.position === x)
        pattern += (pp) ? pp.state : '.'
      }
      const state = this.predictPlant(pattern)

      return {
        position: pot.position,
        state: state
      }
    })

    nextGen = this.pad(nextGen)

    // Store the new generation
    this.generations.push(nextGen)
    return this.generations[this.generations.length - 1]
  }

  /**
   * Renders out a visual display of the pots in all generations
   * Wrapper for getDisplay()
   * @param {Number} start First pot to include
   * @param {Number} end Last pot to include
   */
  display (start, end) {
    console.log(this.getDisplay(start, end))
  }

  /**
   * Scans the generations to find the leftmost and rightmost pot with a plant
   * @returns {Array} [left, right] position of first and last pots
   */
  findPotBoundaries () {
    return this.generations.reduce((acc, gen) => {
      const pots = gen.filter((p) => p.state === '#')
      return [
        acc[0] < pots[0].position ? acc[0] : pots[0].position,
        acc[1] < pots[pots.length - 1].postion ? acc[1] : pots[pots.length - 1].position
      ]
    }, [0, 0])
  }

  /**
   * Rules need empty pots lef/right of row for verification. Figures out the number of pots we need
   * to add to the left/right of a row
   * @returns {Array} [left, right] necessary buffer size of first and last pots
   */
  getBoundaryBuffers () {
    const buffers = [0, 0]
    Object.keys(this.rules).filter((rule) => this.rules[rule] === '#').forEach((rule) => {
      // For left edge
      for (let x = 0; x < rule.length; x++) {
        if (rule.substr(x, 1) === '.') {
          const y = x + 1
          buffers[0] = Math.max(buffers[0], y)
        } else {
          // break the loop when we encounter a #
          x = rule.length
          break
        }
      }

      for (let x = rule.length - 1; x >= 0; x--) {
        if (rule.substr(x, 1) === '.') {
          const y = rule.length - x
          buffers[1] = Math.max(buffers[1], y)
        } else {
          // break the loop when we encounter a #
          x = -1
          break
        }
      }
    })
    return buffers
  }

  /**
   * Generates a visual display of the pots in all generations. Accepts optional boundaries.
   * @param {Number} start First pot to include
   * @param {Number} end Last pot to include.
   */
  getDisplay (start, end) {
    // Find boundaries if not provided
    if (!start || !end) {
      const boundaries = this.findPotBoundaries()
      start = start || boundaries[0] - 1
      end = end || boundaries[1] + 1
    }
    let output = ''
    this.generations.forEach((gen) => {
      for (let p = start; p <= end; p++) {
        const plant = gen.find((pot) => pot.position === p)
        output += (plant) ? plant.state : '.'
      }
      output += '\n'
    })
    return output.trim()
  }

  /**
   * Sums the number of plants present in all generations
   */
  getPlantTotal () {
    return this.generations.reduce((gacc, g) => {
      return gacc + g.filter((p) => p.state === '#').length
    }, 0)
  }

  /**
   * Generates a checksum calculated by summing the positions of all pots containing plants
   * in a specified generation
   * @param {Number} generation to generate checksum for
   */
  getCheckSum (generation) {
    return this.generations[generation].filter((p) => p.state === '#')
      .reduce((pacc, p) => pacc + p.position, 0)
  }

  /**
   * Pads the generation to the left and right so the pots are present to support future generations
   * @param {Array} generation List of pots representing a generation
   * @returns generation list with extra pots
   */
  pad (generation) {
    for (let x = 1; x <= this.boundaryBuffers[0]; x++) {
      const first = generation[0].position
      generation.splice(0, 0, { position: first - 1, state: '.' })
    }
    for (let x = 1; x <= this.boundaryBuffers[1]; x++) {
      const last = generation[generation.length - 1].position
      generation.push({ position: last + 1, state: '.' })
    }
    return generation
  }
}

module.exports = {
  Plants
}
