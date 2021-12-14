/* eslint-env mocha */
const { expect } = require('chai')
const { getFuel, getLeastFuel } = require('./crabs')

const testCrabs = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

describe('--- Day 7: The Treachery of Whales ---', () => {
  describe('Part 1', () => {
    describe('getFuel()', () => {
      it('counts how much fuel is needed to position all the crabs', () => {
        expect(getFuel(testCrabs, 2)).to.equal(37)
        expect(getFuel(testCrabs, 1)).to.equal(41)
        expect(getFuel(testCrabs, 3)).to.equal(39)
        expect(getFuel(testCrabs, 10)).to.equal(71)
      })
    })
    describe('getLeastFuel()', () => {
      it('determine the fuel spent for the least costly position', () => {
        expect(getLeastFuel(testCrabs)).to.equal(37)
      })
    })
  })
})
