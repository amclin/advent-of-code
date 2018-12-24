/* eslint-env mocha */
const expect = require('chai').expect
const {
  Cave
} = require('./recipes')

describe('--- Day 15: Beverage Bandits ---', () => {
  describe('Part 1:', () => {
    describe('new Cave()', () => {
      it('initializes a cave with elves and goblins', () => {
        const test = `
          #######
          #.G.E.#
          #E.G.E#
          #.G.E.#
          #######
        `
        const cave = new Cave(test)
        expect(cave.rounds).to.equal(0)
        expect(cave.outcome).to.equal(null)
        expect(cave.filter((unit) => unit.type === 'elves').length).to.equal(4)
        expect(cave.filter((unit) => unit.type === 'goblins').length).to.equal(3)
        expect(cave.filter((unit) => unit.type === 'elves')[0].location).to.deep.equal([5, 1])
        expect(cave.filter((unit) => unit.type === 'goblins')[3].location).to.deep.equal([2, 3])
        expect(cave.map[4][4]).to.equal('#')
        expect(cave.map[3][4]).to.equal('.')
      })
      describe('advance()', () => {
        it('advances the cave combat cycle', () => {

        })
      })
      describe('findPath(origin, target)', () => {
        it('determines a path from the origin to the target', () => {

        })
        it('returns null when the path is blocked by cave', () => {

        })
        it('returns null when the path is blocked by other units', () => {

        })
      })
      describe('display()', () => {
        it('renders the current cave state', () => {

        })
      })
    })
    describe('new Unit()', () => {
      it('initializes an elf or a goblin', () => {
        const expected = { hp: 200, ap: 3, location: [3, 4] }
      })
      describe('attack()', () => {
        it('attacks the closest oponent', () => {

        })
      })
      describe('findClosestOponent()', () => {
        it('finds the unit\'s closest oponent', () => {

        })
      })
      describe('move()', () => {
        it('moves the unit towards the closest oponent', () => {
          const test = `
            #######
            #.E...#
            #.....#
            #...G.#
            #######`
          const expected = [3, 1]
          const cave = new Cave(test)
          cave.units[0].move()
          const actual = cave.units[0].location
          expect(actual).to.deep.equal(expected)
        })
      })
    })
  })
})
