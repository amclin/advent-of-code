class Plants {
  constructor (initial) {
    this.generations = []
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
  }
}

module.exports = {
  Plants
}
