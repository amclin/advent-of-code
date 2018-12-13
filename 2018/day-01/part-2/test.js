/* eslint-env mocha */
const expect = require('chai').expect
const chronalCalibrator = require('./chronalCalibrator')

describe('--- Day 1: Chronal Calibration ---', () => {
  describe('Part 2', () => {
    it('finds the first frequency that is reached twice in test set 1', () => {
      const sequence = '+1, -1'
      const expected = 0
      let actual = chronalCalibrator.getFirstMatch(sequence)
      expect(actual).to.equal(expected)
    })

    it('finds the first frequency that is reached twice in test set 2', () => {
      const sequence = '+3, +3, +4, -2, -4'
      const expected = 10
      let actual = chronalCalibrator.getFirstMatch(sequence)
      expect(actual).to.equal(expected)
    })

    it('finds the first frequency that is reached twice in test set 3', () => {
      const sequence = '-6, +3, +8, +5, -6'
      const expected = 5
      let actual = chronalCalibrator.getFirstMatch(sequence)
      expect(actual).to.equal(expected)
    })

    it('finds the first frequency that is reached twice in test set 4', () => {
      const sequence = '+7, +7, -2, -7, -4'
      const expected = 14
      let actual = chronalCalibrator.getFirstMatch(sequence)
      expect(actual).to.equal(expected)
    })
  })
})
