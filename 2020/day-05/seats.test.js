/* eslint-env mocha */
const { expect } = require('chai')
const { getSeat, findAvailableSeat } = require('./seats')

describe('--- Day 5: Binary Boarding ---', () => {
  describe('Part 1', () => {
    describe('getSeat()', () => {
      it('returns the seat details for a given seat code', () => {
        expect(getSeat('BFFFBBFRRR')).to.deep.equal({
          row: 70,
          column: 7,
          id: 567
        })
        expect(getSeat('FFFBBBFRRR')).to.deep.equal({
          row: 14,
          column: 7,
          id: 119
        })
        expect(getSeat('BBFFBBFRLL')).to.deep.equal({
          row: 102,
          column: 4,
          id: 820
        })
      })
    })
    describe('findAvailableSeat()', () => {
      it('finds the first available seat', () => {
        const secondRow = [
          'FFFFFFBLLL',
          'FFFFFFBLLR',
          'FFFFFFBLRL',
          'FFFFFFBLRR',
          // 'FFFFFFBRLL', row:1, col:4, id: 12
          'FFFFFFBRLR',
          'FFFFFFBRRL',
          'FFFFFFBRRR'
        ]
        expect(findAvailableSeat(secondRow)).to.equal(12)
      })
    })
  })
})
