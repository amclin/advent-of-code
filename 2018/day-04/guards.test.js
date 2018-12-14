/* eslint-env mocha */
const expect = require('chai').expect

describe('--- Day 4: Repose Record ---', () => {
  const input = `
[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`

  describe('Part 1', () => {
    describe('parseLog()', () => {
      it('parses the log file into consumable records', () => {
        const expected = { // Last entry in log
          date: '1518-11-05',
          id: undefined,
          minute: 55,
          activity: 'wake'
        }
        const parsedLog = parseLog(input)
        const actual = parsedLog[parsedLog.length - 1] // Get the last record
        expect(actual).to.deep.equal(expected)
      })
    })
    
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
