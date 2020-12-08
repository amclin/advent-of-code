/* eslint-env mocha */
const { expect } = require('chai')
const { groupChecksum, groupChecksumEveryone } = require('./questions')

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
  checksumsAnyone: [6, 3, 3, 3, 1, 1],
  checksumsEveryone: [3, 3, 0, 1, 1, 1]
}

describe('--- Day 6: Custom Customs ---', () => {
  describe('Part 1', () => {
    describe('groupChecksum()', () => {
      it('tallies the number of unique questions answered collectively by a group', () => {
        testData.groups.forEach((group, idx) => {
          expect(groupChecksum(group)).to.deep.equal(testData.checksumsAnyone[idx])
        })
      })
    })
  })
  describe('Part 2', () => {
    describe('groupChecksumEveryone()', () => {
      it('tallies the number of questions answered by everyone in a group', () => {
        testData.groups.forEach((group, idx) => {
          expect(groupChecksumEveryone(group)).to.deep.equal(testData.checksumsEveryone[idx])
        })
      })
    })
  })
})
