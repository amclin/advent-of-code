/* eslint-env mocha */
const expect = require('chai').expect
const {
  Rack
} = require('./fuel-cells')

describe('--- Day 11: Chronal Charge ---', () => {
  describe('Part 1:', () => {
    describe('new Rack()', () => {
      it.skip('creates a Rack object with the specified Rack ID', () => {
        const testSerial = 8
        const expected = testSerial
        const actual = new Rack(testSerial).serial
        expect(actual).to.equal(expected)
      })
    })
    describe('getRackID(coordinates)', () => {
      it.skip('caclulcates the rack ID of the cell at specified x,y coordinate', () => {
        let test = [3, 5]
        let testSerial = 8
        const expected = 13
        let actual = new Rack(testSerial).getRackId(test, testSerial)
        expect(actual).to.equal(expected)
      })
    })
    describe('getPowerLevel(coordinates)', () => {
      it.skip('caclulcates the power level of the cell at specified x,y coordinate', () => {
        let test = [3, 5]
        const testSerial = 8
        const expected = 4
        let actual = new Rack(testSerial).getPowerLevel(test, testSerial)
        expect(actual).to.equal(expected)
      })
      it.skip('can generate a negative power level', () => {
        let test = [122, 79]
        const testSerial = 8
        const expected = -5
        let actual = new Rack(testSerial).getPowerLevel(test, testSerial)
        expect(actual).to.equal(expected)
      })
      it.skip('can generate a power level of 0', () => {
        let test = [217, 196]
        const testSerial = 8
        const expected = 0
        let actual = new Rack(testSerial).getPowerLevel(test, testSerial)
        expect(actual).to.equal(expected)
      })
      it.skip('can generate a positive power level', () => {
        let test = [101, 153]
        const testSerial = 8
        const expected = 4
        let actual = new Rack(testSerial).getPowerLevel(test, testSerial)
        expect(actual).to.equal(expected)
      })
    })
  })
})
