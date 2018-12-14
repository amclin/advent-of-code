/* eslint-env mocha */
const expect = require('chai').expect
const {
  dynamicSort,
  loadInput,
  parseLog,
  parseLogEntry
} = require('./helpers')

console.log(parseLogEntry)

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

describe('--- Day 4: Repose Record ---', () => {
  describe('helpers', () => {
    describe('dynamicSort()', () => {
      it('sorts an array of objects based on the values in the specified key', () => {
        const test = [
          { key: 'a' },
          { key: 'z' },
          { key: 'm' }
        ]
        const expected = {
          first: 'a',
          last: 'z'
        }
        const actual = test.sort(dynamicSort('key'))
        expect(actual[0].key).to.equal(expected.first)
        expect(actual[2].key).to.equal(expected.last)
      })
    })
    describe('loadInput()', () => {
      it.skip('loads the contents of the input file into a string', () => {
        expect(loadInput()).to.equal(testInput)
      })
    })

    describe('parseLog()', () => {
      it('parses the log file contents into consumable records', () => {
        const expected = { // Last entry in log
          date: '1518-11-05',
          guard: undefined,
          minute: 55,
          activity: 'wakes up'
        }
        const parsedLog = parseLog(testInput)
        const actual = parsedLog[parsedLog.length - 1] // Get the last record
        expect(actual).to.deep.equal(expected)
      })
    })

    describe('parseLogEntry()', () => {
      it('converts a line where the guard starts a shift', () => {
        const input = '1518-11-01 00:00] Guard #10 begins shift'
        const expected = {
          activity: 'begins shift',
          date: '1518-11-01',
          guard: 10,
          minute: 0
        }
        const actual = parseLogEntry(input)
        expect(actual).to.deep.equal(expected)
      })

      it('converts a line where the guard falls asleep', () => {
        const input = '[1518-11-01 00:05] falls asleep'
        const expected = {
          activity: 'falls asleep',
          date: '1518-11-01',
          guard: undefined,
          minute: 5
        }
        const actual = parseLogEntry(input)
        expect(actual).to.deep.equal(expected)
      })

      it('converts a line where the guard wakes up', () => {
        const input = '[1518-11-01 00:25] wakes up'
        const expected = {
          activity: 'wakes up',
          date: '1518-11-01',
          guard: undefined,
          minute: 25
        }
        const actual = parseLogEntry(input)
        expect(actual).to.deep.equal(expected)
      })
    })
  })
})
