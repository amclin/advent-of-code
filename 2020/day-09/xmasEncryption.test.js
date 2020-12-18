/* eslint-env mocha */
const { expect } = require('chai')
const { isValid } = require('./xmasEncryption')

const range = (i) => { return i ? range(i - 1).concat(i) : [] }

describe('--- Day 9: Encoding Error ---', () => {
  describe('Part 1', () => {
    describe('isValid()', () => {
      it('checks if an entry is valid', () => {
        // first example
        const preamble = range(25)
        expect(isValid(26, preamble), '26 is valid').to.equal(true)
        expect(isValid(49, preamble), '49 is valid').to.equal(true)
        expect(isValid(100, preamble), '100 is larger than any sum').to.equal(false)
        expect(isValid(50, preamble), '50 not valid because cannot use the same number (25) twice').to.equal(false)
        // 2nd example
        // move 20 to start of the list, and then pop it off
        preamble.splice(preamble.indexOf(20), 1)
        // add 45 to the list
        preamble.push(45)
        expect(isValid(26, preamble), '26 is valid').to.equal(true)
        expect(isValid(65, preamble), '65 doesnt match any 2 values').to.equal(false)
        expect(isValid(64, preamble), '64 is valid').to.equal(true)
        expect(isValid(66, preamble), '65 is valid').to.equal(true)
      })
    })
  })
})
