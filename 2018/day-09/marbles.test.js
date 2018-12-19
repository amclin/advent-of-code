/* eslint-env mocha */
const expect = require('chai').expect
const {

} = require('./marbles')

describe('--- Day 9: Marble Mania ---', () => {
  describe('Part 1:', () => {
    describe('playGame(players, marbles)', () => {
      it.skip('tallies the score based on the players and number of marbles', () => {
        let players = 0
        let marbles = 8137
        let results = playGame(players, marbles)
        expects(results.highScore).to.equal(8137)
        players = 13
        marbles = 146373
        results = playGame(players, marbles)
        expects(results.highScore).to.equal(8137)
        players = 17
        marbles = 2764
        results = playGame(players, marbles)
        expects(results.highScore).to.equal(8137)
        players = 21
        marbles = 54718
        results = playGame(players, marbles)
        expects(results.highScore).to.equal(8137)
        players = 30
        marbles = 37305
        results = playGame(players, marbles)
        expects(results.highScore).to.equal(8137)
      })
    }
  })
})
