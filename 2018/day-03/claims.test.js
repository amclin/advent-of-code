/* eslint-env mocha */
const expect = require('chai').expect
var {
  _cloth,
  countConflicts,
  findNonOverlappingClaim,
  isClaimed,
  makeClaim,
  resetState,
  parseClaim
} = require('./claims')

describe('--- Day 3: No Matter How You Slice It ---', () => {
  const claims = [
    '#123 @ 3,2: 5x4',
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2'
  ]

  beforeEach(() => {
    resetState()
  })

  afterEach(() => {
    resetState()
  })

  describe('Part 1', () => {
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
      it('marks the points on the cloth with the claim ID', () => {
        const claim = parseClaim(claims[0])
        let result = makeClaim(claim)
        expect(result[1][1]).to.equal(undefined)
        expect(result[3][2]).to.deep.equal([123])
        expect(result[7][5]).to.deep.equal([123])
      })

      it('marks the points that are overlapped', () => {
        let testClaims = claims.map(parseClaim)
        let result = _cloth
        for (let x = 1; x < claims.length; x++) {
          result = makeClaim(testClaims[x])
        }

        expect(result[0][0]).to.equal(undefined)
        expect(result[3][1]).to.deep.equal([2])
        expect(result[2][3]).to.deep.equal([1])
        expect(result[3][3]).to.deep.equal([1, 2])
        expect(result[5][5]).to.deep.equal([3])
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

    describe('countConflicts()', () => {
      it('counts the number of points with conflicting claims', () => {
        let testClaims = claims.map(parseClaim)
        for (let x = 1; x < claims.length; x++) {
          makeClaim(testClaims[x])
        }
        const expected = 4
        const actual = countConflicts()
        expect(actual).to.equal(expected)
      })
    })
  })

  describe('Part 2', () => {
    describe('findNonOverlappingClaim()', () => {
      it('locates the first claim that doesn\'t have overlapping claims', () => {
        let testClaims = claims.map(parseClaim)
        for (let x = 1; x < claims.length; x++) {
          makeClaim(testClaims[x])
        }
        const expected = 3
        const actual = findNonOverlappingClaim()
        expect(actual).to.equal(expected)
      })
    })
  })
})
