/* eslint-env mocha */
const { expect } = require('chai')
const { validateRecords } = require('./expenseValidation')

/**
 * Sum all the values in an array
 */
const arrSum = (arr) => arr.reduce((x, y) => x + y, 0)
/**
 * Multiply all the values in an array
 */
const arrMult = (arr) => arr.reduce((x, y) => x * y, 1)
const testData = [
  1721,
  979,
  366,
  299,
  675,
  1456
]

describe('--- 2020 Day 1: Report Repair ---', () => {
  describe('Part 1', () => {
    describe('validateRecords()', () => {
      it('it finds the two records that sum to 2020', () => {
        const expected = [1721, 299]
        const results = validateRecords(testData, undefined, 2)
        // Should be 2 results
        expect(results.length).to.equal(2)
        // Result order is unnecessary, but all expected hould be in the result set
        expected.forEach(result => {
          expect(testData.indexOf(result)).to.be.greaterThan(-1)
        })
        // Results add up to the checksum
        expect(arrSum(results)).to.equal(2020)
        // Confirm the multiplied total
        expect(arrMult(results)).to.equal(514579)
      })
      it('it supports specifying an alternate checksum', () => {
        const expected = [testData[3], testData[5]]
        const checksum = arrSum(expected)
        const results = validateRecords(testData, checksum)
        // Should be 2 results
        expect(results.length).to.equal(2)
        // Result order is unnecessary, but all expected hould be in the result set
        expected.forEach(result => {
          expect(results.indexOf(result)).to.be.greaterThan(-1)
        })
        // Results add up to the checksum
        expect(arrSum(results)).to.equal(checksum)
      })
      it('Throws an error when no records provided', () => {
        expect(validateRecords).to.throw()
      })
      it('Throws an error when no records match checksum', () => {
        expect(() => validateRecords([1, 2, 3], 100)).to.throw('Couldn\'t find a checksum match')
      })
    })
  })
  describe('Part 2', () => {
    describe('validateRecords()', () => {
      it('it can find a specified number of records adding up to 2020', () => {
        const expected = [979, 366, 675]
        const results = validateRecords(testData, undefined, 3)
        // Should same number of results
        expect(results.length).to.equal(expected.length)
        // Result order is unnecessary, but all expected hould be in the result set
        expected.forEach(result => {
          expect(testData.indexOf(result)).to.be.greaterThan(-1)
        })
        // Results add up to the checksum
        expect(arrSum(results)).to.equal(2020)
        // Confirm the multiplied total
        expect(arrMult(results)).to.equal(241861950)
      })
    })
  })
})
