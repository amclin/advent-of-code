/* eslint-env mocha */
const expect = require('chai').expect
const {
  parseLine
} = require('./helpers')

describe('--- Day 12: Subterranean Sustainability ---', () => {
  describe('Helpers:', () => {
    describe('parseLine(input)', () => {
      it.skip('converts a line of the input into structured object', () => {
        const test = `..#.. => #`
        const expected = {
          id: '..#..',
          value: '#'
        }
        const actual = parseLine(test)
        expect(actual).to.deep.equal(expected)
      })
    })
  })
})
