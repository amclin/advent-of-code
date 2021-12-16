/* eslint-env mocha */
const { expect } = require('chai')
const { findLocalLows } = require('./basins')

const testData = `2199943210
3987894921
9856789892
8767896789
9899965678`

describe('--- Day 9: Smoke Basin ---', () => {
  describe('Part 1', () => {
    describe('findLocalLows()', () => {
      it('finds the local low points in the terrain', () => {
        // low points in the testData are 1, 0 on row 0
        // 5 on row 2
        // 5 on row 5
        const results = findLocalLows(testData)
        expect(results.length).to.equal(4)
        expect(results.reduce((a, b) => a + b)).to.equal(11)
      })
    })
  })
})
