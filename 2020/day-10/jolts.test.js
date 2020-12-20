/* eslint-env mocha */
const { expect } = require('chai')
const { countDifferences, countCombinations } = require('./jolts')

const srcAdapters = [
  [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4],
  [28, 33, 18, 42, 31, 14, 46, 20, 48, 47, 24, 23, 49, 45, 19, 38, 39, 11, 1, 32, 25, 35, 8, 17, 7, 9, 4, 2, 34, 10, 3]
]

describe('--- Day 10: Adapter Array ---', () => {
  let adapters
  beforeEach(() => {
    // reset test data since arrays get mutated using a quick-and-dirty deep copy
    adapters = JSON.parse(JSON.stringify(srcAdapters))
  })
  describe('Part 1', () => {
    describe('countDifferences()', () => {
      it('tabulates the amoount of joltage differences in the adapter set', () => {
        const result = countDifferences(adapters[0])
        expect(result[1]).to.equal(7)
        expect(result[3]).to.equal(5)
        const result2 = countDifferences(adapters[1])
        expect(result2[1]).to.equal(22)
        expect(result2[3]).to.equal(10)
      })
      it('throws an error if any joltage differences exceed 3', () => {
        expect(() => countDifferences([5, 40])).to.throw()
      })
      it('throws an error if any joltage differences is less than 1', () => {
        expect(() => countDifferences([5, 5])).to.throw()
      })
    })
  })
  describe('Part 2', () => {
    describe('countCombinations()', () => {
      it('tabulates the amount of adapter combinations in the set', () => {
        const result = countCombinations(adapters[0])
        expect(result).to.equal(8)
        const result2 = countCombinations(adapters[1])
        expect(result2).to.equal(19208)
      })
    })
  })
})
