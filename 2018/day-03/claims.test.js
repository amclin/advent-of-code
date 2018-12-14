/* eslint-env mocha */
const expect = require('chai').expect
const { parseClaim } = require('./claims')
let {
  cloth,
  conflicts,
  isClaimed,
  logConflict,
  makeClaim
} = require('./claims')

function _randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

describe('--- Day 3: No Matter How You Slice It ---', () => {
  const claims = [
    '#123 @ 3,2: 5x4',
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2'
  ]

  describe('parseClaim()', () => {
    it('converts a claim into a readable object', () => {
      const claim = claims[0]
      const expected = {
        id: 123,
        x: 3,
        y: 2,
        width: 5,
        height: 4
      }
      const actual = parseClaim(claim)
      expect(actual).to.deep.equal(expected)
    })
  })

  describe('makeClaim(claim)', () => {
    beforeEach(() => {
      // Clear the stateful claims
      cloth = {}
    })

    afterEach(() => {
      // Clear the stateful claims
      cloth = {}
    })

    it('claims a piece of cloth for the specified elf', () => {
      const claim = parseClaim(claims[0])
      makeClaim(claim)
      const expected = claim.id
      for (let x = claim.x; x < claim.x + claim.width; x++) {
        for (let y = claim.y; x < claim.y + claim.height; y++) {
          expect(cloth[x][y]).to.equal(expected)
        }
      }
    })

    it('does not claim points outside the region', () => {
      const claim = parseClaim(claims[0])
      makeClaim(claim)
      expect(cloth.length).to.equal(claim.width)
      cloth.forEach((col) => {
        expect(col.length).to.equal(claim.height)
      })
    })
  })

  describe('isClaimed(x,y)', () => {
    it('checks if a point is already claimed in the cloth', () => {
      const claim = parseClaim(claims[0])
      makeClaim(claim)
      // All 4 corners should be claimed
      expect(isClaimed(claim.x, claim.y)).to.equal(true)
      expect(isClaimed(claim.x, claim.y)).to.equal(true)
      expect(isClaimed(claim.x, claim.y)).to.equal(true)
      expect(isClaimed(claim.x, claim.y)).to.equal(true)
      // Points outside should not be claimed
      expect(isClaimed(1, 1)).to.equal(false)
    })
  })

  describe('logConflict(x,y,claims)', () => {
    it('records claim conflicts', () => {
      conflicts = {}
      const x = _randomInt(0, 500)
      const y = _randomInt(0, 500)
      const id = _randomInt(0, 500)
      const expected = {
        x: x,
        y: y,
        claims: [id]
      }
      logConflict(x, y, [id])
      const actual = conflicts[0]
      expect(actual).to.deep.equal(expected)
    })
  })
})
