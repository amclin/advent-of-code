/* eslint-env mocha */
const { expect } = require('chai')
const { descrambleSignal } = require('./display')

const testSingle = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
cdfeb fcadb cdfeb cdbaf`

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
      const result = descrambleSignal(testData).segmentCodes

      it('takes scambled string of 10 codes and identifies the letters matching each seven-digit-display segment', () => {
        expect(result.length).to.equal(7)
        expect(result.filter((code) => !['a', 'b', 'c', 'd', 'e', 'f', 'g'].includes(code)).length).to.equal(0)
      })
    })
  })
})
