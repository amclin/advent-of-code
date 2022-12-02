/* eslint-env mocha */
const { expect } = require('chai')
const { scoreMatch, scoreRound, strategizeMatch, strategizeRound } = require('./rochambeau')

describe('--- Day 2: Rock Paper Scissors ---', () => {
  describe('Part 1', () => {
    describe('scoreRound', () => {
      it('calculates the score of a round based on what the opponent played and what you played', () => {
        // provided
        expect(scoreRound('A', 'Y')).to.equal(8)
        expect(scoreRound('B', 'X')).to.equal(1)
        expect(scoreRound('C', 'Z')).to.equal(6)
        // data from input
        expect(scoreRound('A', 'Z')).to.equal(3) // loss and self played Z
      })
    })
    describe('scoreMatch', () => {
      it('calculates the total score of a match', () => {
        expect(
          scoreMatch([
            ['A', 'Y'],
            ['B', 'X'],
            ['C', 'Z']
          ])
        ).to.equal(15)
      })
    })
  })
  describe('Part 2', () => {
    describe('strategizeRound()', () => {
      it('calculates the score of a round based on what the opponent played and the outcome you should achieve', () => {
        expect(strategizeRound('A', 'Y')).to.equal(4)
        expect(strategizeRound('B', 'X')).to.equal(1)
        expect(strategizeRound('C', 'Z')).to.equal(7)
        // data from input
        expect(scoreRound('A', 'X')).to.equal(3) // Opponent played Rock and self should lose
      })
    })
    describe('strategizeMatch', () => {
      it('calculates the total score of a strategized match', () => {
        expect(
          strategizeMatch([
            ['A', 'Y'],
            ['B', 'X'],
            ['C', 'Z']
          ])
        ).to.equal(12)
      })
    })
  })
})
