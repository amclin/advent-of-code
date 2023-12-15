/* eslint-env mocha */
const { expect } = require('chai')
const { parseGame, validateGame, checksumGameSet } = require('./game')
const { linesToArray } = require('../../2018/inputParser')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input.txt')

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

    describe('validateGame', () => {
      it('checks if the game is valid given the limits', () => {
        const limits = '0c0d0e' // 12 red cubes, 13 green cubes, and 14 blue cubes
        const data = [
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
        const result = [true, true, false, false, true]
        data.forEach((game, idx) => {
          expect(validateGame(game, limits)).to.equal(result[idx])
        })
      })
    })

    describe('checksumGameSet', () => {
      it('tallies the IDs of valid games', () => {
        const limits = '0c0d0e' // 12 red cubes, 13 green cubes, and 14 blue cubes
        const data = [
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

        expect(checksumGameSet(data, limits)).to.equal(8)
      })
    })

    describe('integration test', () => {
      let initData
      before((done) => {
        fs.readFile(filePath, { encoding: 'utf8' }, (err, rawData) => {
          if (err) throw err
          initData = linesToArray(rawData.trim()).map(parseGame)
          // Deep copy to ensure we aren't mutating the original data
          // data = JSON.parse(JSON.stringify(initData))
          done()
        })
      })

      it('result is larger than 1452', () => {
        const limit = [12, 13, 14] // 12 red, 13 green, 14 blue
          .map((num) => parseInt(num, 16))
          .join('')

        // Solution set for
        expect(checksumGameSet(initData, limit)).to.be.gt(1452)
      })
    })
  })
})
