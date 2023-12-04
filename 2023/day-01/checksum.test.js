/* eslint-env mocha */
const { expect } = require('chai')
const { checksumSet, checksumLine } = require('./checksum')

describe('--- Day 1: Trebuchet?! ---', () => {
  describe('Part 1', () => {
    describe('checksum', () => {
      it('calculates the checksum for a string by concatentating the first and last number', () => {
        // provided
        expect(checksumLine('1abc2')).to.equal(12)
        expect(checksumLine('pqr3stu8vwx')).to.equal(18)
        expect(checksumLine('a1b2c3d4e5f')).to.equal(15)
        expect(checksumLine('treb7uchet')).to.equal(77)
      })
    })
    describe('checksumSet', () => {
      it('calculates the checksum for a set of lines by summing the checksum of each line', () => {
        // provided
        const set = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet']
        expect(checksumSet(set)).to.equal(142)
      })
    })
  })
})
