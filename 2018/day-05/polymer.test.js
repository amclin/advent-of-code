/* eslint-env mocha */
const expect = require('chai').expect
const { reducePolymer } = require('./polymer')

const testInput = 'dabAcCaCBAcCcaDA'

describe('--- Day 5: Alchemical Reduction ---', () => {
  describe('polymers', () => {
    describe('polymerReduce()', () => {
      it('recursively removes case-opposite letter pairs', () => {
        const expected = 'dabCBAcaDA'
        const actual = reducePolymer(testInput)
        expect(actual).to.equal(expected)
      })
    })
  })
})
