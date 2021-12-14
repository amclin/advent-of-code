/* eslint-env mocha */
const { expect } = require('chai')
const { scoreBoard, checkWinner, markBoard } = require('./bingo')
const { parseData, linesToArray } = require('../../2018/inputParser')

const testData = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`
// Deep copy to ensure we aren't mutating the original data
const data = JSON.parse(JSON.stringify(linesToArray(testData)))

// split up data
const testDraws = parseData(data.shift())
console.debug(testDraws)
const testBoards = []
for (let x = 0; x < data.length; x = x + 5) {
  testBoards.push(
    data.slice(x, x + 5).map(parseData)
  )
}

describe('--- Day 4: Giant Squid ---', () => {
  describe('Part 1', () => {
    describe('markBoard()', () => {
      it('checks a board for a match and marks it', () => {
        const board = [
          [1, 2, 3, 4, 5],
          [9, 8, 7, 6, 5],
          ['x', 'x', 'x', 'x', 'x'],
          [3, 6, 9, 1, 0],
          [1, 3, 5, 7, 9]
        ]
        const expected = [
          [1, 2, 3, 4, 'x'],
          [9, 8, 7, 6, 'x'],
          ['x', 'x', 'x', 'x', 'x'],
          [3, 6, 9, 1, 0],
          [1, 3, 'x', 7, 9]
        ]
        expect(markBoard(board, 5)).to.deep.equal(expected)
      })
    })
    describe('checkWinner()', () => {
      it('checks to see if a board has a horizontal bingo', () => {
        const board = [
          [1, 2, 3, 4, 5],
          [9, 8, 7, 6, 5],
          ['x', 'x', 'x', 'x', 'x'],
          [3, 6, 9, 1, 0],
          [1, 3, 5, 7, 9]
        ]
        expect(checkWinner(board)).to.equal('winner')
      })
      it('checks to see if a board has a vertical bingo', () => {
        const board = [
          [1, 2, 3, 'x', 5],
          [9, 8, 7, 'x', 5],
          [2, 4, 6, 'x', 8],
          [3, 6, 9, 'x', 0],
          [1, 3, 5, 'x', 7]
        ]
        expect(checkWinner(board)).to.equal('winner')
      })
      it('identifies a board is not yet a winner', () => {
        const board = [
          [1, 'x', 3, 4, 5],
          [9, 8, 7, 'x', 5],
          ['x', 'x', 3, 7, 11],
          [3, 6, 9, 'x', 'x'],
          [1, 3, 5, 7, 'x']
        ]
        expect(checkWinner(board)).to.equal('no win')
      })
    })
    describe('scoreBoard()', () => {
      it('gets the sum of the unmarked squares on the board', () => {
        const board = [
          ['x', 'x', 'x', 'x', 'x'],
          [10, 16, 15, 'x', 19],
          [18, 8, 'x', 26, 20],
          [22, 'x', 13, 6, 'x'],
          ['x', 'x', 12, 3, 'x']
        ]
        expect(scoreBoard(board)).to.equal(188)
      })
    })
  })
})
