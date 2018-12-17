/* eslint-env mocha */
const expect = require('chai').expect
const { distance } = require('./coordinates')

describe('-- Day 6: Chronal Coordinates ---', () => {
  describe('distance()', () => {
    it('calculates the manhattan distance between two points', () => {
      let expected = 9
      let actual = distance(
        { x: 1, y: 1 },
        { x: 8, y: 3 }
      )
      expect(actual).to.equal(expected)
    })
  })
})
