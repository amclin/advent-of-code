/* eslint-env mocha */
const { expect } = require('chai')
const { parseGame, validateGame, checksumGameSet, validateDraw, countCubesNeeded, power } = require('./game')
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

    describe('validateDraw', () => {
      it('validates an individual draw is within limits', () => {
        const limit = '0c0d0e'
        expect(validateDraw('010206', limit)).to.equal(true)
        expect(validateDraw('060301', limit)).to.equal(true)
        expect(validateDraw('040d05', limit)).to.equal(true)
        expect(validateDraw('140806', limit)).to.equal(false) // game 3 draw 1 has 20 reds
        expect(validateDraw('0e030f', limit)).to.equal(false) // game 4 draw 3 has 15 blues
      })
    })

    describe.skip('integration test', () => {
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

      it('result matches what we know about the answer', () => {
        const limit = [12, 13, 14] // 12 red, 13 green, 14 blue
          .map((num) => num.toString(16).padStart(2, '0'))
          .join('')

        expect(checksumGameSet(initData, limit)).to.be.gt(177) // 177 is too low
        expect(checksumGameSet(initData, limit)).to.be.gt(1452) // 1452 (from creating the limit in hex wrong, and assuming cubes are not returned to the bag after each draw) is too low
      })
    })
  })

  describe('Part 2', () => {
    describe('countCubesNeeded', () => {
      it('counts how many cubes are needed for a game', () => {
        const data = [
          'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
          'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
          'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
          'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
          'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
        ]
        const result = [
          { r: 4, g: 2, b: 6 },
          { r: 1, g: 3, b: 4 },
          { r: 20, g: 13, b: 6 },
          { r: 14, g: 3, b: 15 },
          { r: 6, g: 3, b: 2 }
        ]
        data.forEach((game, idx) => {
          expect(countCubesNeeded(parseGame(game))).to.deep.equal(result[idx])
        })
      })
    })
    describe('power', () => {
      it('calculates the power for a game', () => {
        const data = [
          'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
          'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
          'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
          'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
          'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
        ]
        const result = [48, 12, 1560, 630, 36]
        data.forEach((game, idx) => {
          expect(power(parseGame(game))).to.equal(result[idx])
        })
      })
    })
  })
})
