/* eslint-env mocha */
const { expect } = require('chai')
const { parseGame } = require('./game')

describe('--- Day 2: Cube Conundrum ---', () => {
  describe('Part 1', () => {
    describe('parseGame', () => {
      it('extracts a game string into a data object with RGB hex values for draws', () => {
        const data = [
          'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
          'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
          'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
          'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
          'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
        ]
        const result = [
          {
            id: 1,
            draws: [
              '040003',
              '010206',
              '000200'
            ]
          }, {
            id: 2,
            draws: [
              '000201',
              '010304',
              '000101'
            ]
          }, {
            id: 3,
            draws: [
              '140806',
              '040d05',
              '010500'
            ]
          }, {
            id: 4,
            draws: [
              '030106',
              '060300',
              '0e030f'
            ]
          }, {
            id: 5,
            draws: [
              '060301',
              '010202'
            ]
          }
        ]

        data.forEach((game, idx) => {
          expect(parseGame(game)).to.deep.equal(result[idx])
        })
      })
    })
  })
})
