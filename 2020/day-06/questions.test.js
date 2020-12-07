/* eslint-env mocha */
const { expect } = require('chai')
const { groupChecksum } = require('./questions')

const testData = {
  groups: [
    `abcx
      abcy
      abcz`,
    'abc',
    `a
      b
      c`,
    `ab
      ac`,
    `a
      a
      a
      a`,
    'b'
  ],
  checksums: [6, 3, 3, 3, 1, 1]
}

describe('--- Day 6: Custom Customs ---', () => {
  describe('Part 1', () => {
    describe('groupChecksum()', () => {
      it('tallies the number of unique questions answered collectively by a group', () => {
        testData.groups.forEach((group, idx) => {
          expect(groupChecksum(group)).to.deep.equal(testData.checksums[idx])
        })
      })
    })
  })
})
