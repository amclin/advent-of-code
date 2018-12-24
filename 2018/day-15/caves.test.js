/* eslint-env mocha */
const expect = require('chai').expect
const {
  Cave,
  Unit
} = require('./caves')

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
        expect(cave.map.length).to.equal(5) // 5 rows
        expect(cave.map[4].length).to.equal(7) // 7 columns
        expect(cave.units.filter((unit) => unit.type === 'elves').length).to.equal(4)
        expect(cave.units.filter((unit) => unit.type === 'goblins').length).to.equal(3)
        expect(cave.units.filter((unit) => unit.type === 'elves')[0].location).to.deep.equal([4, 1])
        expect(cave.units.filter((unit) => unit.type === 'goblins')[2].location).to.deep.equal([2, 3])
        expect(cave.map[4][4]).to.equal('#')
        expect(cave.map[3][4]).to.equal('.')
      })
      describe('advance()', () => {
        it.skip('advances the cave combat cycle', () => {

        })
      })
      describe('findPath(origin, target)', () => {
        it.skip('determines a path from the origin to the target', () => {

        })
        it.skip('returns null when the path is blocked by cave', () => {

        })
        it.skip('returns null when the path is blocked by other units', () => {

        })
      })
      describe('display()', () => {
        it.skip('renders the current cave state', () => {
          const test = `
            #######
            #.G.E.#
            #E.G.E#
            #.G.E.#
            #######
          `
          const expected = test.split('\n').map((row) => row.trim()).join('\n').trim()
          const actual = new Cave(test).display()
          expect(actual).to.equal(expected)
        })
      })
    })
    describe('new Unit(x, y, type)', () => {
      it('initializes an elf or a goblin', () => {
        const expected = {
          ap: 3,
          hp: 200,
          location: [3, 4],
          type: 'elves'
        }
        const actual = new Unit(3, 4, 'elves')
        expect(actual.ap).to.equal(expected.ap)
        expect(actual.hp).to.equal(expected.hp)
        expect(actual.location).to.deep.equal(expected.location)
        expect(actual.type).to.equal(expected.type)
        expect(typeof actual.attack).to.equal('function')
        expect(typeof actual.move).to.equal('function')
      })
      describe('attack()', () => {
        it.skip('attacks the closest oponent', () => {

        })
      })
      describe('findClosestOponent()', () => {
        it.skip('finds the unit\'s closest oponent', () => {

        })
      })
      describe('move()', () => {
        it.skip('moves the unit towards the closest oponent', () => {
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
