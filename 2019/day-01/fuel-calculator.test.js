/* eslint-env mocha */
const expect = require('chai').expect
const { calculateFuel, calculateFuelRecursively } = require('./fuel-calculator')

describe('--- 2019 Day 1: The Tyranny of the Rocket Equation ---', () => {
  describe('Part 1', () => {
    describe('calculateFuel()', () => {
      it('calculates the fuel amount for a specified mass', () => {
        const inputs = [12, 14, 1969, 100756]
        const outputs = [2, 2, 654, 33583]

        inputs.forEach((input, idx) => {
          expect(calculateFuel(input)).equals(outputs[idx])
        })
      })
      it('will not output negative quantities for fuel', () => {
        const inputs = [0, 1, -2345]
        const outputs = [0, 0, 0]

        inputs.forEach((input, idx) => {
          expect(calculateFuel(input)).equals(outputs[idx])
        })
      })
    })
    describe('calculateFuelRecursively()', () => {
      it('calculates fuel amount for a specified mass, along with the fuel for the fuel', () => {
        const inputs = [14, 1969, 100756]
        const outputs = [2, 966, 50346]

        inputs.forEach((input, idx) => {
          expect(calculateFuelRecursively(input)).equals(outputs[idx])
        })
      })
    })
  })
})
