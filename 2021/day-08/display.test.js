/* eslint-env mocha */
const { expect } = require('chai')
const { descrambleSignal } = require('./display')

const testSingle = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'

console.debug(
  testSingle.split('|')[0].trim()
    .split(' ').map(
      (code) => code.split('')
        .sort((a, b) => a - b)
    ).sort((a, b) => a.length - b.length)
)

describe('--- Day 8: Seven Segment Search ---', () => {
  describe('Part 1', () => {
    describe('descrambleSignal()', () => {
      const testData = testSingle.split('|')[0].trim()
      const { segmentCodes, charCodes } = descrambleSignal(testData)

      it('takes scambled string of 10 codes and identifies the letters matching each seven-digit-display segment', () => {
        expect(segmentCodes.length).to.equal(7)
        expect(segmentCodes.filter((code) => !['a', 'b', 'c', 'd', 'e', 'f', 'g'].includes(code)).length).to.equal(0)
      })

      it('produces a list of character codes for each number that can be displayed', () => {
        // There should be exactly 10 numbers
        expect(charCodes.length).to.equal(10)
        // lengths of each code is predictable as each number has a specific count of segments
        const expectedLengths = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]
        expect(charCodes.map(code => code.length)).to.deep.equal(expectedLengths)
      })
    })
  })
})
