/* eslint-env mocha */
const expect = require('chai').expect
const {
  playGame
} = require('./marbles')

describe('--- Day 9: Marble Mania ---', () => {
  describe('Part 1:', () => {
    describe('playGame(players, marbles)', () => {
      it('tallies the score based on the players and number of marbles', () => {
        let marbles = 25
        let players = 9
        let results = playGame(players, marbles, true)
        // console.log('Results:', results)
        expect(results.highScore).to.equal(32)
        players = 10
        marbles = 1618
        results = playGame(players, marbles)
        expect(results.highScore).to.equal(8317)
        players = 13
        marbles = 7999
        results = playGame(players, marbles)
        expect(results.highScore).to.equal(146373)
        players = 17
        marbles = 1104
        results = playGame(players, marbles)
        expect(results.highScore).to.equal(2764)
        players = 21
        marbles = 6111
        results = playGame(players, marbles)
        expect(results.highScore).to.equal(54718)
        players = 30
        marbles = 5807
        results = playGame(players, marbles)
        expect(results.highScore).to.equal(37305)
      })
    })
  })
})
