/* eslint-env mocha */
const expect = require('chai').expect
const {
  parseData,
  sumMetadata
} = require('./license')

let testData

describe('--- Day 8: Memory Maneuver ---', () => {
  beforeEach(() => {
    testData = `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`.split(' ').map(Number)
  })
  describe('Part 1:', () => {
    describe('parseData', () => {
      it('Parses the license data to generate a usable object', () => {
        const expected = {
          children: [
            {
              children: [],
              metadata: [10, 11, 12]
            }, {
              children: [
                {
                  children: [],
                  metadata: [99]
                }
              ],
              metadata: [2]
            }
          ],
          metadata: [1, 1, 2]
        }
        const actual = parseData(testData)
        expect(actual).to.deep.equal(expected)
      })
    })
    describe('totalMetadata', () => {
      it('totals the values of all the metadata entries', () => {
        const expected = 138
        const actual = sumMetadata(parseData(testData))
        expect(actual).to.equal(expected)
      })
    })
  })
})
