/* eslint-env mocha */
const expect = require('chai').expect
const chronalCalibrator = require('./chronalCalibrator')

describe('--- Day 1: Chronal Calibration ---', () => {
  describe('Part 1', () => {
    it('should add a list frequency values', () => {
      const sequence = '+1, +1, +1'
      const expected = 3
      const actual = chronalCalibrator(sequence)
      expect(actual).to.equal(expected)
    })

    it('should subtract a list frequency values', () => {
      const sequence = '-1, -2, -3'
      const expected = -6
      const actual = chronalCalibrator(sequence)
      expect(actual).to.equal(expected)
    })

    it('should add a add and subtract a mixed list of frequency values', () => {
      const sequence = '+1, +1, -2'
      const expected = 0
      const actual = chronalCalibrator(sequence)
      expect(actual).to.equal(expected)
    })

    it('supports line-separated lists', () => {
      const sequence = `
        +1
        +1
        -2`
      const expected = 0
      const actual = chronalCalibrator(sequence)
      expect(actual).to.equal(expected)
    })
  })
})
