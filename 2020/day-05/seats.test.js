/* eslint-env mocha */
const { expect } = require('chai')
const { getSeat } = require('./seats')

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
  })
})
