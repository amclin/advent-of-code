/* eslint-env mocha */
const expect = require('chai').expect
const {
  parseLine
} = require('./helpers')

describe('--- Day 10: The Stars Align ---', () => {
  describe('Helpers:', () => {
    describe('parseLine(input)', () => {
      it('converts a line of the input into structured object', () => {
        const test = 'position=<-3, 11> velocity=< 1, -2>'
        const expected = {
          position: {
            x: -3,
            y: 11
          },
          velocity: {
            x: 1,
            y: -2
          }
        }
        const actual = parseLine(test)
        expect(actual).to.deep.equal(expected)
      })
    })
  })
})
