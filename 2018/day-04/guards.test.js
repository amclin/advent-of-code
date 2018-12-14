/* eslint-env mocha */
const expect = require('chai').expect

describe('--- Day 4: Repose Record ---', () => {
  describe('Part 1', () => {
    describe('sortRecords()', () => {
      it('sorts the sleep records by the timestamp', () => {

      })
    })

    describe('mapRecords()', () => {
      it('converts the records into a parseable matrix, logging guards times', () => {

      })
    })
    
    describe('findLaziestGuard()', () => {
      it('locates the guard who sleeps the most minutes', () => {
        const expected = 10
        const actual = findLaziestGuard()
        expect(actual).to.equal(expected)
      })
    })

    describe('findTimesGuardLikleyAsleep(guard)', () => {
      it('gets a list of times guard is most commonly asleep, ranked with most likely first', () => {
        const expected = 24
        const actual = findTimesGuardLikleyAsleep(10)[0]
        expect(actual).to.equal(expected)
      })
    })

  })
})
