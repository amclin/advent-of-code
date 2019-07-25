/* eslint-env mocha */
const expect = require('chai').expect
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

describe('--- Day 12: Subterranean Sustainability ---', () => {
  describe('Plants:', () => {
    describe('new Plants()', () => {
      it('creates a Plants object with the initial state', () => {
        const expected = [
          { position: 0, state: '#' },
          { position: 1, state: '.' },
          { position: 2, state: '.' },
          { position: 3, state: '#' },
          { position: 4, state: '.' },
          { position: 5, state: '#' },
          { position: 6, state: '.' },
          { position: 7, state: '.' },
          { position: 8, state: '#' },
          { position: 9, state: '#' },
          { position: 10, state: '.' },
          { position: 11, state: '.' },
          { position: 12, state: '.' },
          { position: 13, state: '.' },
          { position: 14, state: '.' },
          { position: 15, state: '.' },
          { position: 16, state: '#' },
          { position: 17, state: '#' },
          { position: 18, state: '#' },
          { position: 19, state: '.' },
          { position: 20, state: '.' },
          { position: 21, state: '.' },
          { position: 22, state: '#' },
          { position: 23, state: '#' },
          { position: 24, state: '#' }
        ]
        const plantTracker = new Plants(initialState)
        const actual = plantTracker.generations[0]
        expect(actual).to.deep.equal(expected)
      })
    })
    describe('advance()', () => {
      it('advances the next generation', () => {
        const expected = [
          { position: -6, state: '.' },
          { position: -5, state: '.' },
          { position: -4, state: '.' },
          { position: -3, state: '.' },
          { position: -2, state: '.' },
          { position: -1, state: '.' },
          { position: 0, state: '#' },
          { position: 1, state: '.' },
          { position: 2, state: '.' },
          { position: 3, state: '.' },
          { position: 4, state: '#' },
          { position: 5, state: '.' },
          { position: 6, state: '.' },
          { position: 7, state: '.' },
          { position: 8, state: '.' },
          { position: 9, state: '#' },
          { position: 10, state: '.' },
          { position: 11, state: '.' },
          { position: 12, state: '.' },
          { position: 13, state: '.' },
          { position: 14, state: '.' },
          { position: 15, state: '#' },
          { position: 16, state: '.' },
          { position: 17, state: '.' },
          { position: 18, state: '#' },
          { position: 19, state: '.' },
          { position: 20, state: '.' },
          { position: 21, state: '#' },
          { position: 22, state: '.' },
          { position: 23, state: '.' },
          { position: 24, state: '#' },
          { position: 25, state: '.' },
          { position: 26, state: '.' },
          { position: 27, state: '.' },
          { position: 28, state: '.' },
          { position: 29, state: '.' },
          { position: 30, state: '.' }
        ]
        const plantTracker = new Plants(initialState, rules)
        plantTracker.advance()
        const actual = plantTracker.generations[1]
        expect(actual).to.deep.equal(expected)
      })
    })
    describe('predictPlant(pattern)', () => {
      it('retrieves the expected state based on the specified pattern', () => {
        const pattern = '#.#.#'
        const expected = '#'
        const plantTracker = new Plants(initialState, rules)
        const actual = plantTracker.predictPlant(pattern)
        expect(actual).to.equal(expected)
      })
    })
    describe('getDisplay()', () => {
      it('gets a visual display of the generations', () => {
        let expected = `...#..#.#..##......###...###...........
          ...#...#....#.....#..#..#..#...........
          ...##..##...##....#..#..#..##..........`
        expected = expected.replace(/ /g, '')
        const plantTracker = new Plants(initialState, rules)
        for (let gen = 1; gen <= 2; gen++) {
          plantTracker.advance()
        }
        const actual = plantTracker.getDisplay(-3, 35)
        expect(actual).to.equal(expected)
      })
    })
    describe('getDisplay()', () => {
      it('supports optional boundaries', () => {
        let expected = `...#..#.#..##......###...###...........
        ...#...#....#.....#..#..#..#...........
        ...##..##...##....#..#..#..##..........
        ..#.#...#..#.#....#..#..#...#..........
        ...#.#..#...#.#...#..#..##..##.........
        ....#...##...#.#..#..#...#...#.........
        ....##.#.#....#...#..##..##..##........
        ...#..###.#...##..#...#...#...#........
        ...#....##.#.#.#..##..##..##..##.......
        ...##..#..#####....#...#...#...#.......
        ..#.#..#...#.##....##..##..##..##......
        ...#...##...#.#...#.#...#...#...#......
        ...##.#.#....#.#...#.#..##..##..##.....
        ..#..###.#....#.#...#....#...#...#.....
        ..#....##.#....#.#..##...##..##..##....
        ..##..#..#.#....#....#..#.#...#...#....
        .#.#..#...#.#...##...#...#.#..##..##...
        ..#...##...#.#.#.#...##...#....#...#...
        ..##.#.#....#####.#.#.#...##...##..##..
        .#..###.#..#.#.#######.#.#.#..#.#...#..
        .#....##....#####...#######....#.#..##.`
        expected = expected.replace(/ /g, '')
        const plantTracker = new Plants(initialState, rules)
        for (let gen = 1; gen <= 20; gen++) {
          plantTracker.advance()
        }
        const actual = plantTracker.getDisplay()
        expect(actual).to.equal(expected)
      })
    })
    describe('getPlantTotal', () => {
      it('sums the total number of plants in all generations', () => {
        const expected = 264
        const plantTracker = new Plants(initialState, rules)
        for (let gen = 1; gen <= 20; gen++) {
          plantTracker.advance()
        }
        const actual = plantTracker.getPlantTotal()
        expect(actual).to.equal(expected)
      })
    })
    describe('getCheckSum(generation)', () => {
      it('generates a checksum tallied by summing the positions of all pots containing plants', () => {
        const expected = 325
        const plantTracker = new Plants(initialState, rules)
        for (let gen = 1; gen <= 20; gen++) {
          plantTracker.advance()
        }
        const actual = plantTracker.getCheckSum(20)
        expect(actual).to.equal(expected)
      })
    })
    describe('findBoundaryBuffers()', () => {
      it('figures out how many buffer pots are needed at the ends each row based on the rules', () => {
        const expected = [3, 3]
        const plantTracker = new Plants(initialState, rules)
        const actual = plantTracker.getBoundaryBuffers()
        expect(actual).to.deep.equal(expected)
      })
    })
  })
})
