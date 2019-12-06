/* eslint-env mocha */
const expect = require('chai').expect
const { step } = require('./intcodeParser')

describe('--- 2019 Day 2: 1202 Program Alarm ---', () => {
  describe('Part 1', () => {
    describe('intcodeParser', () => {
      describe('step()', () => {
        it('can add', () => {
          const oppcode = 1
          const data = [oppcode, 5, 6, 3, 99, 2, 3]
          step({ position: 0, data })
          expect(data[3]).equals(5)
        })
        it('can multiply', () => {
          const oppcode = 2
          const data = [oppcode, 5, 6, 3, 99, 2, 3]
          step({ position: 0, data })
          expect(data[3]).equals(6)
        })
        it('can terminate', () => {
          const oppcode = 99
          const data = [oppcode, 5, 6, 3, 99, 2, 3]
          step({ position: 0, data })
          expect(data[3]).equals(3)
        })
      })
    })
  })
})
