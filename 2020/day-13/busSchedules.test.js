/* eslint-env mocha */
const { expect } = require('chai')
const { parseSchedule, findNext, findSequentialTime } = require('./busSchedules')

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
  describe('Part 2', () => {
    describe('findSequentialTime', () => {
      it('finds a sequential time where the busses all depart sequentially', () => {
        expect(findSequentialTime('7,13,x,x,59,x,31,19')).to.equal(1068781)
        expect(findSequentialTime('17,x,13,19')).to.equal(3417)
        expect(findSequentialTime('67,7,59,61')).to.equal(754018)
        expect(findSequentialTime('67,x,7,59,61')).to.equal(779210)
        expect(findSequentialTime('67,7,x,59,61')).to.equal(1261476)
        expect(findSequentialTime('1789,37,47,1889')).to.equal(1202161486)
      })
    })
  })
})
