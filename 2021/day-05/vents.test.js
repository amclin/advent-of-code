/* eslint-env mocha */
const { expect } = require('chai')
const { render, chartLine, parseLines } = require('./vents')

const testData = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

const sampleMap = `.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....`

const parsedTestData = parseLines(testData)

describe('--- Day 5: Hydrothermal Venture ---', () => {
  describe('Part 1', () => {
    describe('render()', () => {
      it('displays a visual map of the vents', () => {
        expect(render([[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
          [0, 1, 1, 2, 1, 1, 1, 2, 1, 1],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [2, 2, 2, 1, 1, 1, 0, 0, 0, 0]]))
          .to.equal(sampleMap)
      })
    })
    describe('chartLine()', () => {
      it('charts a line between two points', () => {
        // 10x10 empty grid
        let data = [...new Array(10)].map(() => {
          return [...new Array(10)].map(() => 0)
        })
        // Map some horizontal and vertical lines
        data = chartLine(data, 0, 9, 5, 9)
        data = chartLine(data, 9, 4, 3, 4)
        data = chartLine(data, 2, 2, 2, 1)
        data = chartLine(data, 7, 0, 7, 4)
        data = chartLine(data, 0, 9, 2, 9)
        data = chartLine(data, 3, 4, 1, 4)
        expect(render(data)).to.equal(sampleMap)
      })
    })
    it('skips diagonal lines', () => {
      // 10x10 empty grid
      let data = [...new Array(10)].map(() => {
        return [...new Array(10)].map(() => 0)
      })
      // Map some lines
      parsedTestData.forEach((row) => {
        data = chartLine(data, ...row)
      })
      expect(render(data)).to.equal(sampleMap)
    })
  })
})
