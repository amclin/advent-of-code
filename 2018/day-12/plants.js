class Plants {
  constructor (initial, rules) {
    this.generations = []
    this.rules = {}
    this._setInitialGeneration(initial)
    if (rules && rules.length > 0) {
      rules.forEach((rule) => {
        this.addRule(rule)
      })
    }
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
    const nextGen = prevGen.map((pot) => {
      // Assemble pattern for the given pot
      let pattern = ''
      for (let x = pot.position - 2; x <= pot.position + 2; x++) {
        let pp = prevGen.find((p) => p.position === x)
        pattern += (pp) ? pp.state : '.'
      }
      const state = this.predictPlant(pattern)

      return {
        position: pot.position,
        state: state
      }
    })
    // Add 2 pots at the beginning and end to support future generation
    for (let x = 1; x <= 2; x++) {
      const first = nextGen[0].position
      const last = nextGen[nextGen.length - 1].position
      nextGen.splice(0, 0, { position: first - 1, state: '.' })
      nextGen.push({ position: last + 1, state: '.' })
    }

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
      let pots = gen.filter((p) => p.state === '#')
      return [
        acc[0] < pots[0].position ? acc[0] : pots[0].position,
        acc[1] < pots[pots.length - 1].postion ? acc[1] : pots[pots.length - 1].position
      ]
    }, [0, 0])
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
}

module.exports = {
  Plants
}
