/* eslint-env mocha */
const { expect } = require('chai')
const { scoreMatch, scoreRound } = require('./rochambeau')

describe.only('--- Day 2: Rock Paper Scissors ---', () => {
  describe('Part 1', () => {
    describe('scoreRound', () => {
      it('calculates the score of a round based on what the opponent played and what you played', () => {
        expect(scoreRound('A', 'Y')).to.equal(8)
        expect(scoreRound('B', 'X')).to.equal(1)
        expect(scoreRound('C', 'Z')).to.equal(6)
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
})
