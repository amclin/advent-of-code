const {
  parseLine
} = require('./helpers')
const {
  Plants
} = require('./plants')

const initialState = '#..#.#..##......###...###'
const rules = `...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`.split('\n').map(parseLine)
const plantTracker = new Plants(initialState, rules)
for (let gen = 1; gen <= 20; gen++) {
  plantTracker.advance()
}
plantTracker.display()
