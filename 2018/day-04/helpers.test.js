/* eslint-env mocha */
const expect = require('chai').expect
const {
  loadInput,
  parseLog,
  parseLogEntry
} = require('.helpers')

const testInput = `
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

describe('Day 4 Helpers', () => {
  describe('loadInput()', () => {
    skip('loads the contents of the input file into a string', () => {
      expect(loadInput()).to.equal(testInput)
    })
  })

  describe('parseLog()', () => {
    it('parses the log file contents into consumable records', () => {
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

  describe('parseLogEntry()', () => {
    it('converts a start of shift line into a data object', () => {
      const input = '1518-11-01 00:00] Guard #10 begins shift'
      const expected = {
        date: '1518-11-01',
        id: 10,
        minute: 0,
        activity: 'begins shift'
      }
      const actual = parseLogEntry(input)
      expect(actual).to.deep.equal(expected)
    })

    it('converts a falls asleep line into a data object', () => {
      const input = '[1518-11-01 00:05] falls asleep'
      const expected = {
        date: '1518-11-01',
        id: undefined,
        minute: 5,
        activity: 'falls asleep'
      }
      const actual = parseLogEntry(input)
      expect(actual).to.deep.equal(expected)
    })

    it('converts a wakes up line into a data object', () => {
      const input = '[1518-11-01 00:25] wakes up'
      const expected = {
        date: '1518-11-01',
        id: undefined,
        minute: 25,
        activity: 'wakes up'
      }
      const actual = parseLogEntry(input)
      expect(actual).to.deep.equal(expected)
    })
  })
})