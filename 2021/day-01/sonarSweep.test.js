/* eslint-env mocha */
const { expect } = require('chai')
const { countIncreasingDepth } = require('./sonarSweep')

const pings = [
  199,
  200,
  208,
  210,
  200,
  207,
  240,
  269,
  260,
  263
]

const singlePing = [
  199
]

describe('--- Day 1: Sonar Sweep ---', () => {
  describe('Part 1', () => {
    describe('countIncreasingDepth()', () => {
      it('counts how many times the depth increases between two sequential measurements in an array', () => {
        expect(countIncreasingDepth(pings)).to.equal(7)
      })

      it('skips the first measurement since there are no previous', () => {
        expect(countIncreasingDepth(singlePing)).to.equal(0)
      })
    })
  })
})
