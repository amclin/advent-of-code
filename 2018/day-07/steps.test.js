/* eslint-env mocha */
const expect = require('chai').expect
const {
  getDependencies,
  parseEntry,
  sortInstructions
} = require('./steps')

const testData = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`.split('\n')

describe('--- Day 7: The Sum of Its Parts ---', () => {
  describe('Part 1:', () => {
    describe('parseEntry', () => {
      it('Parses a line of the log to create a structured data object representing the entry', () => {
        const test = testData[4]
        const expected = {
          id: 'E',
          dep: 'B'
        }
        const actual = parseEntry(test)
        expect(actual).to.deep.equal(expected)
      })
    })
    describe('sortInstructions()', () => {
      it('Builds a dependency tree', () => {
        const expected = {
          C: {
            ids: ['A', 'F']
          },
          A: {
            ids: ['B', 'D']
          },
          B: {
            ids: ['E']
          },
          D: {
            ids: ['E']
          },
          F: {
            ids: ['E']
          }
        }
        let test = testData.map(parseEntry)
        sortInstructions(test)
        const actual = getDependencies()
        expect(actual).to.deep.equal(expected)
      })
      it.skip('Puts the instructions in the necessary order', () => {
        const expected = 'CABDFE'
        let test = testData.map(parseEntry)
        const actual = sortInstructions(test).map((el) => el.id).join('')
        expect(actual).to.equal(expected)
      })
    })
  })
})
