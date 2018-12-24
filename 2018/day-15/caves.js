class Cave {
  constructor (data) {
    this.outcome = null
    this.rounds = 0
    this.units = []
    this.setMap(data)
  }

  /**
   * Parses the map string and stores as an addressable object
   * @param {String} data map
   */
  setMap (data) {
    this.map = data.trim().split('\n').map((row, idy) => {
      return row.trim().split('').map((point, idx) => {
        if (point === 'E' || point === 'G') {
          const army = (point === 'E') ? 'elves' : 'goblins'
          this.units.push(new Unit(idx, idy, army))
        }
        return (point === '#') ? '#' : '.'
      })
    })
  }
}

class Unit {
  constructor (x, y, type) {
    this.ap = 3
    this.hp = 200
    this.location = [x, y]
    this.type = type
  }
  move () {
  }
  attack () {

  }
}

module.exports = {
  Cave,
  Unit
}
