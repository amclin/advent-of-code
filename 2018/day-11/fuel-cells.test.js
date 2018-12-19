/* eslint-env mocha */
const expect = require('chai').expect
const {
  Rack
} = require('./fuel-cells')

describe('--- Day 11: Chronal Charge ---', () => {
  describe('Part 1:', () => {
    describe('new Rack()', () => {
      it('creates a Rack object with the specified Rack ID', () => {
        const testSerial = 8
        const expected = testSerial
        const actual = new Rack(testSerial).serial
        expect(actual).to.equal(expected)
      })
    })
    describe('getRackID(coordinates)', () => {
      it('caclulcates the rack ID of the cell at specified x,y coordinate', () => {
        let test = [3, 5]
        let testSerial = 8
        const expected = 13
        let actual = new Rack(testSerial).getRackId(test, testSerial)
        expect(actual).to.equal(expected)
      })
    })
    describe('getPowerLevel(coordinates)', () => {
      it('caclulcates the power level of the cell at specified x,y coordinate', () => {
        let test = [3, 5]
        const testSerial = 8
        const expected = 4
        let actual = new Rack(testSerial).getPowerLevel(test, testSerial)
        expect(actual).to.equal(expected)
      })
      it('can generate a negative power level', () => {
        let test = [122, 79]
        const testSerial = 57
        const expected = -5
        let actual = new Rack(testSerial).getPowerLevel(test, testSerial)
        expect(actual).to.equal(expected)
      })
      it('can generate a power level of 0', () => {
        let test = [217, 196]
        const testSerial = 39
        const expected = 0
        let actual = new Rack(testSerial).getPowerLevel(test, testSerial)
        expect(actual).to.equal(expected)
      })
      it('can generate a positive power level', () => {
        let test = [101, 153]
        const testSerial = 71
        const expected = 4
        let actual = new Rack(testSerial).getPowerLevel(test, testSerial)
        expect(actual).to.equal(expected)
      })
    })
  })
  describe('tallySquares(size)', () => {
    it('generates total power for a square of [size] anchored at the top left coordinates', () => {
      const expected = 29
      const serial = 18
      const gridSize = [300, 300]
      const squareSize = [3, 3]
      const grid = new Rack(serial, gridSize)
      grid.tallySquares(squareSize)
      const actual = grid.cells.find((c) => c.coords[0] === 33 && c.coords[1] === 45).squareTotal
      expect(actual).to.equal(expected)
    })
    it('generates total power for a square of [size] anchored at the top left coordinates', () => {
      const expected = 30
      const serial = 42
      const gridSize = [300, 300]
      const squareSize = [3, 3]
      const grid = new Rack(serial, gridSize)
      grid.tallySquares(squareSize)
      const actual = grid.cells.find((c) => c.coords[0] === 21 && c.coords[1] === 61).squareTotal
      expect(actual).to.equal(expected)
    })
  })
  describe('getCellsByPower()', () => {
    it('sorts the cells by their available square power, skipping ones that go off the edge of the rack', () => {
      const expected = [33, 45]
      const serial = 18
      const gridSize = [300, 300]
      const squareSize = [3, 3]
      const grid = new Rack(serial, gridSize)
      grid.tallySquares(squareSize)
      const actual = grid.getCellsByPower(squareSize)[0].coords
      expect(actual).to.deep.equal(expected)
    })
    it('sorts the cells by their available square power, skipping ones that go off the edge of the rack', () => {
      const expected = [21, 61]
      const serial = 42
      const gridSize = [300, 300]
      const squareSize = [3, 3]
      const grid = new Rack(serial, gridSize)
      grid.tallySquares(squareSize)
      const actual = grid.getCellsByPower(squareSize)[0].coords
      expect(actual).to.deep.equal(expected)
    })
  })
})
