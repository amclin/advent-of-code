/* eslint-env mocha */
const expect = require('chai').expect
const {
  executeInstructions,
  findHasNoDependencies,
  getDependencies,
  getInstructionIds,
  parseEntry,
  sortInstructions,
  storeData
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
    describe('findHasNoDependencies()', () => {
      it('Gets a list of IDs that can be executed since they have no dependencies', () => {
        const expected = ['C']
        let test = testData.map(parseEntry)
        storeData(test)
        const dependencies = getDependencies()
        const actual = findHasNoDependencies(dependencies)
        expect(actual).to.deep.equal(expected)
      })
    })
    describe('sortInstructions()', () => {
      it('Puts the instructions in the necessary order', () => {
        const expected = 'CABDFE'
        let test = testData.map(parseEntry)
        const actual = sortInstructions(test).join('')
        expect(actual).to.equal(expected)
      })
    })
    describe('storeData()', () => {
      it('Builds and stores a list of identified IDs', () => {
        const expected = ['A', 'B', 'C', 'D', 'E', 'F']
        let test = testData.map(parseEntry)
        storeData(test)
        const actual = getInstructionIds()
        expect(actual).to.deep.equal(expected)
      })
      it('Builds and stores a dependency tree', () => {
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
        storeData(test)
        const actual = getDependencies()
        expect(actual).to.deep.equal(expected)
      })
    })
  })

  describe('Part 2:', () => {
    describe('executeInstructions()', () => {
      it('calculatates how long it will take to execute the dependency tree with a given number of workers', () => {
        const expected = 15
        const testMin = 0
        const testWorkers = 2
        const test = testData.map(parseEntry)
        storeData(test)
        const testTree = getDependencies()
        const actual = executeInstructions(testTree, testWorkers, testMin)
        expect(actual).to.equal(expected)
      })
    })
  })
})
