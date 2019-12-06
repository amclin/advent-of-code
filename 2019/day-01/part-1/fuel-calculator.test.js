/* eslint-env mocha */
const expect = require('chai').expect
const { calculateFuel } = require('./fuel-calculator')

describe('2019 Day 01', () => {
  it('calculates the fuel amount for a specified mass', () => {
    const inputs = [12, 14, 1969, 100756]
    const outputs = [2, 2, 654, 33583]

    inputs.forEach((input, idx) => {
      console.log(input)
      expect(calculateFuel(input)).equals(outputs[idx])
    })
  })
})
