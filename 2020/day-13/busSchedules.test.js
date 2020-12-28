/* eslint-env mocha */
const { expect } = require('chai')
const { parseSchedule, findNext } = require('./busSchedules')

const testData = {
  time: 939,
  schedule: '7,13,x,x,59,x,31,19'
}

describe('--- Day 13: Shuttle Search ---', () => {
  describe('Part 1', () => {
    describe('parseSchedule()', () => {
      it('cleans up the schedule', () => {
        expect(parseSchedule(testData.schedule))
          .to.deep.equal([7, 13, 59, 31, 19])
      })
    })
    describe('findNext()', () => {
      it('finds the next departing bus', () => {
        expect(findNext({
          time: 939,
          schedule: parseSchedule(testData.schedule)
        })).to.deep.equal({
          route: 59,
          wait: 5
        })
      })
    })
  })
})
