/* eslint-env mocha */
const expect = require('chai').expect
const helpers = require('./helpers')
const {
  findLaziestGuards,
  findSleepiestTimes,
  processActivities,
  sortActivities
} = require('./guards')

const testActivities = helpers.parseLog(`
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-05 00:55] wakes up
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up`)

describe('--- Day 4: Repose Record ---', () => {
  describe('Part 1', () => {
    describe('sortActivities()', () => {
      it('sorts the activity records by the timestamp', () => {
        const expected = [
          {
            activity: 'begins shift',
            date: '1518-11-01',
            guard: 10,
            hour: 0,
            minute: 0
          },
          {
            activity: 'wakes up',
            date: '1518-11-05',
            guard: undefined,
            hour: 0,
            minute: 55
          }
        ]
        const actual = sortActivities(testActivities)
        expect(actual[0]).to.deep.equal(expected[0])
        expect(actual[actual.length - 1]).to.deep.equal(expected[expected.length - 1])
      })
    })

    describe('processActivities()', () => {
      it('converts the records into day-based activities list, logging guards times awake and asleep in strings', () => {
        const expected = [
          {
            date: '1518-11-01',
            guard: 10,
            activity: '.....####################.....#########################.....'
          }, {
            date: '1518-11-02',
            guard: 99,
            activity: '........................................##########..........'
          }, {
            date: '1518-11-03',
            guard: 10,
            activity: '........................#####...............................'
          }, {
            date: '1518-11-04',
            guard: 99,
            activity: '....................................##########..............'
          }, {
            date: '1518-11-05',
            guard: 99,
            activity: '.............................................##########.....'
          }
        ]
        const actual = processActivities(
          sortActivities(testActivities)
        )
        expect(actual).to.deep.equal(expected)
      })
    })

    describe('findLaziestGuards(activities)', () => {
      it('locates the guard who sleeps the most minutes', () => {
        const expected = 10
        const actual = findLaziestGuards(
          processActivities(
            sortActivities(testActivities)
          )
        )[0].id
        expect(actual).to.equal(expected)
      })
    })

    describe('findTimesGuardLikleyAsleep(guard)', () => {
      it.skip('gets a list of times guard is most commonly asleep, ranked with most likely first', () => {
        const expected = 24
        const actual = findTimesGuardLikleyAsleep(10)[0]
        expect(actual).to.equal(expected)
      })
    })
  })
})
